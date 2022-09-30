<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="18">
        <!-- 上左上部分-统计展示 -->
        <el-row>
          <el-col :span="13" class="box">
            <StaticBlue />
          </el-col>
          <el-col :span="11" class="box">
            <StaticPink />
          </el-col>
        </el-row>
        <!-- 上左下部分-销售数据 -->
        <el-row class="box">
          <SaleChart />
        </el-row>
      </el-col>
      <!-- 上右商品热榜 -->
      <el-col :span="6" class="box">
        <hotSale />
      </el-col>
    </el-row>
    <el-row class="bottomRegion">
      <el-col :span="14" class="box bottom"><Partner /></el-col>
      <el-col :span="10" class="box bottom"><AbnormalSet /></el-col>
    </el-row>
  </div>
</template>

<script>
import StaticBlue from './components/staticBlue.vue'
import StaticPink from './components/staticPink.vue'
import hotSale from './components/hotSale.vue'
import SaleChart from './components/salechart.vue'
import Partner from './components/parter.vue'
import AbnormalSet from './components/abnormalSet.vue'
export default {
  name: 'Home',
  components: {
    StaticBlue,
    StaticPink,
    hotSale,
    SaleChart,
    Partner,
    AbnormalSet
  }
}
</script>

<style lang="scss" scoped>
.box{
  padding: 10px;
  border-radius: 20px;
}
.bottomRegion{
  height: calc(40vh - 30px);
  min-height: 365px;
}
.bottom{
  height: 100%;
}
</style>
