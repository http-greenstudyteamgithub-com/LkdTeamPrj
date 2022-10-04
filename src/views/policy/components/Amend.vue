<template>
  <div>
    <!-- 按钮 -->
    <el-button size="medium " type="text" style="color:#86b42b" @click="dialogFormVisible = true">修改</el-button>
    <!-- 弹出框 -->
    <el-dialog title="修改策略" :visible="dialogFormVisible" @close="handleClose">
      <el-form ref="FormData" :model="FormData" label-width="120px">
        <!-- 第一个输入框 -->
        <el-form-item
          label="策略名称："
          prop="name"
        >
          <el-input
            v-model="row.policyName"
            type="text"
            maxlength="10"
            style="margin-bottom: 15px;"
            class="input1"
            show-word-limit
          />
        </el-form-item>
        <!-- 第二个输入框 -->
        <el-form-item label="策略方案：">
          <el-input-number v-model="row.discount" controls-position="right" :min="1" :max="100" class="input1" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="quxiao-btn" @click="handleClose">取 消</el-button>
        <el-button class="queding-btn" @click="AmendStrategy">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAmendStrategyAPI } from '@/api'
export default {
  props: {
    row: {
      type: Object,
      required: true
    },
    getTacticsList: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      name: '',
      num: '',
      dialogFormVisible: false,
      FormData: { ...this.row }
    }
  },
  methods: {
    handleClose() {
      this.dialogFormVisible = false
      this.$refs.FormData.resetFields()
    },
    async AmendStrategy() {
      this.name = this.row.policyName
      this.num = this.row.discount
      await getAmendStrategyAPI(this.row.policyId, this.name, this.num)
      this.handleClose()
    }
  }
}
</script>

<style style lang="scss">
    .el-dialog__body{
      padding: 20px 20px 30px;;
    }
     .el-dialog {
            width: 630px;
            // height: 300px;
        border-radius: 10px ;
    }
    .el-dialog__header{
          border-radius: 10px;
            background-color: #fff;
        .el-dialog__title{
          color: #000;
          font-size: 16px;
        font-weight: 600;

    }
    }
     .el-form-item__label {
        font-weight: normal;
        margin-right: 0px;
     }
     .input1 {
      width:400px ;

     }
    .dialog-footer{
      margin-right: 190px;
      .quxiao-btn {
        width: 80px;
        height: 36px;
        padding: 0;
        background-color: #fbf4f0;
        border: none;
        color: #655b56;
        // margin-bottom: 20px
        margin-right: 20px;

     }
     .queding-btn{
        width: 80px;
        height: 36px;
        padding: 0;
        background: linear-gradient(135deg,#ff9743,#ff5e20);
        border: none;
     }
    }

    </style>

