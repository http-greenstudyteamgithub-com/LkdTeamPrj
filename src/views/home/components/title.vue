<template>
  <div><span class="title">{{ title }} </span><span class="date">{{ firstDay }}~{{ today }}</span></div>
</template>

<script>
import { dayFormateByDot, getMonthFirstDayByDot } from '@/utils/dateFormate'
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      default: ''
    },
    today: {
      type: String,
      default: dayFormateByDot(+new Date())
    },
    firstDay: {
      type: String,
      default: getMonthFirstDayByDot(new Date())
    }
  },
  computed: {
  }
}
</script>

<style scoped>
  .title{
    font-size: 16px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #333
  }
  .date{
    margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #999;
  }
</style>
