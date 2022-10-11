<template>
  <el-dialog
    title="选择商品"
    class="GoodsDialog"
    :visible="showAddGoodsDialog"
    width="858px"
    @close="handleClose"
  >{{ choosenId }}
    <SearchPanel label1="商品名称：" :label1value.sync="searchCondition.skuName" @onSearch="onSearch" />
    <div class="skuWrapper">
      <el-row :gutter="20">
        <el-col v-for="item of goodsList" :key="item.skuId" :span="5" @click.native="choose(item)">
          <div class="item">
            <div class="sku">
              <img v-if="choosenId===item.skuId" src="~@/assets/common/choosen.png" alt="" class="logo">
              <img class="img" :src="item.skuImage" alt="">
              <div class="name">{{ item.skuName }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button class="add" type="primary" :disabled="!!!choosenId" @click="confirm">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { searchGoods } from '@/api'
export default {
  name: 'ChooseGoods',
  props: {
    showAddGoodsDialog: {
      type: Boolean,
      default: false
    },
    operationItem: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      label1value: '',
      searchCondition: {
        pageIndex: 1,
        pageSize: 10,
        skuName: '',
        classId: ''
      },
      goodsList: [],
      totalCount: 0,
      totalPage: 0,
      choosenId: '',
      chooseSku: {}
    }
  },
  watch: {
    'searchCondition.skuName': {
      handler(newValue) {
        this.onSearch()
      }
    }
  },
  async created() {
    this.searchGoods()
  },
  methods: {
    confirm() {
      this.$emit('changeChannels', this.chooseSku)
      this.handleClose()
    },
    handleClose() {
      this.$emit('update:showAddGoodsDialog', false)
      this.choosenId = ''
      this.chooseSku = {}
    },
    async searchGoods() {
      try {
        const { currentPageRecords, totalCount, totalPage } = await searchGoods(this.searchCondition)
        this.goodsList = currentPageRecords
        this.totalCount = totalCount
        this.totalPage = totalPage
      } catch (error) {
        console.log(error)
      }
    },
    onSearch() {
      this.searchCondition.pageIndex = 1
      this.searchGoods()
    },
    choose(item) {
      this.choosenId = item.skuId
      this.chooseSku = item
    }
  }
}
</script>

<style lang="scss">
.el-dialog{
  border-radius:10px;
}
.GoodsDialog{
  .el-dialog__title{
  line-height: 22px;
    font-size: 16px;
    font-weight: 600
  }
  .el-dialog__footer{
    text-align: center;
  }
  .el-dialog__body{
    padding: 0 20px;
  }
}
.el-col-5{
  width: 20%;
}
</style>

<style lang="scss" scoped>
  .el-button--primary.is-disabled{
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    opacity: .3;
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
.skuWrapper{
  position: relative;
  width: 750px;
  margin: 0px auto;
}
</style>
