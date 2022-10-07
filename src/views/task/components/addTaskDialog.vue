<template>
  <div>
    <!-- 新增工单窗口 -->
    <el-dialog
      title="新增工单"
      width="40%"
      :visible="showAddDialog"
      @close="closeDialog"
    >
      <el-form
        ref="createTaskForm"
        label-width="120px"
        :model="createTaskForm"
        :rules="rules"
      >
        <el-form-item
          prop="innerCode"
          label="设备编号："
          show-word-limit
          maxlength="15"
        >
          <el-input v-model="createTaskForm.innerCode" placeholder="请输入" />
        </el-form-item>
        <el-form-item
          prop="productType"
          label="工单类型："
        >
          <el-select v-model="createTaskForm.productType" placeholder="请选择">
            <template v-if="taskTypeList.length>0">
              <el-option v-for="item of taskTypeList" :key="item.id" :label="item.typeName" :value="item.typeId" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="path==='/task/business'"
          label="补货数量："
        >
          <template>
            <el-button icon="el-icon-document-remove" class="btn" @click="getReplenishmentList">补货清单</el-button>
          </template>
        </el-form-item>
        <el-form-item
          prop="assignorId"
          :label="path=='/task/business'?'运营人员':'运维人员：'"
          placeholder="请选择"
        >
          <el-select v-model="createTaskForm.assignorId" placeholder="请选择" no-data-text="无数据">
            <template v-if="operatorList.length>0">
              <el-option v-for="item of operatorList" :key="item.userId" :label="item.userName" :value="item.userId" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" prop="desc">
          <el-input
            v-model="createTaskForm.desc"
            placeholder="请输入备注 不超过40个字"
            type="textarea"
            :rows="3"
            show-word-limit
            maxlength="40"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
        <el-button class="set" @click="closeDialog">取 消</el-button>
        <el-button v-loading="confirmLoading" class="add" @click="btnConfirm">确 定</el-button>
      </el-row>
    </el-dialog>
    <!-- 补货清单 -->
    <GoodsDialog ref="goodsDialog" :is-show-button="true" :header-columns="headerColumns" :show-goods-dialog.sync="showGoodsDialog" :table-data="addGoodsDetails" @btnConfirm="confirmAddGoods">
      <el-table-column
        slot="fullNum"
        min-width="10%"
        show-overflow-tooltip
        label="补满数量"
      >
        <template slot-scope="{row}">
          <div v-if="row.sku.skuName ==='-'">货道暂无商品</div>
          <el-input-number v-else v-model="row.expectCapacity" controls-position="right" :min="1" :max="row.expectCapacity" />
        </template>
      </el-table-column>
    </GoodsDialog>
  </div>
</template>

<script>
import GoodsDialog from './goodsDialog.vue'
import { getTaskType, getOperatorListByInnderCode, createTask, getChannelList } from '@/api'
export default {
  name: 'AddTaskDialog',
  components: {
    GoodsDialog
  },
  props: {
    showAddDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      path: this.$route.path,
      createTaskForm: {
        assignorId: null, // 工单所属人id
        createType: 1, // 创建类型 传1
        innerCode: '', // 设备编号
        userId: this.$store.getters.loginUserInfo.userId, // 创建人id
        productType: null,
        productTypeId: null, // 工单类型
        desc: '', // 备注
        details: [], // 补货信息(补货工单才有)
        taskType: {}
      },
      rules: {
        innerCode: [{ required: true, message: '请输入', trigger: 'blur' }],
        productType: [{ required: true, message: '请选择', trigger: 'blur' }],
        userId: [{ required: true, message: '请选择', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入', trigger: 'blur' }],
        assignorId: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      taskTypeList: [], // 工单类型
      operatorList: [], // 运营人员
      confirmLoading: false,
      showGoodsDialog: false, // 显示补货清单
      addGoodsDetails: [], // 获取售货机货道详情
      headerColumns: [{
        label: '货道编号',
        prop: 'channelCode',
        minWidth: '10%'
      },
      {
        label: '商品名称',
        prop: 'sku.skuName',
        minWidth: '10%'
      },
      {
        label: '当前数量',
        prop: 'currentCapacity',
        minWidth: '10%'
      },
      {
        label: '还可添加',
        prop: 'maxCapacity',
        minWidth: '10%'
      },
      {
        slot: 'fullNum'
      }
      ]
    }
  },
  watch: {
    'createTaskForm.innerCode': {
      async  handler(newValue) {
        if (newValue.length > 0) {
          try {
            // 获取运营人员列表
            const res = await getOperatorListByInnderCode(newValue)
            if (res) {
              this.operatorList = res
            }
            // 获取
          } catch (error) {
            console.log(error)
          }
        }
      }
    }
  },
  created() {
    this.getTaskType()
  },
  methods: {
    closeDialog() {
      this.$emit('update:showAddDialog', false)
      // 清除校验 重置表单项
      this.$refs.createTaskForm.resetFields()
      // 相关信息置空
      this.operatorList = []
    },
    async  btnConfirm() {
      this.confirmLoading = true
      try {
        await this.$refs.createTaskForm.validate()
        // 发起请求
        await createTask(this.createTaskForm)
        // 更新页面
        this.$emit('initTaskList')
        this.closeDialog()// 成功之后关闭弹窗
      } catch (error) {
        if (error.response) {
          this.$message.error(error.response.request.responseText)
        } else {
          throw error
        }
      } finally {
        this.confirmLoading = false
      }
    },
    // 获得工单类型
    async getTaskType() {
      if (this.path === '/task/business') {
        const res = await getTaskType()
        this.taskTypeList = res.filter(item => item.type === 2)
      } else {
        const res = await getTaskType()
        this.taskTypeList = res.filter(item => item.type !== 2)
        console.log(this.createTaskForm.taskTypeList)
      }
    },
    // 获取补货清单
    getReplenishmentList() {
      this.$refs.createTaskForm.validateField('innerCode', async(errorMessage) => {
        const valid = errorMessage === ''
        if (valid) {
          // 发请求
          const res = await getChannelList(this.createTaskForm.innerCode)
          console.log(res)
          this.addGoodsDetails = res.map(item => {
            item.expectCapacity = item.maxCapacity
            if (item.sku === null) {
              item.sku = {}
              item.sku.skuName = '-'
              item.currentCapacity = '-'
              item.maxCapacity = '-'
            }
            return item
          })
          console.log(this.addGoodsDetails)
          // 展示弹窗
          this.showGoodsDialog = true
        }
      })
    },
    // 确认补货数量
    confirmAddGoods() {
      // console.log('确认补货数量')
      // console.log(this.addGoodsDetails)
      const details = this.addGoodsDetails.filter(item => item.skuId !== '0')
      console.log(details)
      this.createTaskForm.details = details.map(item => {
        item.skuName = item.sku.skuName
        item.skuImage = item.sku.skuImage
        return item
      })
      // console.log(this.createTaskForm.details)
      this.showGoodsDialog = false
    }
  }
}
</script>

<style  lang="scss">
.el-form-item__label{
  margin:0
}
.el-form-item__content{
  margin-bottom: 20px;
  margin-right: 30px;
}
.el-dialog {
    border-radius: 10px;
}
.el-dialog .el-dialog__header .el-dialog__title {
    line-height: 22px;
    font-size: 16px;
    font-weight: 600;
}
.el-select{
  width: 100%;
}
.btn{
  color: #5f84ff;
  border:unset;
  background: transparent;
  &:hover{
    color: #4368e1;
  border:unset;
  background: transparent;
  }
}
</style>
