<template>
  <el-dialog
    class="dialog"
    :title="title"
    width="38%"
    :visible="isShowDialog"
    show-close
    @close="cancel"
  >
    <el-form ref="roleDialogForm" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="人员名称:" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="角色:" prop="role.roleName">
        <el-select v-model="form.role.roleName" placeholder="请选择">
          <el-option label="运营员" value="运营员" />
          <el-option label="维修员" value="维修员" />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话:" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="负责区域:" prop="regionName">
        <el-select v-model="form.regionName" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="头像:" prop="image">
        <el-upload
          class="avatar-uploader"
          action="http://likede2-admin.itheima.net/likede/api/vm-service/sku/fileUpload"
          name="fileName"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.image" :src="form.image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
          <div slot="tip" class="el-upload__tip">支持扩展名：jpg、png，文件不得大于100kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-checkbox-group v-model="form.status">
          <el-checkbox label="是否启用" name="status" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" plain @click="cancel">取消</el-button>
        <el-button v-loading="loading" type="warning" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getregionList, addUserInfo, updateRole } from '@/api'
export default {
  name: 'AddRole',
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        userName: '',
        roleId: '',
        regionName: '',
        regionId: '',
        mobile: '',
        image: '',
        role: {
          roleName: ''
        },
        status: ''
      },
      headers: {
        Authorization: this.$store.state.user.userToken
      },
      rules: {
        userName: [{
          required: true,
          message: '不能为空嗷~',
          trigger: 'blur'
        },
        {
          minlength: 0,
          maxlength: 5,
          message: '不能超过5个字',
          trigger: 'blur'
        }],
        role: {
          roleName: [{
            required: true,
            message: '不能为空嗷~',
            trigger: 'change'
          }]
        },

        mobile: [{
          required: true,
          message: '不能为空嗷~',
          trigger: 'blur'
        }, {
          minlength: 0,
          maxlength: 11,
          trigger: 'blur'
        },
        {
          pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
          trigger: 'blur',
          message: '手机号格式错误'
        }
        ],
        image: [
          {
            required: true,
            message: '不能为空嗷~',
            trigger: 'change'
          }
        ],
        regionName: [{
          required: true,
          message: '不能为空嗷~',
          trigger: 'change'
        }]

      },
      loading: false,
      ischecked: false,
      imageUrl: '',
      options: [] // 负责区域
    }
  },
  computed: {
    title() {
      return this.form.id ? '编辑人员' : '新增人员'
    }
  },
  created() {
    this.getregionList()
  },
  methods: {
    cancel() {
      this.$emit('update:isShowDialog', false)
      this.$refs.roleDialogForm.resetFields() // 清除表单项里的数据
      this.form = {
        userName: '',
        roleId: '',
        regionName: '',
        regionId: '',
        mobile: '',
        image: '',
        role: {
          roleName: ''
        },
        status: ''
      }
    },
    async handleAvatarSuccess(res, file) {
      console.log(res, file)
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.image = res
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'

      const isLt100KB = file.size / 1024 / 1024 < 0.1

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG和 PNG格式!')
      }
      if (!isLt100KB) {
        this.$message.error('上传头像图片大小不能超过 100kb!')
      }

      return isJPG || isPNG && isLt100KB
    },
    async getregionList() {
      const data = await getregionList() // 点位数据的处理
      console.log(data)
      const newdata = JSON.parse(JSON.stringify(data).replace(/name/gi, 'value').replace(/remark/gi, 'label'))
      this.options = newdata.currentPageRecords
    },
    async onSubmit() {
      try {
        await this.$refs.roleDialogForm.validate() // 先校验表单
        const a = this.options.filter(item => {
          return item.label === this.form.regionName
        })
        this.form.regionId = a[0].id
        this.form.roleId = this.form.role.roleName === '运营员' ? 2 : 3
        console.log(this.form, a[0].id)
        this.form.id ? await updateRole(this.form) : await addUserInfo(this.form)
        this.$message.success(this.form.id ? '编辑成功' : '上传人员信息成功')
        this.$parent.initUserResult()
        this.cancel() // 关闭弹窗 清空数据
      } catch (error) {
        this.$message.error('上传人员信息失败')
      }
    }
  }
}
</script>

<style lang="scss" >
.dialog{
.el-form-item::after, .el-form-item::before {
    display: table;
    content: "";
    margin: 0 0 8px 0;
}
.el-form-item__label{
    font-weight:normal;
    margin-right:0px;
}
.el-form-item .el-input__inner {
    line-height: 28px;
    height: 28px;
    outline: none;
    width: 25vw;;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color:#ccc;
  }
  .avatar-uploader-icon {
    font-size: 16px;
    color: #8c939d;
    width: 84px;
    height: 84px;
    line-height: 84px;
    text-align: center;
  }
  .avatar {
    width: 84px;
    height: 84px;
    display: block;
  }
}

</style>
