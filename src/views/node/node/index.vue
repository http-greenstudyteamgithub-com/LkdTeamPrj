<template>
  <div>
    <!-- 搜索通栏 -->
    <SearchPanel label1="点位搜索: " :label1value.sync="searchContent" :label2value.sync="searchContents" label2="区域搜索:" @onSearch="searchNode">
      <template v-slot:searchPanelSlot>
        <el-select v-model="searchContents" placeholder="请输入" clearable>
          <el-option v-for="(item,index) of AllNodeList" :key="index" :label="item.region.name" :value="item.region.id" />
        </el-select>
      </template>
    </SearchPanel>
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
          prop="region.name"
          label="所在区域"
          min-width="28%"
        />
        <el-table-column
          prop="businessType.name"
          label="商圈类型"
          min-width="26%"
        />
        <el-table-column
          prop="ownerName"
          label="合作商"
          min-width="25%"
        /><el-table-column

          prop="addr"
          label="详细地址"
          min-width="25%"
        />
        <el-table-column
          label="操作"
          min-width="30%"
        >
          <template slot-scope="{row}">
            <el-button class="btn" @click="getDetail(row)">查看详情</el-button>
            <el-button class="editbtn" type="text" size="small" @click="editNode(row)">修改</el-button>
            <el-button class="delbtn" type="text" size="small" @click="delNode(row)">删除</el-button>

          </template>

        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination v-if="totalCount>searchCondition.pageSize" :current-page.sync="searchCondition.pageIndex" :total-count="totalCount" :page-size="searchCondition.pageSize" :total-page="totalPage" @getList="getAllNode" />
      <!-- 弹出窗 -->
      <NodeDatailDialog ref="edit" :allnodelist="AllNodeList" :show-add-dialog.sync="showAddDialog" />
    </div>
    <!-- 查看详情 -->

    <el-dialog class="checkdialog" title="点位详情" :visible.sync="dialogFormVisible" width="42%">

      <el-table :data="NodeStausList" :header-cell-style="{background:'#f5f7fa',color:'#737674',fontWeight:400}" style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
        />
        <el-table-column
          prop="innerCode"
          label="机器编号"
          min-width="40%"
        />
        <el-table-column
          prop="vmStatus"
          label="设备状态"
          min-width="40%"
        >
          <template slot-scope="{row}">
            <span>{{ row.vmStatus === 0?'未投放':'运营' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastSupplyTime"
          label="最后一次供货时间"
          min-width="40%"
        />
      </el-table>

    </el-dialog>
  </div>
</template>

<script>
import { getNode, getNodeStatus, delNode } from '@/api'
import NodeDatailDialog from '@/views/node/components/NodeDatailDialog'
import { CodeToText, TextToCode } from 'element-china-area-data'
export default {
  name: 'NodeRegion',
  components: {
    NodeDatailDialog
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
      loading: false,
      dialogFormVisible: false,
      NodeStausList: {},
      searchContent: '',
      searchContents: ''
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

        // console.log(this.AllNodeList)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    add() {
      this.showAddDialog = true
    },
    async  getDetail(row) {
      try {
        this.dialogFormVisible = true
        this.NodeStausList = await getNodeStatus(row.id)
        // console.log(this.NodeStausList)
      } catch (error) {
        console.log(error)
      }
    },
    editNode(row) {
      this.showAddDialog = true
      this.$refs.edit.form = { name: row.name,
        regionId: row.region.id,
        businessId: row.businessId,
        ownerId: row.ownerId
        // addr: row.areaCode,
        // str: ''
      }
      console.log(CodeToText[row.areaCode])
    },
    async delNode(row) {
      try {
        // console.log(row)
        await delNode(row.name, row.id)
        this.getAllNode()
      } catch (error) {
        console.log(error)
      }
    },
    searchNode() {
      this.searchCondition.name = this.searchContent
      this.searchCondition.regionId = this.searchContents

      this.getAllNode()
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
