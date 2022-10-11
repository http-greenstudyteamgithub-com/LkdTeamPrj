<template>
  <div>
    <div class="search">
      <el-form :inline="true" class="form-inline">
        <el-form-item label="设备编号：">
          <el-input
            v-model.trim="value"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" class="searchBtn" size="small" @click="Search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :header-cell-style="{background:'#f5f7fa',color:'#737674',fontWeight:400}"
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        min-width="10%"
      />

      <el-table-column
        prop="innerCode"
        label="设备编号"
        min-width="10%"
      />
      <el-table-column
        prop="type.name"
        label="设备型号"
        min-width="10%"
      />
      <el-table-column
        prop="node.name"
        label="详细地址"
        min-width="10%"
      />
      <el-table-column
        label="运营状态"
        min-width="10%"
      >
        <template slot-scope="{row}">
          <span style="margin-left: 10px">{{ row.vmStatus === 0 ? '未投放' : row.vmStatus === 1 ? '运营' : '撤机'
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="设备状态"
        min-width="20%"
      >
        <template slot-scope="{row}">
          <span style="margin-left: 10px">
            <el-tag :class="row.status[10001] ? 'success': 'warning'" style="margin-left: 10px ; border-radius: 40px ">{{ row.status[10001] ? '在线':'离线' }}</el-tag>
            <el-tag :class="row.status[10002] ? 'success': 'warning'" style="margin-left: 10px ; border-radius: 40px "> {{ row.status[10002] ? '货道':'货道故障' }}</el-tag>
            <el-tag :class="row.status[10003] ? 'success': 'warning'" style="margin-left: 10px ; border-radius: 40px "> {{ row.status[10001] ? '传动轴':'传动轴故障' }}</el-tag>

          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="10%"
      >
        <template slot-scope="{row}">
          <el-button type="text" size="small" @click="handleClick(row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination v-if="totalCount<data.pageSize" :current-page.sync="data.pageIndex" :total-count="page.totalCount" :page-size="data.pageSize" :total-page="page.totalPage" @getList="taskSearchResult" />
    <!-- 设备状态 -->
    <el-dialog title="设备详情" :visible.sync="dialogFormVisible">
      <div style="width: 579px; margin: 0px auto;">
        <el-row :gutter="20" class="sku-stats" type="flex" justify="space-around" align="middle" style="margin-left: -10px; margin-right: -10px;">
          <el-col :span="6">
            <span>销售量:</span>
            <span class="number">{{ Count }}</span>
            <span class="unit">&nbsp;个</span>
          </el-col>
          <el-col :span="6">
            <span>销售额:</span>
            <span class="number">{{ Order }}</span>
            <span class="unit">&nbsp;元</span>
          </el-col>
          <el-col :span="6">
            <span>补货次数:</span>
            <span class="number">{{ SupplyCount }}</span>
            <span class="unit">&nbsp;次</span>
          </el-col>
          <el-col :span="6">
            <span>维修次数:</span>
            <span class="number">{{ RepairCount }}</span>
            <span class="unit">&nbsp;次</span>
          </el-col>
        </el-row>
        <div class="sku-title">
          商品销量（月）
        </div>
        <el-row v-if="SkuCollect.length" class="sku-list">
          <el-col v-for="(item,index) in SkuCollect" :key="index" :span="6">
            <el-row class="sku-item">
              <el-col :span="14">
                <div :title="item.skuName" class="sku-name">{{ item.skuName }}</div>
              </el-col>
              <el-col :span="10">
                :{{ item.count }}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div v-if="!SkuCollect.length" style="text-align: center;">
          当前设备未销售商品
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAutomatAPI } from '@/api/index.js'
import { orderCountAPI, gteOrderAmountAPI, getSupplyCountAPI, getRepairCountAPI, getSkuCollectAPI } from '@/api/status'
import { dayFormate, getMonthFirstDay } from '@/utils/dateFormate'
export default {
  name: 'Device',

  data() {
    return {
      value: '',
      formInline: {
        user: '',
        region: ''
      },
      data: {
        pageIndex: 1,
        pageSize: 10
      },
      totalCount: 0,
      totalPage: 0,
      list: [],
      page: {
        pageIndex: 0,
        totalCount: 0,
        totalPage: 0
      },
      search: {},
      dialogFormVisible: false,
      Count: 0,
      Order: 0,
      SupplyCount: 0,
      RepairCount: 0,
      SkuCollect: []
    }
  },
  computed: {
    firstDay() {
      return `${getMonthFirstDay(new Date())} 00:00:00`
    },
    today() {
      return `${dayFormate(new Date())} 23:59:59`
    },
    firstDay1() {
      return getMonthFirstDay(new Date())
    },
    today1() {
      return dayFormate(new Date())
    }

  },
  created() {
    this.getAutomat()
  },
  methods: {
    async getAutomat() {
      const res = await getAutomatAPI(this.data)
      this.list = res.currentPageRecords
      this.page.pageIndex = +res.pageIndex
      this.page.totalCount = +res.totalCount
      this.page.totalPage = +res.totalPage
    },
    taskSearchResult() {
      this.getAutomat()
    },
    Search() {
      if (this.value.length === 0) {
        this.data.pageIndex = 1
        this.data.pageSize = 10
        this.data.innerCode = ''
        this.getAutomat()
      } else {
        this.data.pageIndex = 1
        this.data.pageSize = 10
        this.data.innerCode = this.value
        this.getAutomat()
      }
    },
    //  点击查看详情
    handleClick(row) {
      this.dialogFormVisible = true
      // 获取销售量
      this.orderCount(row.innerCode)
      // 获取收入
      this.gteOrderAmount(row.innerCode)
      // 获取售货机补货次数
      this.getSupplyCount(row.innerCode)
      //  获取售货机维修次数
      this.getRepairCount(row.innerCode)
      // 获取售货机商品销量
      this.getSkuCollect(row.innerCode)
    },
    // 获取销售量
    async orderCount(code) {
      const data = {
        start: this.firstDay,
        end: this.today,
        innerCode: code
      }
      const res = await orderCountAPI(data)
      this.Count = res
    },
    // 获取收入
    async gteOrderAmount(code) {
      const data = {
        start: this.firstDay,
        end: this.today,
        innerCode: code
      }
      const res = await gteOrderAmountAPI(data)
      this.Order = (res / 100).toFixed(2)
    },
    // 获取售货机补货次数
    async getSupplyCount(code) {
      const data = {
        start: this.firstDay1,
        end: this.today1,
        innerCode: code
      }
      const res = await getSupplyCountAPI(data)
      this.SupplyCount = res
    },
    //  获取售货机维修次数
    async getRepairCount(code) {
      const data = {
        start: this.firstDay1,
        end: this.today1,
        innerCode: code
      }
      const res = await getRepairCountAPI(data)
      this.RepairCount = res
    },
    // 获取售货机商品销量
    async getSkuCollect(code) {
      const data = {
        start: this.firstDay1,
        end: this.today1,
        innerCode: code
      }
      const res = await getSkuCollectAPI(data)
      this.SkuCollect = res
    }
  }
}
</script>

<style lang="scss" scoped>
  .search{
    display: flex;
    height: 64px;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 17px;
    background-color: #fff;
  }
  ::v-deep .el-dialog{
    margin-top: 15vh;
    width: 630px;
  }
  ::v-deep .el-dialog {
    border-radius: 10px;
}
  ::v-deep .el-dialog__body{
    padding: 20px 20px 30px;
    color: #666;
    font-size: 14px;
    word-break: break-all;
}
.sku-stats{
  height: 54px;
    background: rgba(227,233,245,.39);
    text-align: center;
}
.sku-title{
  margin: 20px 0 12px 6px;
}
.sku-list{
    border-top: 1px solid #d8dde3;
    border-left: 1px solid #d8dde3;

    .sku-item{
    padding: 0 10px;
    line-height: 40px;
    border-right: 1px solid #d8dde3;
    border-bottom: 1px solid #d8dde3;

    .sku-name{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
}
}
.number{
  color: #5f84ff;
}
.unit{
    font-size: 12px;
    color: #5f84ff;
}

</style>

<style lang="scss">
  .el-form-item{
    margin-bottom: 0;
    .el-input__inner{
      line-height: 36px;
      height: 36px;
      outline:none;
      &:focus{
        border:1px solid #5f84ff
        }
    };
    .el-input--suffix.is-focus .el-input__inner{
      border:1px solid #5f84ff;
    }
  }
  .el-form-item__label {
    line-height: 36px;
    font-weight: 400;
    margin-right: 10px;
  }
  .searchBtn{
    background-color: #5f84ff;
    border: 1px solid #5f84ff;
    height: 35px;
  }
  .success{
    background-color: #47d597;
    color: #fff;
  }
  .warning {
    background-color: #ffbb2a;
    color: #fff;
  }
</style>

