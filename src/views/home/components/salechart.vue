<template>
  <div class="saleCharts">
    <!-- 切换年月日标题 -->
    <div class="header">
      <div>
        <Title title="销售数据" :first-day="titleFirstDay" />
      </div>
      <div class="time">
        <span v-for="(item,index) of time" :key="index" :class="['item',{active:index===isActiveTime}]" @click="changeTime(index)">{{ item }}</span>
      </div>
    </div>
    <!-- 图表区域 -->
    <div class="charts">
      <div id="amount" ref="amount"><SalesAmountEchart ref="salesAmountEchart" :date-list="dateList" :value-list="valueList" /></div>
      <div id="regin" ref="regin"><SalesRegionEchart ref="salesRegionEchart" :region-list="regionList" :region-value="regionValue" /></div>
    </div>
  </div>
</template>

<script>
import Title from './title.vue'
import dayjs from '@/utils/dateFormate'
import { getAmountCollect, getRegionCollect } from '@/api'
import { dayFormate, getWeekBeforeDay, getMonthFirstDay, geYearFirstDay } from '@/utils/dateFormate'
import SalesAmountEchart from './salesAmountEchart.vue'
import SalesRegionEchart from './salesRegionEchart.vue'
export default {
  name: 'SaleChart',
  components: {
    Title,
    SalesAmountEchart,
    SalesRegionEchart
  },
  data() {
    return {
      time: ['周', '月', '年'],
      isActiveTime: 0,
      collectType: 1,
      dateList: [],
      valueList: [],
      regionList: [],
      regionValue: []
    }
  },
  computed: {
    today() {
      return dayFormate(new Date())
    },
    firstDay() {
      if (this.isActiveTime === 0) {
        return getWeekBeforeDay(new Date())
      } else if (this.isActiveTime === 1) {
        return getMonthFirstDay(new Date())
      } else {
        return geYearFirstDay(new Date())
      }
    },
    titleFirstDay() {
      return this.firstDay.split('-').join('.')
    }
  },
  watch: {
    isActiveTime: {
      immediate: true,
      async handler(newValue) {
        if (newValue === 0) {
          const res = await getAmountCollect(this.collectType, this.firstDay, this.today)
          this.dateList = res.xAxis.map((item) => dayjs(item).format('dddd'))
          this.valueList = res.series
          const res1 = await getRegionCollect(this.firstDay, this.today)
          this.regionValue = res1.series.map(item => item.toFixed(2))
          this.regionList = res1.xAxis
        } else if (newValue === 1) {
          const res = await getAmountCollect(this.collectType, this.firstDay, this.today)
          this.dateList = res.xAxis.map((item) => dayjs(item).format('M月D日'))
          this.valueList = res.series
          const res1 = await getRegionCollect(this.firstDay, this.today)
          this.regionValue = res1.series.map(item => item.toFixed(2))
          this.regionList = res1.xAxis
        } else {
          const res = await getAmountCollect(this.collectType, this.firstDay, this.today)
          this.dateList = res.xAxis.map((item) => dayjs(item).format('YYYY年M月'))
          this.valueList = res.series
          const res1 = await getRegionCollect(this.firstDay, this.today)
          this.regionValue = res1.series.map(item => item.toFixed(2))
          this.regionList = res1.xAxis
        }
        this.$nextTick(() => {
          this.$refs.salesAmountEchart.setEchart()
          this.$refs.salesRegionEchart.setEchart()
        })
      }
    }
  },
  methods: {
    changeTime(index) {
      this.isActiveTime = index
      if (this.isActiveTime === 0 || this.isActiveTime === 1) {
        this.collectType = 1
      } else {
        this.collectType = 2
      }
    }
  }

}
</script>

<style scoped lang="scss">
.saleCharts{
    display: flex;
    flex-direction: column;
    height: calc(40vh - 68px);
    min-height: 352px;
    background: #fff;
    border-radius: 20px;
    padding: 20px;
}
.charts{
  flex: 1;
}
.header{
  display: flex;
  justify-content: space-between;
}
.time{
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 129px;
  height: 34px;
  background: rgba(233,243,255,.37);
  border-radius: 10px;
  .item{
    width: 37px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    color: #9ca3b4;
    cursor: pointer;
    text-align: center;
  }
  .active{
    background: #fff;
    box-shadow: 0 0 4px 0 rgba(0,0,0,.11);
    border-radius: 7px;
    font-weight: 600;
    color: #333;
  }
}
.charts{
  // height: 100%;
  display: flex;
  #regin{
    flex: 1;
  }
  #amount{
    flex: 1;
  }
}
</style>
