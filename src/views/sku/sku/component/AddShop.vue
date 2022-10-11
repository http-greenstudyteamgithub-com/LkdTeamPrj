<template>
  <el-dialog
    title="新增商品"
    :visible="dialogVisible"
    width="630px"
    class="diy-el-dig"
    @close="closeDialog"
  >
    <el-form ref="ruleForm" :model="ruleForm" class="demo-ruleForm" label-position="'left'">
      <el-form-item label="商品名称" prop="skuName" :rules="[{required: true,message: '必填',trigger: 'blur'}]">
        <el-input
          v-model="ruleForm.skuName"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="品牌" prop="brandName" :rules="[{required: true,message: '必填',trigger: 'blur'}]">
        <el-input
          v-model="ruleForm.brandName"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="商品价格" prop="price" :rules="[{required: true,message: '必填',trigger: 'blur'}]">
        <el-input
          v-model="ruleForm.price"
          placeholder="请输入"
          type="Number"
        />
      </el-form-item>
      <el-form-item label="商品类型" prop="skuClass.className" :rules="[{required: true,message: '必填',trigger: 'blur'}]">
        <el-select v-model="ruleForm.skuClass.classId" placeholder="请选择">
          <el-option v-for="(item) in classList" :key="item.classId" :value="item.classId" :label="item.className" />
          <!-- <el-option label="区域二" value="beijing" /> -->
        </el-select>
      </el-form-item>

      <el-form-item label="规格" prop="unit" :rules="[{required: true,message: '必填',trigger: 'blur'}]">
        <el-input
          v-model="ruleForm.unit"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="商品图片">

        <el-upload
          class="avatar-uploader"
          action="http://likede2-admin.itheima.net/likede/api/vm-service/sku/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="fileName"
        >
          <img v-if="ruleForm.skuImage" :src="ruleForm.skuImage" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
          <div slot="tip" class="el-upload__tip">支持扩展名：jpg、png,文件不得大于100kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirmBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { skuClassSearchApi } from '@/api'
export default {
  name: 'AddShop',
  props: {
    dialogVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      ruleForm: {
        imageUrl: '',
        skuName: '',
        brandName: '',
        unit: '',
        price: 0,
        classId: '',
        skuClass: {
          className: '',
          classId: ''
        },
        skuImage: ''
      }
    }
  },
  computed: {
    classList() {
      return this.$store.state.sku.classList
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:dialogVisible', false)
      this.$refs.ruleForm.resetFields()
    },
    confirmBtn() {
      console.log(111222)
      const addObj = {
        skuName: this.ruleForm.skuName,
        skuImage: this.skuImage,
        brandName: this.ruleForm.brandName,
        price: +this.ruleForm.price,
        classId: +this.ruleForm.skuClass.classId,
        unit: this.ruleForm.unit
      }
      this.$emit('confirmFn', addObj)
      this.$emit('update:dialogVisible', false)
    },
    // 图片
    handleAvatarSuccess(res, file) {
      // console.log(res)
      this.skuImage = res
      this.ruleForm.skuImage = URL.createObjectURL(file.raw)
    },
    async beforeAvatarUpload(file) {
      console.log(456)
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 / 24 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
    // async skuClassSearch() {

    // }
  }
}

</script>

<style lang="scss" scoped>
::v-deep .el-dialog{
  padding: 0 30px;
  height: 550px;
  .el-dialog__body{
    padding: 5px 20px;
  }
  .el-form-item__label{
    margin-right: 0;
    margin-bottom: 20px;
    width: 90px;
  }
  .el-dialog__footer {
    text-align: center;
    }
  .el-form-item__content{
    display: flex;
  }
}
::v-deep .diy-el-dig{
  .el-form-item__label{
    margin-right: 0;
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
}
.el-dialog .el-dialog__body .el-form-item .el-form-item__content {
    width: 396px;
    line-height: 36px;
}
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
}

.avatar-uploader .el-upload {
    position: relative;
    overflow: hidden;
    background: #f3f6fb;
    border: 1px dashed #d8dde3;
    border-radius: 4px;
    cursor: pointer;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    border: 1px solid #bac0cd;
    width: 84px;
    height: 84px;
    text-align: center;
    color: #bac0cd;
    line-height: 84px;
    text-align: center;
  }
  .avatar {
    font-family: inherit;
    font-size: 100%;
    // line-height: 1.15;
    margin: 0;
    width: 87px;
    height: 87px;
  }
</style>
