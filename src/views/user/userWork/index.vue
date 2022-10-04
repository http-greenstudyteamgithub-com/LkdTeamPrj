<template>
  <div class="userWorkList">
    <search-panel
      label1="人员搜索:"
      :label1value.sync="page.userName"
      label2="角色:"
      @onSearch="onSearch"
    >
      <template v-slot:searchPanelSlot>
        <el-select v-model="page.isRepair" placeholder="请选择" clearable>
          <el-option label="运营员" :value="false" />
          <el-option label="维修员" :value="true" />
        </el-select>
      </template>
    </search-panel>
    <!-- 表格 -->
    <Table
      :header-cell-style="headerCellStyle"
      :stripe="false"
      :table-data="tableData"
      :header-columns="headerColumns"
      :loading="loading"
      style="width: 100%"
    >
      <template slot="operation">
        <el-table-column
          label="操作"
        >
          <template slot-scope="{row}">
            <span style="color:#6486ff" @click="getDetail(row)">查看详情</span>

          </template>
        </el-table-column>
      </template>

    </Table>
    <!-- 分页组件 -->
    <Pagination
      v-if="totalCount>page.pageSize"
      :current-page.sync="page.pageIndex"
      :total-count="totalCount"
      :total-page="totalPage"
      :page-size="page.pageSize"
      @getList="getUserWorklist"
    />
    <!-- 查看详情弹出窗 -->
    <UserWorkDetailDialog
      ref="detailDialog"
      :is-show-dialog.sync="showUserWorkDialog"

      @initUserWork="initUserWork"
    />
  </div>
</template>

<script>
import { getuserWorklist } from '@/api'
import SearchPanel from '@/components/SearchPanel'
import Table from '@/components/Table'
import UserWorkDetailDialog from './components/UserWorkDetailDialog'
export default {
  name: 'UserWork',
  components: {
    SearchPanel,
    Table,
    UserWorkDetailDialog
  },
  data() {
    return {
      totalCount: 0, // 总数
      totalPage: 0, // 总页数
      page: {
        pageIndex: 1,
        pageSize: 10,
        userName: '',
        isRepair: ''

      },
      loading: false, // 加载中
      tableData: [], // 表格数据
      headerCellStyle: { background: '#f5f7fa', color: '#737674', fontWeight: 400 },
      headerColumns: [
        {
          index: true,
          label: '序号'
        },
        {
          label: '人员名称',
          prop: 'userName'

        },
        {
          label: '角色',
          prop: 'roleName',
          minWidth: '100%'
        },
        {
          label: '联系电话',
          prop: 'mobile',
          minWidth: '100%'
        },
        {
          label: '完成工单（本月）',
          prop: 'workCount',
          minWidth: '100%'
        }, {
          label: '进行中工单',
          prop: 'progressTotal'

        },
        {
          label: '拒绝工单（本月）',
          prop: 'cancelCount',
          minWidth: '100%'
        },

        {
          // minWidth: '10%',
          slot: 'operation'// 操作插槽 具名插槽
        }

      ],
      showUserWorkDialog: false // 详情展示框
    }
  },
  created() {
    this.getUserWorklist()
  },
  methods: {
    async getUserWorklist() {
      try {
        const data = await getuserWorklist(this.page)
        this.loading = true
        this.tableData = data.currentPageRecords
        this.page.pageIndex = +data.pageIndex
        this.totalCount = +data.totalCount
        this.page.pageSize = +data.pageSize
        this.totalPage = +data.totalPage
        console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    initUserWork() {
      this.page = {
        pageIndex: 1,
        pageSize: 10,
        isRepair: '',
        userName: ''
      }
      this.getUserWorklist()
    },
    onSearch() {
      this.page.pageIndex = 1
      this.getUserWorklist()
    },
    getDetail(row) {
      // console.log(row)/
      this.showUserWorkDialog = true
      this.$refs.detailDialog.detailInfo = { ...row }
      this.$refs.detailDialog.getuserInfos()

      // this.detailInfo = row
    }
  }
}
</script>

<style lang="scss">
.userWorkList{
.el-table td,.el-table th.is-leaf{
  border:none
}
}

</style>
