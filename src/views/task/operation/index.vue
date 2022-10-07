<template>
  <div>
    <!-- 搜索通栏 -->
    <SearchPanel label1="工单编号: " :label1value.sync="searchCondition.taskCode" @onSearch="onSearch" />
    <!-- 按钮 -->
    <div class="panel">
      <Operation @add="add" />
      <!-- 表单 -->
      <Table :header-columns="headerColumns" :table-data="tableData" :loading="loading ">
        <template #time>
          <el-table-column
            min-width="15%"
            :show-overflow-tooltip="true"
            label="创建日期"
          >
            <template slot-scope="{row}">
              <span style="margin-left: 10px">{{ row.createTime |dayFormateFilter() }}</span>
            </template>
          </el-table-column>
        </template>
        <template #operation>
          <el-table-column
            min-width="10%"
            show-overflow-tooltip
            label="操作"
          >
            <template slot-scope="{row}">
              <el-button style="color:#6486ff" class="btn" @click="getDetail(row)">查看详情</el-button>
            </template>
          </el-table-column>
        </template>
        <template #createType>
          <el-table-column
            min-width="10%"
            show-overflow-tooltip
            label="工单方式"
          >
            <template slot-scope="{row}">
              <span style="margin-left: 10px">{{ row.createType===0?'自动':'手动' }}</span>
            </template>
          </el-table-column>
        </template>
      </Table>
    </div>
    <!-- 分页组件 -->
    <Pagination v-if="totalCount>searchCondition.pageSize" :total-count="totalCount" :total-page="totalPage" :current-page.sync="searchCondition.pageIndex" :page-size="pageSize" @getList="taskSearchResult" />
    <!-- 新增工单弹出框 -->
    <AddDialog :show-add-dialog.sync="showAddDialog" @getList="taskSearchResult" />
    <!-- 查看详情弹出窗 -->
    <TaskDetailDialog ref="detailDialog" :show-dialog.sync="showTaskDetailDialog" :detail-info="detailInfo" @initTaskResult="initTaskResult" />
  </div>
</template>

<script>
import AddDialog from '@/views/task/components/addTaskDialog.vue'
import TaskDetailDialog from '@/views/task/components/taskDetailDialog.vue'
import { taskSearchResult } from '@/api'
export default {
  name: 'TaskOperation',
  components: {
    AddDialog,
    TaskDetailDialog
  },
  data() {
    return {
      headerColumns: [
        // 序号
        {
          index: true,
          label: '序号'
        },
        {
          label: '工单编号',
          prop: 'taskCode',
          minWidth: '10%'
        },
        {
          label: '设备编号',
          prop: 'innerCode',
          minWidth: '10%'
        },
        {
          label: '工单类型',
          prop: 'taskType.typeName',
          minWidth: '10%'
        },
        {
          slot: 'createType'// 工单方式
        },
        {
          label: '工单状态',
          prop: 'taskStatusTypeEntity.statusName',
          minWidth: '10%'
        },
        {
          label: '运维人员',
          prop: 'userName',
          minWidth: '10%'
        },
        {
          slot: 'time'// 创建日期
        },
        {
          slot: 'operation'// 操作插槽
        }

      ], // 表头
      tableData: [], // 表格数据
      loading: false, // 表格加载状态
      searchCondition: {
        pageIndex: 1,
        pageSize: 10,
        isRepair: true,
        taskCode: '', // 工单编号
        status: ''// 1:待办;2:进行;3:取消;4:完成	工单状态
      },
      totalCount: 0, // 总数量
      totalPage: 0, // 总页数
      pageSize: 0,
      showAddDialog: false, // 新增工单弹出窗
      showTaskDetailDialog: false, // 查看详情弹出窗
      detailInfo: {}
    }
  },
  created() {
    this.taskSearchResult()
  },
  methods: {
    // 获得运维工单列表
    async taskSearchResult() {
      try {
        this.loading = true
        const res = await taskSearchResult(this.searchCondition)
        this.tableData = res.currentPageRecords
        this.totalCount = +res.totalCount
        this.totalPage = +res.totalPage
        this.pageSize = +res.pageSize
        // console.log(res)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 点击搜索
    onSearch() {
      this.searchCondition.pageIndex = 1
      this.taskSearchResult()
    },
    // 新建按钮
    add() {
      console.log(1)
      this.showAddDialog = true
    },
    // 查看详情
    getDetail(row) {
      // console.log(row)
      this.detailInfo = row
      console.log(this.detailInfo)
      this.showTaskDetailDialog = true
    },
    // 重置参数 重新获取
    initTaskResult() {
      console.log('重置参数 重新获取页面1')
      this.searchCondition = {
        pageIndex: 1,
        pageSize: 10,
        isRepair: true,
        taskCode: '',
        status: ''
      }
      this.taskSearchResult()
      console.log('重置参数 重新获取页面2')
    }
  }
}
</script>

<style>

</style>
