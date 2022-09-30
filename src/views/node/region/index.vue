<template>
  <div>
    <!-- 搜索通栏 -->
    <SearchPanel label1="区域搜索: " :label1value.sync="searchCondition.taskCode" />
    <!-- 按钮 -->
    <div class="panel">
      <Operation @add="add" />
      <!-- 表格-->
      <el-table
        v-loading="loading"
        :header-cell-style="{background:'#f5f7fa',color:'#737674',fontWeight:400}"
        :data="AllRegionList"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          min-width="10%"
        />
        <el-table-column
          prop="name"
          label="区域名称"
          min-width="30%"
        />
        <el-table-column
          prop="nodeCount"
          label="点位数"
          min-width="30%"
        >
          <!-- <template slot-scope="{row}">
            <span style="margin-left: 10px">{{ row.taskType.typeName }}</span>
          </template> -->
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注说明"
          min-width="30%"
        />
        <el-table-column
          label="操作"
          min-width="20%"
        >
          <template slot-scope="{row}">
            <el-button style="color:#6486ff" class="btn" @click="getDetail(row)">查看详情</el-button>
            <el-button class="editbtn" type="text" size="small">修改</el-button>
            <el-button class="delbtn" type="text" size="small">删除</el-button>

          </template>

        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination v-if="totalCount>searchCondition.pageSize" :current-page.sync="searchCondition.pageIndex" :total-count="totalCount" :page-size="searchCondition.pageSize" :total-page="totalPage" @getList="getAllRegion" />
      <!-- 查看详情弹出窗 -->
      <NodeDetailDialog />
    </div>
  </div>
</template>

<script>
import { getRegion } from '@/api'
import NodeDetailDialog from '@/views/node/components/NodeDetailDialog'
export default {
  name: 'NodeRegion',
  components: {
    NodeDetailDialog
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
      AllRegionList: []

    }
  },
  created() {
    this.getAllRegion()
  },
  methods: {
    // 获取所有区域列表
    async getAllRegion() {
      try {
        const res = await getRegion(this.searchCondition)
        this.AllRegionList = res.currentPageRecords
        this.totalCount = +res.totalCount
        this.totalPage = +res.totalPage

        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    // 查看详情
    getDetail() {
    }
  }

}
</script>

<style scoped lang="scss">
.editbtn{
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
