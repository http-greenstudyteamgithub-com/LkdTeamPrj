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
  </div>
</template>

<script>
import { getAutomatAPI } from '@/api/index.js'
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
      search: {}
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

