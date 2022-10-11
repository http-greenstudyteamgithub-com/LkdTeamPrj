<template>
  <div>
    <el-dialog
      title="货道设置"
      class="channelDialog"
      :visible="showChanelListDialog"
      width="940px"
      @close="handleClose"
    >
      <div class="vm-config-channel-dialog-wrapper">
        <!-- 总计信息 -->
        <el-row class="basic" type="flex" justify="space-between">
          <el-col :span="18">
            <div class="detail">
              <div>货道行数：{{ typeInfo.vmRow }}</div>
              <div>货道列数：{{ typeInfo.vmCol }}</div>
              <div>货道容量（个）：{{ typeInfo.channelMaxCapacity }}</div>
            </div>

          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end"><el-button class="goodsbtn" size="mini" @click="smartSort">智能排货</el-button></el-row>
          </el-col>
        </el-row>
        <!-- 货道列表 -->
        <el-scrollbar v-if="showChanelListDialog" ref="scroll" class="scrollbar">
          <el-row v-for="(goodsRow,index) of channels" :key="index" type="flex" class="row">
            <template v-if="goodsRow && goodsRow[0]">
              <el-col v-for="(item,index1) of goodsRow" :key="index1" :span="12">
                <div class="item">
                  <div class="code">id{{ item.channelCode }}</div>
                  <div v-if="item.sku" class="sku">
                    <img :src="item.sku.skuImage" alt="">
                    <div>{{ item.sku.skuName }}</div>
                  </div>
                  <div v-else class="sku">
                    <img src="~@/assets/common/nogoods.png" alt="">
                    <div>暂无商品 </div>
                  </div>
                  <div>
                    <el-button type="text" @click="add(item)">添加</el-button>
                    <el-button type="text" style="color: #ff5a5a;" :disabled="!item.sku" @click="del(item)">删除</el-button>
                  </div>
                </div>
              </el-col>
            </template>

          </el-row>
        </el-scrollbar>
        <i :class="['el-icon-arrow-left','left',{disabled:disabledLeft}]" @click="scrollLeft" />
        <i :class="['el-icon-arrow-right','right',{disabled:disabledRight}]" @click="scrollRight" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="add" type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <ChooseGoods :show-add-goods-dialog.sync="showAddGoodsDialog" :operation-item="operationItem" @changeChannels="changeChannels" />
    <smartSort v-if="showSmartSort" :business-id="businessId" :show-smart-sort.sync="showSmartSort" />
  </div>
</template>

<script>
import ChooseGoods from './chooseGoods.vue'
import smartSort from '@/views/vm/index/components/smartSort'
import { setChannel } from '@/api'
export default {
  name: 'ChannelList',
  components: {
    ChooseGoods,
    smartSort
  },
  props: {
    showChanelListDialog: {
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
      chanelList: [],
      typeInfo: {},
      innerCode: '',
      disabledLeft: false,
      disabledRight: true,
      loading: false,
      showAddGoodsDialog: false,
      operationItem: {},
      showSmartSort: false
    }
  },
  computed: {
    row() {
      return this.typeInfo.vmRow
    },
    column() {
      return this.typeInfo.vmCol
    },
    channels() {
      const arrAll = []
      for (var i = 1; i <= this.row; i++) {
        arrAll[i - 1] = []
        this.chanelList.forEach(item => {
          if (item.channelCode.split('-')[0] === i + '') {
            arrAll[i - 1].push(item)
          }
        })
      }
      return arrAll
    }
  },
  methods: {
    async handleClose() {
      this.$emit('update:showChanelListDialog', false)
    },
    async  confirm() {
      try {
        const res = await setChannel(this.innerCode, this.chanelList)
        console.log('1111', res)
      } catch (error) {
        console.log(error)
      } finally {
        this.handleClose()
      }
    },
    scrollRight() {
      const el = this.$refs.scroll.wrap
      this.disabledRight = true
      el.scrollLeft = 847
    },
    scrollLeft() {
      const el = this.$refs.scroll.wrap
      el.scrollLeft = -847
      this.disabledLeft = true
    },
    del(item) {
      item.sku = null
      item.skuId = 0
    },
    add(item) {
      this.showAddGoodsDialog = true
      this.operationItem = item
    },
    changeChannels(item) {
      this.operationItem.sku = item
      this.operationItem.skuId = item.skuId
    },
    smartSort() {
      this.showSmartSort = true
    }

  }
}
</script>

<style lang="scss">
.vm-config-channel-dialog-wrapper {
    position: relative;
    width: 847px;
    margin: 0 auto;
    .scrollbar {
    width: 814px;
    height: 384px!important;
    margin: 0 auto;
    .el-scrollbar__wrap {
    scroll-behavior: smooth;
    }
  }
  .left{
    font-size: 40px;
    position: absolute;
    top: 50%;
    left: -20px;
    cursor: pointer;
  }
  .right{
    font-size: 40px;
    position: absolute;
    top: 50%;
    right:-20px;
    cursor: pointer;
  }
  .disabled{
    color: #ccc;
    cursor: auto;
  }
}
.scrollbar .el-scrollbar__bar.is-vertical {
    display: block !important;
}
.scrollbar .el-scrollbar__thumb{
  display: block !important;
}
.channelDialog{
  .el-dialog__title{
  line-height: 22px;
    font-size: 16px;
    font-weight: 600
  }
  .el-dialog__footer{
    text-align: center;
  }
  .goodsbtn{
    background-color: #5f84ff;
    border: 1px solid #5f84ff;
    height: 35px;
    color: #fff;
  }
  .basic{
  background-color: #f3f6fb;
  padding:10px 20px;
  margin-bottom: 20px;
  }
  .num{
  padding: 10px 0;
  }
  .operation{
    padding: 12px 0;
    text-align: center;
  }
  .el-col-12{
    padding: 0 8px;
  }
}
</style>

<style lang="scss" scoped>
  .detail{
    display: flex;
    height:100%;
    align-items: center;
    &>div{
      padding-right: 30px;
    }
  }
  .item{
    position: relative;
    width: 150px;
    height: 180px;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.06);
    border-radius: 4px;
    text-align: center;
    margin-bottom: 20px;
    padding: 0 8px;
    .code{
    position: absolute;
    top: 10px;
    left: 0;
    width: 43px;
    height: 23px;
    line-height: 23px;
    background: #829bed;
    border-radius: 0 10px 10px 0;
    font-size: 12px;
    color: #fff;
    }
    .sku{
    height: 135px;
    padding-top: 16px;
    background-color: #f6f7fb;
    border-radius: 4px;
    img{
    display: inline-block;
    width: 84px;
    height: 78px;
    margin-bottom: 10px;
    -o-object-fit: contain;
    object-fit: contain;
    }
    }
  }
</style>
