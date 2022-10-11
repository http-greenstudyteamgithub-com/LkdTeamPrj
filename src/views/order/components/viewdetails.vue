<template>
  <div>
    <el-button size="medium " type="text" style="color:#5f84ff" @click="dialogTableVisible = true">查询详情</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <div class="toubu-color">
        <el-row>
          <el-col :span="2">
            <div class="grid-content bg-purple" style="margin-top:15px; margin-left:15px;">
              <img class="img-1" src="../../../assets/common/下载.png" alt="">
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light" style="margin-top:18px">
              <span>出货成功</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <img class="img-2" src="./../../../assets/common/pic_2.3b5af41c.png" alt="">
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 订单详情 -->
      <el-form ref="row" :model="row" label-width="120px">
        <el-form-item label="订单编号：" prop="orderNo">{{ row.orderNo }}</el-form-item>
        <el-form-item label="设备编号：" prop="innerCode">{{ row.innerCode }}</el-form-item>
        <el-form-item label="完成时间：" prop="updateTime">{{ row.updateTime }}</el-form-item>
        <el-form-item label="设备地址：" prop="addr">{{ row.addr }}</el-form-item>
        <el-form-item label="商品名称：" prop="skuName">{{ row.skuName }}</el-form-item>
        <el-form-item label="订单金额：" prop="price">{{ row.price / 100 }}</el-form-item>
        <el-form-item label="创建时间：" prop="createTime">{{ row.createTime }}</el-form-item>
        <el-form-item label="支付方式：" prop="discount">{{ '微信支付' }}</el-form-item>

      </el-form>
    </el-dialog>

  </div>
</template>

<script>

export default {
  name: 'ViewDetails',
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 查询详情弹出层
      dialogTableVisible: false,
      FormData: []
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style style lang="scss">
 .el-dialog__body{
      padding: 20px 20px 30px;;
    }
     .el-dialog {
        width: 630px;
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
    .toubu-color {
        height: 54px;
        width: 580px;
    margin-bottom: 30px;
    background-color: hsla(0,0%,92.5%,.39);
}
.img-2{
    position: absolute;
    top: -25%;
}
.el-form-item__label {
        font-weight: normal;
        margin-right: 0px;
     }
     .input1 {
      width:400px ;

     }
</style>
