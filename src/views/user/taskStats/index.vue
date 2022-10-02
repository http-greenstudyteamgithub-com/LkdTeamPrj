<template>
  <div class="computeContainer">
    <el-row type="flex">
      <el-col :span="13">
        <bg
          color="#e9f3ff"
          :textcolor="false"
          :width="40"
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
        :width="40"
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
              <el-col :span="18"> <time-picker /></el-col>
              <el-col :span="6"> <change-time /></el-col>

            </el-row>
          </el-col>

        </el-row>
      </div></el-col>
      <el-col :span="6.5">
        <div class="compute-rank">
          <el-row type="flex" class="row-bg" justify="space-between" align="middle">
            <el-col :span="14"><h4>人效排名(月度)</h4></el-col>
            <el-col :span="6"><span>全部</span></el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="space-between" align="middle">
            <el-col :span="4" />
            <el-col :span="14">  <change-time :times="time1" /></el-col>
            <el-col :span="4" />

          </el-row>
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
export default {
  name: 'UserTaskStats',
  components: {
    bg,
    TimePicker,
    ChangeTime
  },
  data() {
    return {
      bg: 'http://likede2-admin.itheima.net/img/task.66b715b7.png',
      bg1: 'http://likede2-admin.itheima.net/img/sale.606b0d8c.png',
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
  }
  .compute-status{
     background:#fff url('~@/assets/common/empty.png') no-repeat center;
    width: 60vw;;
  }
}
</style>
