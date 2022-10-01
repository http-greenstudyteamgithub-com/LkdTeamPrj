<template>
  <div>
    <el-dialog
      class="task"
      title="工单详情"
      width="40%"
      :visible="showDialog"
      @close="closeDialog"
    >
      <!-- 取消工单详情 -->
      <div v-if="detailInfo.taskStatusTypeEntity && detailInfo.taskStatusTypeEntity.statusId===3">
        <div class="msg cancel">
          <div style="width:100px" class="left"><i class="iconfont icon-jinggao"> 取消<span /></i></div>
          <img src="http://likede2-admin.itheima.net/img/pic_3.e8208e34.png" alt="">
        </div>
        <el-form class="form" label-position="right" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备编号：">
                <div>{{ detailInfo.innerCode }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建日期：">
                <div>{{ detailInfo.createTime|dayFormateFilter() }}  </div>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="取消日期：">
                <div>{{ detailInfo.updateTime |dayFormateFilter() }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="运营人员：">
                <div>{{ detailInfo.userName }}</div>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item v-if="detailInfo.taskType" label="工单类型：">
                <div>{{ detailInfo.taskType.typeName }}</div>
              </el-form-item>
            </el-col>
            <el-col v-if="path==='/task/business'" :span="12">
              <el-form-item label="补货数量：" style="position:relative">
                <el-button class="btn addGoods" @click="showGoodsDetail">补货详情</el-button>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="工单方式：">
                <div>{{ detailInfo.createType===1?"手动":"自动" }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="取消原因：">
                <div>{{ detailInfo.desc }}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-button class="set" @click="createAgain">重新创建</el-button>
          </el-row>
        </el-form>
      </div>
      <!-- 待办工单详情 -->
      <div v-else>
        <div class="msg">
          <div style="width:100px" class="left"><img :src="image1" alt="" style="height:35px;width:35px">待办<span /></div>
          <img src="http://likede2-admin.itheima.net/img/pic_1.834b274c.png" alt="">
        </div>
        <el-form class="form" label-position="right" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备编号：">
                <div>{{ detailInfo.innerCode }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建日期：">
                <div>{{ detailInfo.createTime|dayFormateFilter() }}  </div>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="path==='/task/business'?'运营人员：':'运维人员：'">
                <div>{{ detailInfo.userName+111 }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="detailInfo.taskType" label="工单类型：">
                <div>{{ detailInfo.taskType.typeName }}</div>
              </el-form-item>
            </el-col>
            <!--只有运营订单需要补货数量  -->
            <el-col v-if="path==='/task/business'" :span="12">
              <el-form-item label="补货数量：" style="position:relative">
                <el-button class="btn addGoods" @click="showGoodsDetail">补货详情</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工单方式：">
                <div>{{ detailInfo.createType===1?"手动":"自动" }}</div>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="备注：">
                <div>{{ detailInfo.desc }}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-button class="set" @click="cancelTask">取消工单</el-button>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- 补货详情 -->
    <GoodsDialog :show-goods-dialog.sync="showGoodsDialog" />
    <!-- 新增工单 -->
    <AddTaskDialog ref="addDialog" :show-add-dialog.sync="showAddDialog" @initTaskList="$emit('initTaskResult')" />
  </div>
</template>

<script>
import GoodsDialog from './goodsDialog.vue'
import AddTaskDialog from './addTaskDialog.vue'
import { cancelTask, getTaskDetails } from '@/api'
export default {
  name: 'TaskDetailDialog',
  components: {
    GoodsDialog,
    AddTaskDialog
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    detailInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      path: this.$route.path,
      showAddDialog: false,
      confirmLoading: false,
      addGoodsDetails: [], // 补货清单
      showGoodsDialog: false,
      image1: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F58%2F28%2F59fb9c8cc0a81_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666970786&t=f899aaa4e12ee0db0e4d365d31c3f42c'
    }
  },
  created() {
    console.log(this.path)
  },
  methods: {
    closeDialog() {
      this.$emit('update:showDialog', false)
    },
    async cancelTask() {
      // 取消工单
      try {
        await this.$confirm('取消工单后，将不能恢复，是否确认取消？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 发起请求
        await cancelTask(this.detailInfo.taskId)
        // 更新页面
        this.$emit('initTaskResult')
        this.closeDialog()
      } catch (error) {
        console.log(error)
      }
    },
    // 重新创建
    async createAgain() {
      // 获取补货清单
      await this.getTaskDetails()
      this.$refs.addDialog.createTaskForm = this.detailInfo
      this.$refs.addDialog.createTaskForm.productType = this.detailInfo.productTypeId
      this.$refs.addDialog.createTaskForm.details = this.addGoodsDetails
      // console.log(this.$refs.addDialog.createTaskForm)
      this.showAddDialog = true
      this.closeDialog()
    },
    // 获取补货详情
    async  getTaskDetails() {
      this.addGoodsDetails = await getTaskDetails(this.detailInfo.taskId)
      console.log(this.addGoodsDetails)
    },
    // 查看补货详情
    showGoodsDetail() {
      console.log(1)
      this.showGoodsDialog = true
    }
  }

}
</script>

<style lang="scss">
.el-dialog .el-dialog__header .el-dialog__title {
    line-height: 22px;
    font-size: 16px;
    font-weight: 600;
}
.task .el-dialog__body{
  padding-top: 10px;
}
.el-form-item__content{
  line-height: 36px;
}
.form{
  padding: 0 30px;
}
.task{
  .el-message-box__status.el-icon-warning {
    color: #ff665f;
  }
}
  .el-message-box__btns{
    text-align: center;
  }
</style>

<style scoped lang='scss'>
.msg{
    height: 54px;
    margin-bottom: 25px;
    background-color: hsla(0,0%,92.5%,.39);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 10px;
    img{
      margin-right: 10px;
    }
    .left{
      display: flex;
      align-items: center;
    }
}
.addGoods{
  position: absolute;
  left: -20px;
  top: 0;
}

</style>
