<template>
  <div>
    <!-- 搜索通栏 -->
    <SearchPanel label1="区域搜索: " :label1value.sync="searchCondition.name" />
    <!-- 按钮 -->
    <div class="panel">
      <Operation @add="add" />
      <!-- 表格-->
      <el-table
        v-loading="loading"
        :header-cell-style="{background:'#f5f7fa',color:'#737674',fontWeight:400}"
        :data="AllNodeList"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          min-width="10%"
        />
        <el-table-column
          prop="name"
          label="点位名称"
          min-width="28%"
        />
        <el-table-column
          prop="nodeCount"
          label="所在区域"
          min-width="28%"
        >
          <!-- <template slot-scope="{row}">
            <span style="margin-left: 10px">{{ row.taskType.typeName }}</span>
          </template> -->
        </el-table-column>
        <el-table-column
          prop="remark"
          label="商圈类型"
          min-width="26%"
        />
        <el-table-column
          prop="ownerName"
          label="合作商"
          min-width="25%"
        /><el-table-column
          prop="remark"
          label="详细地址"
          min-width="25%"
        />
        <el-table-column
          label="操作"
          min-width="30%"
        >
          <template slot-scope="{row}">
            <el-button class="btn" @click="getDetail(row)">查看详情</el-button>
            <el-button class="editbtn" type="text" size="small">修改</el-button>
            <el-button class="delbtn" type="text" size="small">删除</el-button>

          </template>

        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination v-if="totalCount>searchCondition.pageSize" :current-page.sync="searchCondition.pageIndex" :total-count="totalCount" :page-size="searchCondition.pageSize" :total-page="totalPage" @getList="getAllNode" />
      <!-- 查看详情弹出窗 -->
      <!-- <NodeDetailDialog :show-add-dialog.sync="showAddDialog" /> -->
    </div>
  </div>
</template>

<script>
import { getNode } from '@/api'
// import NodeDetailDialog from '@/views/node/components/NodeDetailDialog'
export default {
  name: 'NodeRegion',
  components: {

  },
  data() {
    return {
      label1: '点位搜索',
      label2: '区域搜索',
      tableData: [], // 表格数据
      headerColumns: [
      ], // 表头
      totalCount: 0, // 总数量
      totalPage: 0, // 总页数
      searchCondition: {
        pageIndex: 1,
        pageSize: 10,
        name: '', // 点位搜索词——点位名称
        regionId: ''// 区域搜索——区域id
      },
      AllNodeList: [],
      showAddDialog: false,
      loading: false

    }
  },
  created() {
    this.getAllNode()
  },
  methods: {
    // 获取所有区域列表
    async getAllNode() {
      try {
        this.loading = true
        const res = await getNode(this.searchCondition)
        this.AllNodeList = res.currentPageRecords
        this.totalCount = +res.totalCount
        this.totalPage = +res.totalPage

        // console.log(res)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    add() {
      this.showAddDialog = true
    }
  }

}
</script>

<style scoped lang="scss">
.btn,.editbtn{
  color:#6486ff ;
  margin-left: -8px;
}
.delbtn{
  color:#ff5a5a ;
}
.delbtn,.editbtn{
  font-size: 14px;
}
</style>
