<template>
  <div class="addnodediaglog">
    <el-dialog title="新增点位" :visible.sync="showAddDialog" width="42%" @close="handerClose">
      <el-form :model="form" :rules="rules">
        <el-form-item prop="name" label="点位名称：" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.name" autocomplete="off" /> -->
          <el-input
            v-model="form.name"
            type="text"
            placeholder="请输入"
            maxlength="15"
            autocomplete="off"
            show-word-limit
          /></el-form-item>
        <el-form-item prop="regionId" label="所在区域：" :label-width="formLabelWidth">
          <el-select v-model="form.regionId" placeholder="请选择">
            <el-option
              v-for="(item,index) in allnodelist"
              :key="index"
              :label="item.region.name"
              :value="item.region.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="businessId" label="所在商圈：" :label-width="formLabelWidth">
          <el-select v-model="form.businessId" placeholder="请选择">
            <el-option
              v-for="(item,index) in allnodelist"
              :key="index"
              :label="item.businessType.name"
              :value="item.businessType.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="ownerId" label="归属合作商：" :label-width="formLabelWidth">
          <el-select v-model="form.ownerId" placeholder="请选择">
            <el-option
              v-for="(item,index) in allnodelist"
              :key="index"
              :label="item.ownerName"
              :value="item.ownerId"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="addr" label="详细地址：" :label-width="formLabelWidth">
          <!-- <el-select v-model="value" placeholder="请选择"> -->
          <el-cascader
            v-model="form.addr"
            placeholder="请选择"
            size="large"
            :options="options"
            @change="handleChange"
          />

          <!-- </el-select> -->

        </el-form-item>
        <el-form-item prop="str" label-width="130px">
          <el-input
            v-model="form.str"
            type="textarea"
            placeholder="请输入详细地址"
            maxlength="60"
            autocomplete="off"
            show-word-limit
            :rows="3"
            :value="addlist.addr"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handerClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
export default {
  props: {
    showAddDialog: {
      type: Boolean,
      required: false
    },
    allnodelist: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      value: [],
      form: {
        name: '',
        regionId: '',
        businessId: '',
        ownerId: '',
        addr: '',
        str: '',
        createUserId: 1
      },
      formLabelWidth: '120px',
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        account: [{ required: true, message: '请输入', trigger: 'blur' }],
        ratio: [{ required: true, message: '请输入', trigger: 'blur' }],
        contact: [{ required: true, message: '请输入', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入', trigger: 'blur' }]

      },
      options: regionData,
      selectedOptions: [],
      addlist: {
        name: '',
        addr: '',
        areaCode: '',
        createUserId: '',
        regionId: '',
        businessId: '',
        ownerId: '',
        ownerName: ''
      }
    }
  },
  computed: {
  },
  created() {
    // this.geiAllList()
    // console.log(this.allnodelist)
    // this.regionList()
  },
  methods: {
    handerClose() {
      this.$parent.showAddDialog = false
      this.form = {
        name: '',
        regionId: '',
        businessId: '',
        ownerId: '',
        addr: '',
        str: ''
      }
    },
    async geiAllList() {
      try {
        // console.log(1)
      } catch (error) {
        console.log(error)
      }
    },
    handleChange(value) {
      // console.log(value)
    },
    submit() {
      console.log(this.form)
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
