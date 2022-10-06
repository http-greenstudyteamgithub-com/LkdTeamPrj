<template>
  <div>
    <el-dialog
      title="数据导入"
      :visible="dialogVisible2"
      width="30%"
      @close="closeDialog"
    >
      <div class="dig-body">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="3"
          multiple
          :on-exceed="handleExceed"
        >
          <span>标题：</span>
          <el-button size="small" type="primary" style="padding: 10px 70px;background-color: #5f84ff;">点击上传</el-button>
          <div
            slot="tip"
            class="el-upload__tip"
            style="font-size: 14px;color: #bac0cd;"
          >支持扩展名：xls、xlsx，文件不得大于1M</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="confirmFn2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible2: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:dialogVisible2', false)
      // this.$refs.ruleForm.resetFields()
    },
    confirmFn2() {
      this.$emit('update:dialogVisible2', false)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-demo{
  display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
