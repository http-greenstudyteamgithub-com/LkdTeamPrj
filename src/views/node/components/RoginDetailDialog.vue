<template>
  <div class="addnodediaglog">
    <el-dialog title="新增区域" :visible.sync="showAddDialog" width="42%">
      <el-form :model="form" :rules="rules">
        <el-form-item prop="name" label="区域名称：" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.name" autocomplete="off" /> -->
          <el-input
            v-model="form.name"
            type="text"
            placeholder="请输入"
            maxlength="15"
            autocomplete="off"
            show-word-limit
          /></el-form-item>
        <el-form-item prop="remark" label="备注说明：" :label-width="formLabelWidth">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入备注（不超过40个字）"
            maxlength="40"
            autocomplete="off"
            show-word-limit
            :rows="3"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    showAddDialog: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        remark: ''
      },
      formLabelWidth: '120px',
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入', trigger: 'blur' }]
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
}
</style>
