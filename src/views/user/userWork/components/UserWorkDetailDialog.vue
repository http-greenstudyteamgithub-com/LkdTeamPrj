<template>
  <div class="UserWorkDetailDialog">

    <el-dialog
      title="人员详情"
      width="40%"
      :visible="isShowDialog"
      style="border-radius:10px"
      show-close
      @close="cancel"
    >
      <div class="top">
        <el-row :gutter="20">
          <el-col :span="8"><div class="grid-content bg-purple">人员名称：{{ detailInfo.userName }}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple" />角色：{{ detailInfo.roleName }}</el-col>
          <el-col :span="8"><div class="grid-content bg-purple" />联系电话：{{ detailInfo.mobile }}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24"><div class="region-name">负责区域：{{ regionName }}</div></el-col>
        </el-row>
      </div>
      <div class="user-work">
        <el-row type="flex">
          <el-col :span="5"><div class="items"> &nbsp;&nbsp;</div></el-col>
          <el-col :span="5"><div class="items">总工单数</div></el-col>
          <el-col :span="5"><div class="items">拒绝工单</div></el-col>
          <el-col :span="5"><div class="items">完成工单</div></el-col>
          <el-col :span="5"><div class="items">进行中工单</div></el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="5" class="bottom-item"><div> 本周</div></el-col>
          <el-col :span="5" class="bottom-item"><div>{{ week.total }}</div></el-col>
          <el-col :span="5" class="bottom-item"><div>{{ week.cancelCount }}</div></el-col>
          <el-col :span="5" class="bottom-item"><div>{{ week.workCount }}</div></el-col>
          <el-col :span="5" class="bottom-item"><div>{{ week.progressTotal }}</div></el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="5"><div class="bottom-item"> 本月</div></el-col>
          <el-col :span="5"><div class="bottom-item">{{ month.total }}</div></el-col>
          <el-col :span="5"><div class="bottom-item">{{ month.cancelCount }}</div></el-col>
          <el-col :span="5"><div class="bottom-item">{{ month.workCount }}</div></el-col>
          <el-col :span="5"><div class="bottom-item">{{ month.progressTotal }}</div></el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="5"><div class="bottom-item"> 本年</div></el-col>
          <el-col :span="5"><div class="bottom-item">{{ year.total }}</div></el-col>
          <el-col :span="5"><div class="bottom-item">{{ year.cancelCount }}</div></el-col>
          <el-col :span="5"><div class="bottom-item">{{ year.workCount }}</div></el-col>
          <el-col :span="5"><div class="bottom-item">{{ year.progressTotal }}</div></el-col>
        </el-row>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { getWeekBeforeDaySecond, geYearFirstDaySecond, getMonthFirstDaySecond, dayFormateDetail } from '@/utils/dateFormate'
import { getuserInfo, getuserWorkInfo } from '@/api'
export default {
  name: 'UserWorkDetailDialog',
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    }
    // detailInfo: {
    //   type: Object,
    //   required: true
    // }
  },
  data() {
    return {
      regionName: '',
      detailInfo: {},
      week: {},
      month: {},
      year: {}
    }
  },
  methods: {
    cancel() {
      this.$emit('update:isShowDialog', false)
    },
    async getuserInfos() {
      try {
        const id = this.detailInfo.userId
        const getYearFirstDay = geYearFirstDaySecond(new Date())
        const WeekBeforeDay = getWeekBeforeDaySecond(new Date())
        const MonthFirstDay = getMonthFirstDaySecond(new Date())
        const dayFormates = dayFormateDetail(new Date())
        const data = await getuserInfo(id)
        this.regionName = data.regionName
        this.week = await getuserWorkInfo(id, WeekBeforeDay, dayFormates)
        this.month = await getuserWorkInfo(id, MonthFirstDay, dayFormates)
        this.year = await getuserWorkInfo(id, getYearFirstDay, dayFormates)
        console.log(this.year)

        console.log(data)
      } catch (error) {
        console.log(error)
        this.$message.error('加载人员信息失败')
      }
    }
  }
}
</script>

<style lang="scss" >
.UserWorkDetailDialog{
  .el-dialog {
    border-radius: 10px;
}
   width: 40vw;
   height: 385px;
  border-radius: 10px;
  .top{
    width: 37vw;
    height: 86px;
    background-color: #f3f6fb;
    padding:20px;
    .region-name{
      margin-top: 20px;
    }
  }
  .el-dialog__body {
    padding: 15px 20px;
    color: #606266;
    font-size: 12px;
}
.user-work {
  width: 37vw;
  margin: 20px 0;
    // line-height: 40px;
    height: 160px;
    text-align: center;

    .items{
    line-height: 40px;
    height: 40px;
     background-color: #f7f8fd;
      border: 1px solid #d8dde3;
    }
      .bottom-item{
    line-height: 40px;
    height: 40px;
      border: 1px solid #d8dde3;
    }

}
}
</style>
