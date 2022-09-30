<template>
  <el-dialog
    title="工单配置"
    width="40%"
    :visible="showSetDialog"
    @close="closeDialog"
  ><el-form ref="setForm" label-position="right" label-width="120px" :model="setForm" :rules="rules">
     <el-form-item label="补货警戒线" prop="alertValue">
       <el-input-number v-model="setForm.alertValue" controls-position="right" :min="1" :max="100" placeholder="请输入" />
     </el-form-item>
   </el-form>

    <!-- 按钮 -->
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button class="set" @click="closeDialog">取 消</el-button>
      <el-button v-loading="confirmLoading" class="add" @click="btnConfirm">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getAlertValue, setAutoSupplyConfig } from '@/api'
export default {
  name: 'TaskSetDialog',
  props: {
    showSetDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      confirmLoading: false,
      setForm: {
        alertValue: 0
      },
      rules: {
        alertValue: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getAlertValue()
  },
  methods: {
    closeDialog() {
      this.$emit('update:showSetDialog', false)
    },
    async btnConfirm() {
      await this.$refs.setForm.validateField('alertValue')
      console.log(this.setForm.alertValue)
      try {
        await setAutoSupplyConfig(this.setForm.alertValue)
        this.closeDialog()
      } catch (error) {
        console.log(error)
      }
    },
    async getAlertValue() {
      try {
        this.setForm.alertValue = await getAlertValue()
      } catch (error) {
        console.log(error)
      }
    }
  }

}
</script>

<style>
.el-dialog .el-dialog__header .el-dialog__title {
    line-height: 22px;
    font-size: 16px;
    font-weight: 600;
}
.el-input-number{
  width:100%
}

</style>
