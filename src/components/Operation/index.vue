<template>
  <el-row class="btns">
    <el-button size="small" icon="el-icon-circle-plus-outline" class="add" @click="$emit('add')">{{ buttonOneName }}</el-button>
    <el-button v-if="buttonTwoName" size="small" class="set" @click="$emit('moreOperation')">{{ buttonTwoName }}</el-button>
  </el-row>
</template>

<script>
// 需要给组件传入 2个自定义方法
// 一个是第一个按钮新建的方法 add 一个是第二个按钮的方法 moreOperation
export default {
  props: {
    // 新建按钮的名字
    buttonOneName: {
      type: String,
      default: '新建'
    },
    // 第二个按钮的名字 如果不传就不会出现
    buttonTwoName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.btns{
  margin-bottom: 20px;
}
.add{
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
    color: #fff!important;
    &:hover{
      background: linear-gradient(135deg,#ea7b22,#d0410a)!important;
    }
}
.set{
  align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
    &:hover{
      background-color: #f3e7e1!important;
    }
}
</style>
