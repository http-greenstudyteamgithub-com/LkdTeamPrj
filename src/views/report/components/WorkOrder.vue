<template>
  <div>
    <div class="left ">日销售统计

      <el-row :gutter="20" class="workorder-box">
        <el-col :span="8"><div class="grid-content bg-purple">0</div>当日销售量（个）</el-col>
        <el-col :span="8"><div class="grid-content bg-purple">0</div>当日销售额（元）</el-col>
        <el-col :span="8"><div class="grid-content bg-purple">0</div>当日分成（元）</el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
// 碰到的报错 意思是模板在解析到 渲染请求回来数据时 出现未找到此元素 total
// 结论是在created阶段还没有发出异步请求 mounted已经渲染好页面了 所以造成了控制台出现报错 说找不到请求回来的数据里的total属性
// 解决办法：给将要渲染的DOM元素模板 加上v-if 如果拿到了请求的数据就渲染页面（.length > 0） 如果没有拿到就不让mounted钩子函数渲染挂载页面 让它等一等

export default {
  data() {
    return {

    }
  },

  created() {
  },
  methods: {
    // 工单统计请求

  }
}
</script>

  <style scoped lang="scss">
  .grid-content{
    margin-bottom: 10px;
    margin-top: 10px;
    text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
    color:#072074;
    font-weight: 700;
    font-size: 36px;
  text-align: center;
  }
  .left{
    padding-top: 20px;
    padding-left: 20px;
  width: 750px;
  height: 166px;
  background-color: #e9f3ff;
  border-radius: 20px;
  background-image: url(../../../assets/common/circle.png),url(../../../assets/common/task.png);
  background-repeat: no-repeat,no-repeat;
  background-position: 0 0,calc(100% - 12px) 100%;
  }
  .workorder-box{
    font-size: 13px;
   color: #91a7dc;
    font-weight: 400;
    margin-top: 20px;
    text-align: center;
  }

  </style>

