<template>
  <el-dialog :title="title" :visible="dialogFormVisible" @close="btnCancel">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="型号名称" prop="name">
        <el-input
          v-model="form.name"
          autocomplete="off"
          maxlength="10"
          show-word-limit
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="型号编码" prop="model">
        <el-input
          v-model="form.model"
          maxlength="15"
          show-word-limit
          placeholder="请输入(数字、字母、中划线、下划线)"
        />
      </el-form-item>
      <el-form-item label="货道行数" prop="vmRow">
        <el-input-number
          v-model="form.vmRow"
          show-word-limit
          placeholder="请输入"
          controls-position="right"
          :min="1"
          :max="10"
        />
      </el-form-item>
      <el-form-item label="货道列数" prop="vmCol">
        <el-input-number
          v-model="form.vmCol"
          :min="1"
          :max="10"
          placeholder="请输入"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="货道容量" prop="channelMaxCapacity">
        <el-input-number
          v-model="form.channelMaxCapacity"
          :min="1"
          :max="10"
          placeholder="请输入"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="设备图片" prop="image">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :multiple="false"
          :headers="headers"
          :limit="1"
          name="fileName"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <div class="common-upload-icon">
            <img v-if="form.image" :src="form.image" class="avatar">
            <i v-else class="el-icon-upload2 avatar-uploader-icon" />
          </div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="display:flex;justify-content:center">
      <el-button class="set" @click="btnCancel">取 消</el-button>
      <el-button class="add" type="primary" @click="btnConfirm">确 认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addVmType, modifyVmType } from '@/api'
export default {
  name: 'AddSet',
  props: {
    dialogFormVisible: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      form: {
        channelMaxCapacity: undefined,
        image: '',
        model: '',
        name: '',
        vmCol: undefined,
        vmRow: undefined
      },
      rules: {
        channelMaxCapacity: [{ required: true, message: '请输入', trigger: 'blur' }],
        image: [{ required: true, message: '请上传', trigger: 'blur' }],
        model: [{ required: true, message: '请输入', trigger: 'blur' }, { pattern: /^[A-Za-z0-9_-]+$/, message: '输入必须是数字字母中划线或者下划线组成', trigger: 'blur' }],
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        vmCol: [{ required: true, message: '请输入', trigger: 'blur' }],
        vmRow: [{ required: true, message: '请输入', trigger: 'blur' }]

      },
      formLabelWidth: '120',
      headers: {
        Authorization: this.$store.getters.token
      },
      uploadUrl: process.env.VUE_APP_BASE_API + 'api/vm-service/sku/fileUpload'

    }
  },
  computed: {
    title() {
      return this.form.typeId ? '修改设备类型' : '新增设备类型'
    }
  },
  methods: {
    async btnConfirm() {
      try {
        await this.$refs.form.validate()
        // 发请求
        if (!this.form.typeId) {
          await addVmType(this.form)
          // 提示
          this.$message.success('新增成功')
        } else {
          await modifyVmType(this.form)
          // 提示
          this.$message.success('修改成功')
        }
        // 更新数据
        this.$emit('refreshList')
        this.btnCancel()
      } catch (error) {
        if (error.response) {
          this.$message.error(error.response.data)
        } else {
          console.log(error.response)
        }
      }
    },
    btnCancel() {
      this.$refs.form.resetFields()
      this.$emit('update:dialogFormVisible', false)
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.form.image = res
    },
    beforeAvatarUpload(file) {
      // console.log(file)
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 < 500

      if (!isJPG) {
        return this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        return this.$message.error('上传头像图片大小不能超过 100kb!')
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog{
  border-radius: 10px;
}
::v-deep .el-form-item__label{
margin: 0;
}
::v-deep .el-input-number{
  width:100%
}
::v-deep .el-form-item__content{
  margin-bottom: 20px;
}
::v-deep .el-dialog__body {
    padding: 30px 20px 10px;
  }

::v-deep .el-upload {
    position: relative;
    overflow: hidden;
    background: #f3f6fb;
    border: 1px dashed #d8dde3;
    border-radius: 4px;
    cursor: pointer;
}
.el-upload__tip {
    font-size: 14px;
    color: #bac0cd;
}

  .el-upload .common-upload-icon {
    width: 84px;
    height: 84px;
    line-height: 84px;
    text-align: center;
    color: #bac0cd;
}

::v-deep .common-upload-icon img {
    width: 76px;
    height: 76px;
    margin: 4px;
    display: block;
    -o-object-fit: contain;
    object-fit: contain;
}
</style>
