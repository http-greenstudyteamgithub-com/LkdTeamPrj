<template>
  <div>
    <div class="right">月销售统计

      <el-row :gutter="20" class="sales-statistics">
        <el-col :span="8"><div class="grid-content11 bg-purple">{{ salesvolume }}</div>当月销售量（个）</el-col>
        <el-col :span="8"><div class="grid-content11 bg-purple">{{ orderAmount }}</div>当月销售额（元）</el-col>
        <el-col :span="8"><div class="grid-content11 bg-purple">{{ totalBill }}</div>当月分成（元）</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getOrderCountAPI, getorderAmountAPI, getTotalBillsAPI } from '@/api'
import dayjs from 'dayjs'
export default {
  name: 'SalesOrder',
  data() {
    return {
      start: dayjs(+new Date()).startOf('month').format('YYYY-MM-DD'),
      end: dayjs(+new Date()).format('YYYY-MM-DD'),
      start1: dayjs(+new Date()).startOf('month').format('YYYY-MM-DD HH:mm:ss'),
      end1: dayjs(+new Date()).format('YYYY-MM-DD HH:mm:ss'),
      salesvolume: '',
      orderAmount: '',
      totalBill: ''
    }
  },
  computed: {
  },
  created() {
    this.getOrderCount()
    this.getorderAmount()
    this.getTotalBills()
  },
  methods: {
    // 销售额统计
    async getOrderCount() {
      const res = await getOrderCountAPI(this.start1, this.end1)
      this.salesvolume = res
      this.$emit('orderCount', this.salesvolume)
    },
    async getorderAmount() {
      const res = await getorderAmountAPI(this.start1, this.end1)
      this.orderAmount = res / 100
      this.$emit('orderAmount', this.orderAmount)
    },
    async getTotalBills() {
      const res = await getTotalBillsAPI(this.start1, this.end1)
      this.totalBill = res / 100
      this.$emit('totalBill', this.totalBill)
    }

  }
}
</script>

  <style scoped lang="scss">
      span {
     font-size: 12px;
   color: #999999;
   margin-left: 10px;
      }
  .right {
    background: #fbefe8 url(../../../assets/common/pinkpig.png) no-repeat calc(100% - 12px) 100%;
    padding-top: 20px;
    padding-left: 20px;
    margin-left: 20px;
    width: 730px;
    height: 166px;
  background-color:#fbefe8;
  border-radius: 20px;
  }
  .grid-content11{
    text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
  text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
    font-weight: 700;
    font-size: 36px;
    color:#ff5757
  }
  .sales-statistics{
    font-size: 13px;
    margin-top: 20px;
    text-align: center;
    color: #de9690;
  }
  </style>

