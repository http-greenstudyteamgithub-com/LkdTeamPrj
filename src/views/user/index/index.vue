<template>
  <div class="userList">
    <search-panel label1="人员搜索" :label1value.sync="page.userName" @onSearch="onSearch" />
    <div class="panel">
      <Operation @add="add" />

      <!-- 表格 -->
      <Table
        :header-cell-style="headerCellStyle"
        :stripe="false"
        :table-data="tableData"
        :header-columns="headerColumns"
        :loading="loading"
      >
        <template slot="operation">
          <el-table-column
            label="操作"
          >
            <template slot-scope="{row}">
              <span class="edit" @click="edit(row)">修改</span>&nbsp;&nbsp;
              <span class="delete" @click="$message.warning('系统操作，不能删除')">删除</span>
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
        @getList="getUserlist"
      />
    </div>
    <addRole
      ref="addRole"
      :is-show-dialog.sync="isShowDialog
      "
    />
  </div>
</template>

<script>
import { getuserlist } from '@/api'
import SearchPanel from '@/components/SearchPanel'
import Operation from '@/components/Operation'
import Table from '@/components/Table'
import addRole from './components/addRole.vue'

export default {
  name: 'UserIndex',
  components: {
    SearchPanel,
    Operation,
    Table,
    addRole
  },
  data() {
    return {
      totalCount: 0,
      totalPage: 0,
      headerCellStyle: { background: '#f5f7fa', color: '#737674', fontWeight: 400 },
      tableData: [],
      loading: false,
      isShowDialog: false, // 新增弹窗显示
      headerColumns: [
        {
          index: true,
          label: '序号'
        },
        {
          label: '人员名称',
          prop: 'userName',
          minWidth: '100%'
        },
        {
          label: '归属区域',
          prop: 'regionName',
          minWidth: '100%'
        },
        {
          label: '角色',
          prop: 'role.roleName',
          minWidth: '100%'
        },
        {
          label: '联系电话',
          prop: 'mobile',
          minWidth: '100%'
        },
        {
          // minWidth: '10%',
          slot: 'operation'// 操作插槽 具名插槽
        }

      ],
      page: {
        pageIndex: 1,
        pageSize: 10,
        userName: ''
      }
    }
  },
  created() {
    this.getUserlist()
  },
  methods: {
    async  getUserlist() {
      try {
        this.loading = true
        const data = await getuserlist(this.page)
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
    edit(row) {
      this.isShowDialog = true
      this.$refs.addRole.form = { ...row }
      console.log(row)
    },
    initUserResult() { // 新建时初始化数据
      this.page = {
        pageIndex: 1,
        pageSize: 10,
        userName: ''
      }
      this.getUserlist()
    },
    add() {
      this.isShowDialog = true
    },
    onSearch() {
      this.page.pageIndex = 1
      this.getUserlist(this.page)
    }
  }
}
</script>

<style lang="scss">
.userList{
.el-table td,.el-table th.is-leaf{
  border:none
}
.edit{
  color: #5373e0;
  margin-right: 10px;
}
.delete{
  color: red;

}
}

</style>
