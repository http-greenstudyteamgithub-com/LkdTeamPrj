<template>
  <div>
    <!-- 头部开始 -->
    <el-row>
      <el-col>
        <div class="grid-content1 bg-purple">
          <!-- 工单统计 -->
          <WorkOrder />
          <!-- 销售统计 -->
          <SalesOrder @orderCount="orderCountFN" @orderAmount="orderAmountFN" @totalBill="totalBillFN" />
        </div>
      </el-col>
    </el-row>
    <!-- 头部结束 -->
    <!-- 主体表单区域 -->
    <el-card shadow="never">
      <!-- 选择合作商 -->
      <div class="box">

        <Partner />
        <!-- 选择合作商 -->
        <!-- 日期框 -->
        <span class="demonstration"> 日期：</span>
        <el-date-picker
          v-model="value"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <!-- 日期框 -->
        <el-button type="primary" style="background-color:#5373e0" class="el-icon-search" @click="SearchFn">  查询</el-button>
      </div>
      <!-- 文字展示区域 -->
      <div class="text-show">
        <span class="one-text">笔数统计： <span style="color: #ff5757;font-size: 20px;font-weight: 500;">{{ orderCount }}</span>  个</span>
        <span class="one-text">收入统计： <span style="color: #ff5757;font-size: 20px;font-weight: 500;">{{ orderAmount }}</span>  元</span>
        <span class="one-text">分成统计： <span style="color: #ff5757;font-size: 20px;font-weight: 500;">{{ totalBill }}</span>  元</span>
      </div>
      <!-- 文字展示区域 -->
      <!-- 表单区域 -->
      <el-table
        :data="FormData"
        style="width: 100%;"
        :header-cell-style="headerCellStyle"
      >
        <el-table-column
          prop="date"
          label="订单日期"
          width="250"
        />
        <el-table-column
          prop="ownerName"
          label="合作商"
          width="245"
        />
        <el-table-column
          prop="ratio"
          label="分成比例"
          width="245"
        />
        <el-table-column
          prop="orderTotalMoney"
          label="收入(元)"
          width="245"
        />
        <el-table-column
          prop="orderCount"
          label="笔数"
          width="245"
        />
        <el-table-column
          prop="totalBill"
          label="分成金额(元)"
          width="245"
        />
      </el-table>
      <!-- 表单区域 -->
      <el-pagination
        v-if="totalCount>10"
        :current-page="pageIndex"
        :page-size="pageSize"
        layout="slot, prev,next"
        prev-text="上一页"
        next-text="下一页"
        :total="totalCount"
        @prev-click="prevclick"
        @next-click="nextclick"
      >
        <span class="totalPage">共{{ totalCount }}条记录 第{{ pageIndex }}/{{ totalPage }}页</span>
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import { getCooperativePartnerAPI, getOrderCountAPI, getorderAmountAPI, getTotalBillsAPI } from '@/api'
import SalesOrder from './components/SalesOrder.vue'
import WorkOrder from './components/WorkOrder.vue'
import Partner from './components/Partner.vue'
import dayjs from 'dayjs'

export default {
  components: {
    SalesOrder,
    WorkOrder,
    Partner

  },
  data() {
    return {
      orderCount: '',
      orderAmount: '',
      totalBill: '',
      value: [dayjs(+new Date()).startOf('month').format('YYYY-MM-DD'), dayjs(+new Date()).format('YYYY-MM-DD')],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      totalCount: 0,
      start: dayjs(+new Date()).startOf('month').format('YYYY-MM-DD'),
      end: dayjs(+new Date()).format('YYYY-MM-DD'),

      FormData: [{
        date: '',
        ownerName: '',
        ratio: '',
        orderTotalMoney: 0,
        orderCount: 0,
        totalBill: 0
      }]

    }
  },
  created() {
    this.getCooperativePartner()
  },
  methods: {
    // 表头样式
    headerCellStyle() {
      return 'background-color:#f3f6fb;font-weight:400;'
    },
    async getCooperativePartner() {
      const res = await getCooperativePartnerAPI(this.start, this.end, this.pageIndex, this.pageSize)
      this.FormData = res.currentPageRecords
      this.ratio = res.currentPageRecords.map(item => item.ratio + '%')
      this.orderTotalMoney = res.currentPageRecords.map(item => item.orderTotalMoney / 100)
      this.totalBill = res.currentPageRecords.map(item => item.totalBill / 100)
      console.log(this.totalBill)
      console.log(this.orderTotalMoney)
      console.log(this.ratio)
      this.pageIndex = +res.pageIndex
      this.pageSize = +res.pageSize
      this.totalPage = +res.totalPage
      this.totalCount = +res.totalCount
    },
    // 查询按钮点击事件
    async SearchFn() {
      const res = await getCooperativePartnerAPI(this.value[0], this.value[1], this.pageIndex, this.pageSize)
      console.log(this.value[0], this.value[1])
      this.FormData = res.currentPageRecords
      this.pageIndex = +res.pageIndex
      this.pageSize = +res.pageSize
      this.totalPage = +res.totalPage
      this.totalCount = +res.totalCount
      this.start = dayjs(this.value[1]).format('YYYY-MM-DD HH:mm:ss')
      this.end = dayjs(this.value[0]).format('YYYY-MM-DD HH:mm:ss')
      const res1 = await getOrderCountAPI(this.end, this.start)
      this.orderCount = res1
      const res2 = await getorderAmountAPI(this.end, this.start)
      this.orderAmount = res2 / 100
      const res3 = await getTotalBillsAPI(this.end, this.start)
      this.totalBill = res3 / 100
    },
    // 切换下一页
    nextclick() {
      this.pageIndex++
      this.SearchFn()
    },
    // 切换上一页
    prevclick() {
      this.pageIndex--
      this.SearchFn()
    },

    // 三个文字显示
    orderCountFN(value) {
      this.orderCount = value
    },
    orderAmountFN(value) {
      this.orderAmount = value
    },
    totalBillFN(value) {
      this.totalBill = value
    }
  }
}
</script>

<style style lang="scss">
  .totalPage{
  flex: 1;
  font-size: 16px!important;
  color: #dbdfe5!important;
  margin-left: 10px;
  font-weight: 400;
}
.grid-content1 {

  display: flex;
width: 1120px;
height: 166px;
border-radius: 20px;
margin-bottom: 20px;
}
.text-show{
  margin-top: 20px;
  width: 1500px;
  height: 33px;
  .one-text{
    margin-right: 40px;
    font-size: 14px;
  }
}
.box{
  display: flex;
  line-height: 40px;
}
</style>
