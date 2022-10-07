<template>
  <div class="editnodediaglog">
    <el-dialog title="新增合作商" :visible="showEditDialog" width="42%" @close="handerClose">
      <el-form :model="form" :rules="rules">
        <el-form-item prop="name" label="合作商名称：" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.name" autocomplete="off" /> -->
          <el-input
            v-model="form.name"
            type="text"
            placeholder="请输入"
            maxlength="10"
            autocomplete="off"
            show-word-limit
          /></el-form-item>
        <el-form-item prop="contact" label="联系人：" :label-width="formLabelWidth">
          <el-input
            v-model="form.contact"
            type="text"
            placeholder="请输入"
            maxlength="10"
            autocomplete="off"
            show-word-limit
          />
        </el-form-item>
        <el-form-item prop="mobile" label="联系电话：" :label-width="formLabelWidth">
          <el-input
            v-model="form.mobile"
            type="text"
            placeholder="请输入"
            maxlength="11"
            autocomplete="off"
            show-word-limit
          />
        </el-form-item>
        <el-form-item prop="ratio" label="分成比例：" :label-width="formLabelWidth">
          <el-input-number v-model="form.ratio" controls-position="right" :min="1" :max="100" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { changePartner } from '@/api'
export default {
  props: {
    showEditDialog: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        ratio: [{ required: true, message: '请输入', trigger: 'blur' }],
        contact: [{ required: true, message: '请输入', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入', trigger: 'blur' },
          { validator: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/, trigger: 'blur' }
        ]

      },
      formLabelWidth: '120px',
      form: {
        name: '',
        ratio: '',
        contact: '',
        mobile: '',
        id: ''
      }
    }
  },
  methods: {
    handerClose() {
      this.$parent.showEditDialog = false
    },
    async submit() {
      try {
        console.log(this.form)
        await changePartner(this.form)
        this.$parent.showEditDialog = false
        this.form = {
          name: '',
          ratio: '',
          contact: '',
          mobile: '',
          id: ''
        }
        this.$emit('getparnerregion')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" socped>
.editnodediaglog{
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

