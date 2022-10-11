<template>
  <div class="addnodediaglog">
    <el-dialog title="新增区域" :visible="showAddDialog" width="42%" @close="handerClose">
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
        <el-button @click="handerClose">取 消</el-button>
        <el-button type="primary" @click="checkRogin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addRegion } from '@/api'
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
  },
  methods: {
    handerClose() {
      this.$parent.showAddDialog = false
      this.form = {
        name: '',
        remark: ''
      }
    },
    async checkRogin() {
      try {
        await addRegion(this.form)
        this.$parent.showAddDialog = false
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
}
</style>
