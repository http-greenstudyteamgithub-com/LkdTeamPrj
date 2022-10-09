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
          ref="upload"
          class="upload-demo"
          action="string"
          :http-request="httpRequest"
          accept=".xlsx,.xls"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-change="onChange"
          :limit="3"
          :auto-upload="false"
          multiple
          :on-exceed="handleExceed"
          :file-list="fileList"
          :before-upload="beforeExcelUpload"
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
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { shopDataImportApi } from '@/api'
export default {
  props: {
    dialogVisible2: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [],
      supportType: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:dialogVisible2', false)
      // this.$refs.ruleForm.resetFields()
    },
    // confirmFn2() {
    //   this.$emit('update:dialogVisible2', false)
    // },
    submitUpload() {
      console.log(123)
      this.$refs.upload.submit()
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
    },
    onChange(file, fileList) {
      console.log(fileList)
      this.fileList = fileList
    },
    beforeExcelUpload(file) {
      // 打印file，帮助我们了解我们需要的参数
      // console.log(fileList)
      const LIMIT_BYTE = 1024 // 限定1M, 1024 byte = 1 K
      if (this.supportType.includes(file.type)) { // 一些限定
        if (Math.round(file.size / 1024) < LIMIT_BYTE) {
        // 更新当前FileList列表，替换为新的list
        } else {
          // 提示文件太大错误
          this.$message('提示文件太大错误')
        }
      } else {
        // 提醒文件格式不满足要求
        this.$message('文件格式不满足要求')
      }
    },
    async httpRequest() {
      const formData = new FormData() // new FormData
      formData.append('fileName', this.fileList[0].raw) // 键值对形式，将一个文件添加到formData，因为每次只上传一个文件
      try {
        await shopDataImportApi(formData)
      } catch (error) {
        console.log(error)
      }
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
