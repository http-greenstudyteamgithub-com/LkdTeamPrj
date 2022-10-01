<template>
  <div>
    <SearchPanel label1="工单编号: " label2="工单状态: " :label1value.sync="searchCondition.taskCode" @onSearch="onSearch">
      <template v-slot:searchPanelSlot>
        <el-select v-model="searchCondition.status" placeholder="请输入" clearable>
          <el-option v-for="(item,index) of allTaskStatusList" :key="index" :label="item.statusName" :value="item.statusId" />
        </el-select>
      </template>
    </SearchPanel>
    <div class="panel">
      <!--  按钮-->
      <Operation button-two-name="工单配置" @add="add" @moreOperation="workOrderSet" />
      <!-- 表格-->
      <el-table
        v-loading="loading"
        :header-cell-style="{background:'#f5f7fa',color:'#737674',fontWeight:400}"
        :data="taskList"
        style="width: 100%"
      >
        <el-table-column
          type="index"
        />
        <el-table-column
          prop="taskCode"
          label="工单编号"
          min-width="10%"
        />
        <el-table-column
          prop="innerCode"
          label="设备编号"
          min-width="10%"
        />
        <el-table-column
          prop="taskType.typeName"
          label="工单类型"
          min-width="10%"
        >
          <!-- <template slot-scope="{row}">
            <span style="margin-left: 10px">{{ row.taskType.typeName }}</span>
          </template> -->
        </el-table-column>
        <el-table-column
          label="工单方式"
          min-width="10%"
        >
          <template slot-scope="{row}">
            <span style="margin-left: 10px">{{ row.createType===0?'自动':'手动' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="taskStatus"
          label="工单状态"
          min-width="10%"
        ><template slot-scope="{row}">
          <span style="margin-left: 10px">{{ row.taskStatusTypeEntity.statusName }}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="运营人员"
          min-width="10%"
        />
        <el-table-column
          label="创建日期"
          min-width="15%"
        >
          <template slot-scope="{row}">
            <span style="margin-left: 10px">{{ row.createTime |dayFormateFilter() }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="10%"
        >
          <template slot-scope="{row}">
            <el-button style="color:#6486ff" class="btn" @click="getDetail(row)">查看详情</el-button>
          </template>

        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination v-if="totalCount>searchCondition.pageSize" :current-page.sync="searchCondition.pageIndex" :total-count="totalCount" :page-size="searchCondition.pageSize" :total-page="totalPage" @getList="taskSearchResult" />
    </div>
    <!-- 新增工单弹出框 -->
    <AddDialog :show-add-dialog.sync="showAddDialog" @initTaskList="initTaskResult" />
    <!-- 工单配置弹出窗 -->
    <TaskSetDialog :show-set-dialog.sync="showSetDialog" />
    <!-- 查看详情弹出窗 -->
    <TaskDetailDialog ref="detailDialog" :show-dialog.sync="showTaskDetailDialog" :detail-info="detailInfo" @initTaskResult="initTaskResult" />
  </div>
</template>

<script>
import { taskSearchResult, getAllTaskStatus } from '@/api'
import TaskSetDialog from '@/views/task/components/taskSetDialog.vue'
import AddDialog from '@/views/task/components/addTaskDialog.vue'
import TaskDetailDialog from '@/views/task/components/taskDetailDialog.vue'
export default {
  name: 'TaskBusiness',
  components: {
    AddDialog,
    TaskSetDialog,
    TaskDetailDialog
  },
  data() {
    return {
      searchCondition: {
        pageIndex: 1,
        pageSize: 10,
        isRepair: false,
        taskCode: '', // 工单编号
        status: ''// 1:待办;2:进行;3:取消;4:完成	工单状态
      },
      taskList: [],
      totalCount: 0,
      totalPage: 0,
      loading: false,
      allTaskStatusList: [], // 获取所有的工单状态
      showAddDialog: false,
      showSetDialog: false, // 工单配置弹出窗
      showTaskDetailDialog: false, // 查看详情弹出窗
      detailInfo: {}
    }
  },
  created() {
    this.taskSearchResult()
    this.getAllTaskStatus()
  },
  methods: {
    // 获得工单列表
    async  taskSearchResult() {
      try {
        this.loading = true
        const res = await taskSearchResult(this.searchCondition)
        console.log(res)
        this.totalCount = +res.totalCount
        this.totalPage = +res.totalPage
        this.taskList = res.currentPageRecords
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 重置参数 重新获取
    initTaskResult() {
      this.searchCondition = {
        pageIndex: 1,
        pageSize: 10,
        isRepair: false,
        taskCode: '',
        status: ''
      }
      this.taskSearchResult()
    },
    // 获得工单状态列表
    async getAllTaskStatus() {
      this.allTaskStatusList = await getAllTaskStatus()
    },
    // 新建按钮
    add() {
      this.showAddDialog = true
    },
    // 工单配置
    workOrderSet() {
      this.showSetDialog = true
    },
    // 查看详情
    getDetail(row) {
      // console.log(row)
      this.detailInfo = row
      console.log(this.detailInfo)
      this.showTaskDetailDialog = true
    },
    // 点击查询
    onSearch() {
      this.searchCondition.pageIndex = 1
      this.taskSearchResult()
    }

  }
}
</script>

<style scoped lang="scss">
.panel{
  padding: 20px 15px 19px 17px;
  background-color: #fff;
}
</style>
