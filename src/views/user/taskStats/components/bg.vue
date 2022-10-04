<template>
  <div
    class="totalcontainer"
    :style="{width:activewidth,
             background:' '+color+' url('+ bg+')  no-repeat  right bottom',}"
  >
    <div class="toptitle">
      <strong>{{ title }}</strong>&nbsp;&nbsp;
      <strong v-if="time">(当天)</strong>
      <span v-else>{{ start }}~{{ end }}</span>

    </div>
    <div class="bottom-date ">
      <el-row :gutter="20">
        <el-col v-for="(val, key,i) in datalist" :key="i" :span="24/totaltitle.length">
          <h3 :class="{boxshadow: textcolor}">{{ val }}</h3>
          <p>{{ totaltitle[i] }}</p></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getMonthFirstDayByDot, dayFormateByDot } from '@/utils/dateFormate'
export default {
  name: 'Bg',
  props: {
    title: {
      type: String,
      default: '工单统计'
    },
    bg: {
      type: String,
      default: 'http://likede2-admin.itheima.net/img/task.66b715b7.png'
    },
    color: {
      type: String,
      default: '#e9f3ff'
    },
    width: {
      type: Number,
      default: 528
    },
    datalist: {
      type: Object,
      required: true
    },
    totaltitle: {
      type: Array,
      required: true
    },
    textcolor: {
      type: Boolean,
      default: false
    },
    time: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      start: '',
      end: ''
    }
  },
  computed: {
    activewidth() {
      return this.width + 'vw'
    }
  },
  mounted() {
    this.start = getMonthFirstDayByDot(new Date())
    this.end = dayFormateByDot(new Date())
    // console.log(this.start, this.end)
  }
}
</script>

<style lang="scss" scoped>

.totalcontainer{
  min-height: 150px;
  padding: 20px;
  border-radius: 20px;
  .left-box{
background-color: #e9f3ff;
background-image: url('~@/assets/common/circle.png'),url('~@/assets/common/car.png');
background-repeat: no-repeat,no-repeat;
background-position: 0 0,right bottom;
  }
  .toptitle{
    // margin: 10px;
    span{
      margin: 0 10px;
      font-size: 12px;
      font-weight: 200;
    }
  }
  .bottom-date{
    margin-left: 10px;
    // padding-bottom: 40px;

     h3{
      font-size: 35px;
      color: #072074;
      text-shadow: 1px 0.5px 3px #072074;
      margin-bottom: -4px;
    p{
      color: #e0aec6;
    }
    }
    .boxshadow{
    color: #ff5757;
    text-shadow: 1px 0.5px 3px  #ff5757;
    }
    }
    p{
      font-size: 12px;
      color: #b7b4df;
      // margin-top: -15px;
    }
}
</style>
