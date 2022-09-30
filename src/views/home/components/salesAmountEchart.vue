<template>
  <div ref="main" class="main" />
</template>

<script>
import * as echarts from 'echarts/core'
import { TooltipComponent, GridComponent, TitleComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

export default {
  name: 'SalesAmountEchart',
  props: {
    dateList: {
      type: Array,
      required: true
    },
    valueList: {
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
        title: {
          text: '销售额趋势图',
          left: 'center',
          top: '10',
          textStyle: {
            fontSize: 14
          }
        },
        xAxis: {
          type: 'category',
          data: this.dateList,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#999'

            }
          }
        },
        yAxis: {
          type: 'value',
          name: '单位:元',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#dddddd'
            }
          }
        },
        grid: {
          // top: '15%',
          left: '3%',
          right: '10%',
          bottom: '3%',
          // 当刻度标签溢出的时候，grid 区域是否包含坐标轴的刻度标签。如果为true，则显示刻度标签
          // 如果left right等设置为 0% 刻度标签就溢出了，此时决定是否显示刻度标签
          containLabel: true
        },
        tooltip: {
          formatter: function(params) {
            // console.log(params)
            let htmlStr = '<div>'
            var value = params[0].value
            htmlStr = '销售额：' + value + '<br/>' + params[0].axisValue + '</div>'
            return htmlStr
          },
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              type: 'solid'
            },
            label: {}
          }
        },
        series: [
          {
            data: this.valueList,
            type: 'line',
            smooth: true,
            symbolSize: 6, // 设定实心点的大小
            animation: true,
            lineStyle: {
              color: 'red', // 折线的颜色
              width: '4' // 折线粗细
            },
            symbol: 'circle',
            itemStyle: {
              color: '#fff',
              borderColor: 'red',
              borderWidth: 1
            },
            emphasis: {
              scale: 2
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#fdc4c4'
                }, {
                  offset: 1,
                  color: '#fff'
                }
                ],
                global: false
              }
            }
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

