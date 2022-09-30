<template>
  <div class="hot">
    <Title title="商品热榜" />
    <div class="list">
      <el-row v-for="item of topSkuList" :key="item.id" type="flex">
        <el-col :span="5">图标</el-col>
        <el-col :span="13" class="skuName">{{ item.skuName }}</el-col>
        <el-col :span="6" class="skuNum">{{ item.count }}单</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Title from '@/views/home/components/title.vue'
import { dayFormate, getMonthFirstDay } from '@/utils/dateFormate'
import { getTopSku } from '@/api'
export default {
  components: {
    Title
  },
  data() {
    return {
      topSkuList: []
    }
  },
  computed: {
    today() {
      return dayFormate(new Date())
    },
    firstDay() {
      return getMonthFirstDay(new Date())
    }
  },
  created() {
    this.getTopSkuInfo()
  },
  methods: {
    async getTopSkuInfo() {
      try {
        this.topSkuList = await getTopSku(10, this.firstDay, this.today)
        // console.log(this.topSkuList)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.hot{
  padding: 20px;
  flex-direction: column;
  height: calc(60vh - 72px);
  min-height: 538px;
  background: #fff;
  border-radius: 20px;
}
.list{
  padding: 30px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.skuName{
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium,PingFang SC;
  font-weight: 500;
  color: #333;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.skuNum{
      height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #737589;
    line-height: 20px;
    text-align: right;
}
</style>
