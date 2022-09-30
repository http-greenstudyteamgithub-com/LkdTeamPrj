<template>
  <div class="static bg1 bg2">
    <div class="content">
      <Title :title="title" />
      <div class="showNum">
        <div v-for="(item,index) of salesStatic" :key="index">
          <h1 class="num">{{ item.amount }}</h1>
          <div class="dec">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderCount, getOrderAmount } from '@/api'
import { dayFormate, getMonthFirstDay } from '@/utils/dateFormate'
import Title from '@/views/home/components/title.vue'
export default {
  name: 'StaticPink',
  components: {
    Title
  },
  data() {
    return {
      salesStatic: [],
      title: '销售统计'
    }
  },
  computed: {
    today() {
      return `${dayFormate(new Date())} 23:59:59`
    },
    firstDay() {
      return `${getMonthFirstDay(new Date())} 00:00:00`
    }
  },
  created() {
    this.getOrderMsg()
  },
  methods: {
    // 获得销售订单总数和销售额
    async getOrderMsg() {
      const res1 = await getOrderCount(this.firstDay, this.today)
      const obj1 = {}
      obj1.title = '订单量（个）'
      obj1.amount = res1
      this.$set(this.salesStatic, 0, obj1)
      const res2 = await getOrderAmount(this.firstDay, this.today)
      const obj2 = {}
      obj2.title = '销售额（万元）'
      obj2.amount = (res2 / 1000000).toFixed(2)// 有点奇怪 和案例一致
      this.$set(this.salesStatic, 1, obj2)
    }
  }
}
</script>

<style scoped>
.showNum{
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.static{
  flex-direction: column;
  height: calc(20vh - 24px);
  min-height: 166px;
  display: flex;
  border-radius: 20px;
}
.content{
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.bg1{
  background: #e9f3ff;
  background-image: url("~@/assets/common/circle.png"),url("~@/assets/common/task.png");
  background-repeat: no-repeat,no-repeat;
  background-position: 0 0,calc(100% - 12px) 100%;
}
.bg2{
  background: #fbefe8 url("~@/assets/common/pinkpig.png") no-repeat calc(100% - 12px) 100%;
}
.showNum{
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.num{
  text-shadow: 2px 4px 7px rgba(255,99,85,.5);
  color: #ff5757;
}
.dec{
    height: 17px;
    margin-top: 3px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #ff5757;
    line-height: 17px
}
</style>
