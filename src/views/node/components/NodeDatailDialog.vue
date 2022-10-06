<template>
  <div class="addnodediaglog">
    <el-dialog title="新增点位" :visible.sync="showAddDialog" width="42%" @close="handerClose">
      <el-form :model="form" :rules="rules">
        <el-form-item prop="name" label="点位名称：" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.name" autocomplete="off" /> -->
          <el-input
            v-model="form.name"
            type="text"
            placeholder="请输入"
            maxlength="15"
            autocomplete="off"
            show-word-limit
          /></el-form-item>
        <el-form-item prop="contact" label="所在区域：" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择">
            <!-- <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            /> -->
          </el-select>
        </el-form-item>
        <el-form-item prop="mobile" label="所在商圈：" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择">
            <!-- <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            /> -->
          </el-select>
        </el-form-item>
        <el-form-item prop="ratio" label="归属合作商：" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择">
            <!-- <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            /> -->
          </el-select>
        </el-form-item>
        <el-form-item prop="account" label="详细地址：" :label-width="formLabelWidth">
          <MyCity v-model="form.provAndCity" />

        </el-form-item>
        <el-form-item prop="password" label-width="130px">
          <el-input
            v-model="form.password"
            type="textarea"
            placeholder="请输入详细地址"
            maxlength="60"
            autocomplete="off"
            show-word-limit
            :rows="3"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handerClose">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPartner, getRegion } from '@/api'
export default {
  props: {
    showAddDialog: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      value: [],
      form: {
        name: '',
        account: '',
        ratio: '',
        contact: '',
        mobile: '',
        password: ''
      },
      formLabelWidth: '120px',
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        account: [{ required: true, message: '请输入', trigger: 'blur' }],
        ratio: [{ required: true, message: '请输入', trigger: 'blur' }],
        contact: [{ required: true, message: '请输入', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入', trigger: 'blur' }]

      },
      options: [{
        value: 'beijing',
        label: '北京市',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }],
      parentname: {}, // 合作商
      areaname: {} // 区域
    }
  },
  created() {
    // this.geiAllList()
  },
  methods: {
    handerClose() {
      this.$parent.showAddDialog = false
      this.form = {
        name: '',
        account: '',
        ratio: '',
        contact: '',
        mobile: '',
        password: ''
      }
    },
    async geiAllList() {
      try {
        // 合作商
        this.parentname = await getPartner()
        console.log(this.parentname)
        // 区域
        this.areaname = await getRegion()
        console.log(this.areaname)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" socped>
.addnodediaglog{
  .el-dialog{
    border-radius: 10px;
  }
  .el-dialog__title{
    font-weight: bold;
    font-size: 16px;
  }
.el-input,.el-textarea{
  width: 360px;
  margin-bottom: 20px;
}
.is-controls-right{
    height: 36px;
    width: 360px;
}
.el-input-number{
    span{
        // right: 0;
        height: 18px !important;
    }
}
}
</style>
