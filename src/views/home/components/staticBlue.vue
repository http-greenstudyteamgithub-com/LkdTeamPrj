<template>
  <div class="static  bg1">
    <div class="content">
      <Title :title="title" />
      <div class="showNum">
        <div v-for="(item,index) in workOrderList" :key="index">
          <h1 class="num">{{ item.amount }}</h1>
          <div class="dec">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/views/home/components/title.vue'
import { dayFormate, getMonthFirstDay } from '@/utils/dateFormate'
import { getNowWorkOrderInfo } from '@/api'
export default {
  name: 'StaticBlue',
  components: {
    Title
  },
  data() {
    return {
      workOrderList: [],
      title: '工单统计'
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
    this.getNowWorkOrderInfo()
  },
  methods: {
    async getNowWorkOrderInfo() {
      try {
        const data = await getNowWorkOrderInfo(this.firstDay, this.today)
        Object.keys(data[0]).forEach((key) => {
          const obj = {}
          switch (key) {
            case 'cancelTotal':
              obj.title = '取消工单(个)'
              obj.amount = data[0][key] + data[1][key] || 0
              this.$set(this.workOrderList, 3, obj)
              break
            case 'total':
              obj.title = '工单总数(个)'
              obj.amount = data[0][key] + data[1][key] || 0
              this.$set(this.workOrderList, 0, obj)
              break
            case 'completedTotal':
              obj.title = '完成工单(个)'
              obj.amount = data[0][key] + data[1][key] || 0
              this.$set(this.workOrderList, 1, obj)
              break
            case 'progressTotal':
              obj.title = '进行工单(个)'
              obj.amount = data[0][key] + data[1][key] || 0
              this.$set(this.workOrderList, 2, obj)
              break
          }
        })
      } catch (error) {
        console.dir(error)
      }
    }
  }
}
</script>

<style scoped>
.box{
  padding: 10px;
}
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
.num{
  text-shadow: 2px 4px 7px rgba(85,132,255,.5);
  color: #072074;
}
.dec{
    height: 17px;
    margin-top: 3px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
     color: #91a7dc;
    line-height: 17px
}

</style>
