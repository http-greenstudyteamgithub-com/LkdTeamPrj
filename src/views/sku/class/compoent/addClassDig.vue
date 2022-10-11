<template>
  <el-dialog
    title="新增商品类型"
    :visible="dialogVisible"
    width="40%"
    @close="closeDialog"
  >
    <el-form ref="ruleForm" :model="ruleForm" class="demo-ruleForm" label-position="'left'">
      <el-form-item label="商品类型名称" prop="className" :rules="[{required: true,message: '必填',trigger: 'blur'}]">
        <el-input
          v-model="ruleForm.className"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirmBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddClassDig',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleForm: {
        className: ''
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:dialogVisible', false)
    },
    confirmBtn() {
      console.log(111222)
      this.$emit('confirmFn', this.ruleForm.className)
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog{

  .el-form-item__label{
    margin-right: 0;
  }
  .el-dialog__footer {
    text-align: center;
    }
  .el-form-item__content{
    display: flex;
  }
}
</style>
