<template>
  <div class="computeContainer">
    <el-row type="flex">
      <el-col :span="13">
        <bg
          color="#e9f3ff"
          :textcolor="false"
          :width="42"
          :bg="bg"
          :time="true"
          :datalist="runData"
          title="运营人员"
          :totaltitle="totaltitle"
        />
      </el-col>
      <el-col :span="12"> <bg
        color="#fbefe8"
        :textcolor="true"
        :width="42"
        :bg="bg1"
        :time="true"
        :datalist="repairData"
        title="运维人员"
        :totaltitle="totaltitle1"
      /></el-col>
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-col :span="12"><div class="compute-status">
        <el-row type="flex" class="row-bg" align="middle">
          <el-col :span="11"><h4>工单状态</h4></el-col>
          <el-col :span="12">
            <el-row type="flex" class="row-bg" justify="space-between" align="middle">
              <el-col :span="12"> <time-picker /></el-col>
              <el-col :span="7"> <change-time @change="change" /></el-col>
            </el-row>
          </el-col>

        </el-row>
        <div class="compute-statusText">暂无数据</div>
      </div></el-col>
      <el-col :span="6.5">
        <div class="compute-rank">
          <el-row type="flex" class="row-bg" justify="space-between" align="middle">
            <el-col :span="14"><h4>人效排名(月度)</h4></el-col>
            <el-col :span="6"><span class="all"><all /></span></el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="space-between" align="middle">
            <el-col :span="4" />
            <el-col :span="14">  <change-time :times="time1" /></el-col>
            <el-col :span="4" />
          </el-row>
          <div class="compute-rankText">暂无数据</div>
        </div></el-col>
    </el-row>
  </div>
</template>

<script>
import { getTodayData } from '@/api'
import { dayFormateDetail, getDottime } from '@/utils/dateFormate'
import bg from './components/bg.vue'
import ChangeTime from './components/ChangeTime.vue'
import TimePicker from './components/timePicker.vue'
import All from './components/All.vue'
export default {
  name: 'UserTaskStats',
  components: {
    bg,
    TimePicker,
    ChangeTime,
    All
  },
  data() {
    return {
      bg: 'data:image/png;base64,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',
      bg1: 'http://likede2-admin.itheima.net/img/operation.4120cc58.png',
      repairData: {},
      runData: {},
      totaltitle: ['工单总数（个）', '完成工单（个）', '拒绝工单（个）', '运营人员数（个）'],
      totaltitle1: ['工单总数（个）', '完成工单（个）', '拒绝工单（个）', '运维人员数（个）'],
      time1: ['运营人员', '运维人员']

    }
  },
  created() {
    this.getTodayDatas()
  },
  methods: {
    async getTodayDatas() {
      const start = getDottime(new Date())
      const end = dayFormateDetail(new Date())
      // console.log(start, end)
      const data = await getTodayData(start, end)
      const keys = ['date', 'progressTotal', 'repair']
      keys.forEach(function(k) {
        delete data[0][k]
        delete data[1][k]
      })
      this.runData = data[0]
      this.repairData = data[1]
      console.log(data[0], data[1])
    },
    change(i) {
      this.$store.commit('user/SET_INDEX_TIME', i)
    }
  }
}
</script>
<style lang="scss" scoped>
.computeContainer{
  // padding: 20px;
  .compute-status,.compute-rank{
   padding: 5px;
    height: 545px;
      margin: 15px 3px;
      border-radius: 10px;
  }
  .compute-rank{
    width: 22vw;
     background:#fff url('~@/assets/common/empty.png') no-repeat center;
    margin-right: 20px;
   .compute-rankText{
      font-size: 12px;
      text-align: center;
      margin-top: 250px;
    }
  }
  .compute-status{
     background:#fff url('~@/assets/common/empty.png') no-repeat center;
    width: 60vw;
    .compute-statusText{
          font-size: 12px;
      text-align: center;
      margin-top: 285px;
    }
  }
}
</style>
