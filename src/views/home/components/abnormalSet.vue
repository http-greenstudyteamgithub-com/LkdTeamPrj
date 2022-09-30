<template>
  <div class="setChart">
    <i class="iconfont icon-gengduo" @click="$router.push('/node/partner')" />
    <div>异常设备监控</div>
    <div v-if="failureEq.length===0" class="empty">
      <img src="~@/assets/common/empty.png">
      <div class="msg">暂无数据</div>
    </div>

  </div></template>

<script>
import { getFailureEquipmentNumber } from '@/api'
export default {
  data() {
    return {
      failureEq: []
    }
  },
  created() {
    this.getFailureEquipmentNumber()
  },
  methods: {
    async  getFailureEquipmentNumber() {
      this.failureEq = await getFailureEquipmentNumber()
    }
  }
}
</script>

<style scoped lang="scss">
.setChart{
  position: relative;
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
}
.icon-gengduo{
  color: #91b0ff;
  position: absolute;
  top: 20px;
  right: 20px;
}
.empty{
  display: flex;
  height: 100%;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  img{
    height: 125px;
    width: 125px;
  }
  .msg{
    margin-top: 25px;
    color: #20232a;
    font-size: 14px;
  }
}
.main{
  height: 100%;
}
</style>
