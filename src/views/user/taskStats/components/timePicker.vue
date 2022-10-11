<template>
  <div class="block">
    <el-date-picker
      v-model="value1"
      type="daterange"
      value-format="yyyy-MM-dd"
      range-separator="~"
      unlink-panels
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  </div>
</template>

<script>
import { geYearFirstDay, dayFormate, getWeekBeforeDay, getMonthFirstDayByDot } from '@/utils/dateFormate'
export default {
  name: 'TimePicker',
  data() {
    return {
    }
  },
  computed: {
    value1() {
      const a = this.$store.state.user.indexTime
      if (a === 0) { // 通过时间选择器组件传值
        const b = getWeekBeforeDay(new Date())
        const c = dayFormate(new Date())
        return [b, c]
      } else if (a === 1) {
        const b = getMonthFirstDayByDot(new Date())
        const c = dayFormate(new Date())
        return [b, c]
      } else {
        const b = geYearFirstDay(new Date())
        const c = dayFormate(new Date())
        return [b, c]
      }
    }
  }

}

</script>

 <style lang="scss" >

   .el-date-editor.el-input__inner {
    padding: 1px 3px;
    width:20vw;
   height: 26px;
    line-height: 26px;
}
 .el-date-editor .el-range__icon {
    line-height: 23px;
}
.el-date-editor .el-range-separator {
    line-height: 22px;
    font-size: 14px;
    width: 5%;
    color: #303133;
}

  </style>
