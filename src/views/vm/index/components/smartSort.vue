<template>
  <el-dialog
    class="dialog-content"
    title="智能排货"
    :visible="showSmartSort"
    @close="handleClose"
  >
    <div class="skuWrapper">
      <div style="margin-bottom: 10px;">该区域属于{{ name }}商圈适合销售一下商品：</div>
      <el-row :gutter="20">
        <el-col v-for="item of list" :key="item.skuId" :span="5" @click.native="choose(item)">
          <div class="item">
            <div class="sku">
              <img class="img" :src="item.image" alt="">
              <div class="name">{{ item.skuName }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div slot="footer" class="dialog-footer" style="">
      <el-button class="btn1" @click="handleClose">采纳建议</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getBusinessTop10API, getName } from '@/api'
export default {
  name: 'SmartSort',
  props: {
    showSmartSort: {
      type: Boolean,
      default: false
    },
    businessId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      list: [],
      name: ''
    }
  },
  created() {
    this.getBusinessTop()
  },
  methods: {
    handleClose() {
      this.$emit('update:showSmartSort', false)
    },
    async getBusinessTop() {
      const res = await getBusinessTop10API(this.businessId)
      const name = await getName(this.businessId)
      this.list = res
      this.name = name
    }
  }

}
</script>
<style lang="scss" scoped>

::v-deep .el-dialog {
    width: 858px !important
}
.btn1{
  background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
  color: #fff;
}
.item{
  padding-bottom: 20px;
  .sku{
  position: relative;
  width: 134px;
  height: 134px;
  padding-top: 16px;
  background-color: #f6f7fb;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  }
  .logo{
    position: absolute;
    top: 0;
    left: 0;
  }
  .img{
      display: inline-block;
      width: 83px;
      height: 84px;
      margin-bottom: 5px;
      object-fit: contain;
  }
  .name{
    width: 102px;
    margin: 0px auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
