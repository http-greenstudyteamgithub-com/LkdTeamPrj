<template>
  <div class="box">
    <!-- 新建按钮 -->
    <el-button type="primary" style="background: linear-gradient(135deg,#ff9743,#ff5e20)!important;border: 0px solid transparent;" class="el-icon-circle-plus-outline  btn-box" @click="newForm"> 新建</el-button>
    <el-dialog title="新增策略" :visible="dialogFormVisible" @close="handleClose">
      <el-form ref="FormData" :model="FormData" label-width="120px">
        <!-- 第一个输入框 -->
        <el-form-item
          label="策略名称："
          show-word-limit
        >
          <el-input
            v-model="FormData.name"
            style="margin-bottom: 15px;"
            class="input1"
            placeholder="请输入"
            maxlength="10"

            show-word-limit
          />
        </el-form-item>
        <!-- 第二个输入框 -->
        <el-form-item label="策略方案：">
          <el-input-number v-model="FormData.num" controls-position="right" :min="1" :max="10" class="input1" label="num" @change="handleChange" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="quxiao-btn" @click="handleClose">取 消</el-button>
        <el-button class="queding-btn" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: 'AddBtn',

  data() {
    return {
      dialogFormVisible: false,
      FormData: {
        name: '',
        num: 1

      }
    }
  },
  methods: {
    handleClose() {
      this.dialogFormVisible = false
      this.$refs.FormData.resetFields()
      console.log(this.FormData.name)
    },
    handleChange() {
    },
    // 新建 按钮弹出层
    newForm() {
      this.dialogFormVisible = true

      console.log('弹出')
    },
    async confirmAdd() {

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
