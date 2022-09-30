<template>
  <el-row class="partner">
    <i class="iconfont icon-gengduo" @click="$router.push('/node/partner')" />
    <div class="title">合作商点位数Top5</div>
    <el-row type="flex" class="charts">
      <!-- 左边的图表 -->
      <el-col :span="17">
        <div class="chart">
          <div ref="main" class="main" />
        </div>
      </el-col>
      <!-- 右边的信息 -->
      <el-col :span="7">
        <div class="info">
          <div class="num">{{ totalNode }}</div>
          <div class="text">点位数</div>
          <div class="num">{{ partnerCount }}</div>
          <div class="text">合作商数</div>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { getNodeCollect } from '@/api'
import * as echarts from 'echarts/core'
import { LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([LegendComponent, PieChart, CanvasRenderer, LabelLayout])

export default {
  name: 'PartnerChart',
  data() {
    return {
      myChart: null,
      pieValue: [],
      totalNode: 0,
      partnerCount: 0
    }
  },
  computed: {
    option() {
      return {
        color: ['#85a7ff', '#99ebbd', '#ffb18b', '#c6ebff', '#becce6'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>总占比 : {d}%'
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [30, 100],
            center: ['50%', '50%'],
            roseType: 'radius',
            label: {
              formatter: '{b}\n{d}%',
              fontWeight: 600
            },
            labelLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            data: this.pieValue
          }
        ]
      }
    }
  },
  async mounted() {
    await this.getNodeCollect()
    this.myChart = echarts.init(this.$refs.main)
    this.setEchart()
  },
  methods: {
    setEchart() {
      this.option && this.myChart.setOption(this.option)
    },
    async getNodeCollect() {
      try {
        this.pieValue = await getNodeCollect()
        this.totalNode = this.pieValue.reduce((pre, val) => {
          return pre + val.value
        }, 0)
        this.partnerCount = this.pieValue.length
        console.log(this.totalNode)
      } catch (error) {
        console.log(error)
      }
    }
  }

}
</script>
<style scoped lang="scss">
.main{
  height: 100%;
}
.partner{
  position: relative;
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
}
  .title{
    font-size: 16px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #333
  }
.icon-gengduo{
  color: #91b0ff;
  position: absolute;
  top: 20px;
  right: 20px;
}
.charts{
  height: 100%;
}
.chart{
  height: 100%;
  position: relative;
}
.info{
    width: 154px;
    height: 230px;
    padding-top: 47px;
    padding-left: 38px;
    background: linear-gradient(135deg,transparent,#f8f8f9 0) 0 0,linear-gradient(-135deg,transparent 12px,#f8f8f9 0) 100% 0,linear-gradient(-45deg,transparent,#f8f8f9 0) 100% 100%,linear-gradient(45deg,transparent 12px,#f8f8f9 0) 0 100%;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}
.num{
  height: 33px;
  font-size: 24px;
  font-family: PingFangSC-Semibold,PingFang SC;
  font-weight: 600;
  color: #072074;
  line-height: 33px;
}
.text{
  height: 17px;
  margin: 6px 0;
  font-size: 12px;
  font-family: PingFangSC-Regular,PingFang SC;
  font-weight: 400;
  color: #000412;
  line-height: 17px;
}
</style>
