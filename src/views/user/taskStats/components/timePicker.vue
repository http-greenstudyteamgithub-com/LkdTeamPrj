<template>
  <div class="block">
    <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value1: '',
      value2: ''
    }
  }
}
</script>

 <style lang="scss" scoped>

   .el-date-editor.el-input__inner {
    padding: 1px 3px;
    width:20vw;
    height:  35px;
    line-height: 35px;
 .el-date-editor .el-range__icon {
    font-size: 17px;
    margin-left: -5px;
    color: #C0C4CC;
    float: left;
    line-height: 24px;
}
.el-date-editor .el-range-separator {
    line-height: 22px;
    font-size: 14px;
    width: 5%;
    color: #303133;
}
}

  </style>
