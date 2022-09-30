<template>
  <div ref="main" class="main" />
</template>

<script>
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer
])

export default {
  name: 'SalesRegionEchart',
  props: {
    regionList: {
      type: Array,
      required: true
    },
    regionValue: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  computed: {
    option() {
      return {
        color: ['#91b0ff'],
        title: {
          text: '销售额分布',
          left: 'center',
          top: '10',
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            // console.log(params)
            let htmlStr = '<div>'
            var value = '销售额：' + params[0].value
            htmlStr = value + '<br/>' + params[0].axisValue + '</div>'
            return htmlStr
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.regionList,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#999'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位:元'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '15',
            data: this.regionValue
          }
        ]
      }
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.main)
  },
  methods: {
    setEchart() {
      this.option && this.myChart.setOption(this.option)
    }
  }

}
</script>

<style scoped lang="scss">
.main{
  height: 100%;
  width: 100%;
}

</style>

