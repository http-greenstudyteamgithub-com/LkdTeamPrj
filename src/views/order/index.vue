<template>
  <div>
    <!-- 搜索组件模块 S -->
    <div style="margin-bottom:20px">
      <el-card shadow="never">
        <span style="font-size:15px">订单编号：</span>
        <el-input
          v-model.trim="orderNo"
          class="input-box"
          placeholder="请输入订单编号"
          :clearable="true"
          style="width:200px;margin-right: 8px;height: 36px;line-height: 36px; "
        />
        <!-- 日期框 -->

        <span class="demonstration">选择日期：</span>
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
      </el-card>
    </div>
    <!-- 搜索组件模块 M -->
    <!-- 表单模块 S -->
    <el-card shadow="never">
      <el-table
        :data="tableData"
        style="width: 100%;"
        :header-cell-style="headerCellStyle"
      >
        <el-table-column
          prop="policyId"
          label="序号"
          width="100"
          type="index"
        />
        <el-table-column
          prop="orderNo"
          label="订单编号"
          width="250"
        />
        <el-table-column
          prop="skuName"
          label="商品名称"
          width="225"
        />
        <el-table-column
          prop="price"
          label="订单金额(元)"
          width="220"
        >
          <template slot-scope="{row}">
            {{ row.price / 100 }}

          </template></el-table-column>
        <el-table-column
          prop="innerCode"
          label="设备编号"
          width="225"
        />
        <el-table-column
          prop="status"
          label="订单状态"
          width="180"
        >{{ '出货成功' }}</el-table-column>
        <el-table-column
          prop="createTime"
          label="订单日期"
          width="160"
        />
        <el-table-column
          prop="handle"
          label="操作 "
          width="100"
        >
          <template slot-scope="{row}">
            <!-- 查询详情按钮 -->
            <div>
              <!-- 查询按钮 -->
              <viewdetails :row="row" />
            </div>
          </template>
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <el-pagination
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
      <!-- 分页 -->
    </el-card>
    <!-- 表单模块 M -->

  </div>
</template>

<script>
import viewdetails from './components/viewdetails'
import { getOrderSearchAPI } from '@/api'
export default {
  name: 'Order',
  components: {
    viewdetails
  },
  data() {
    return {

      // 头部搜索框
      orderNo: '',
      // 时间选择框
      value: '',
      startDate: '',
      endDate: '',
      tableData: [
      ],
      totalCount: 0,
      totalPage: 0,
      pageIndex: 1,
      pageSize: 10

    }
  },
  created() {
    this.getOrderSearchlist()
  },
  methods: {
    headerCellStyle() {
      return 'background-color:#f3f6fb;font-weight:400;'
    },

    // 渲染订单列表
    async getOrderSearchlist() {
      const { currentPageRecords, pageIndex, pageSize, totalCount, totalPage } = await getOrderSearchAPI(this.pageIndex, this.pageSize, this.orderNo, this.startDate, this.endDate)
      this.tableData = currentPageRecords
      this.totalCount = +totalCount
      this.totalPage = +totalPage
      this.pageIndex = +pageIndex
      this.pageSize = +pageSize
    },
    // 切换下一页
    nextclick() {
      this.pageIndex++
      this.getOrderSearchlist()
    },
    // 切换上一页
    prevclick() {
      this.pageIndex--
      this.getOrderSearchlist()
    },

    // 点击查询
    async SearchFn() {
      this.startDate = this.value[0]
      this.endDate = this.value[1]
      this.getOrderSearchlist()
      // const { currentPageRecords, pageIndex, pageSize, totalCount, totalPage } = await getOrderSearchAPI(this.pageIndex, this.pageSize)
      // this.tableData = currentPageRecords
      // this.totalCount = +totalCount
      // this.totalPage = +totalPage
      // this.pageIndex = +pageIndex
      // this.pageSize = +pageSize
      this.orderNo = ''
    }
  }
}
</script>

<style scoped lang="scss">
  .totalPage{
  flex: 1;
  font-size: 16px!important;
  color: #dbdfe5!important;
  margin-left: 10px;
  font-weight: 400;
}
</style>
