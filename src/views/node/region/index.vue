<template>
  <div>
    <!-- 搜索通栏 -->
    <SearchPanel label1="区域搜索: " :label1value.sync="searchContent" @onSearch="searchRegion" />
    <!-- 按钮 -->
    <div class="panel">
      <Operation @add="addRegion" />
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
            <el-button class="editbtn" type="text" size="small" @click="editRegion(row)">修改</el-button>
            <el-button class="delbtn" type="text" size="small" @click="delRegion(row.id)">删除</el-button>

          </template>

        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination v-if="totalCount>searchCondition.pageSize" :current-page.sync="searchCondition.pageIndex" :total-count="totalCount" :page-size="searchCondition.pageSize" :total-page="totalPage" @getList="getAllRegion" />
      <!-- 弹出窗 -->
      <RoginDetailDialog ref="add" :show-add-dialog.sync="showAddDialog" />

    </div>
    <!-- 查看详情 -->

    <el-dialog class="checkdialog" title="区域详情" :visible.sync="dialogFormVisible" width="42%">
      <el-form>
        <el-form-item label="区域名称：" label-width="100px">
          <span>{{ content }}</span>

        </el-form-item>
        <el-form-item label="包含点位：" label-width="100px">
          <el-table :data="RegionList" :header-cell-style="{background:'#f5f7fa',color:'#737674',fontWeight:400}" style="width: 96%">
            <el-table-column
              type="index"
              label="序号"
            />
            <el-table-column
              prop="name"
              label="点位名称"
              min-width="40%"
            />
            <el-table-column
              prop="vmCount"
              label="设备数量"
              min-width="40%"
            />
          </el-table>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getRegion, getNode, delRegion } from '@/api'
import RoginDetailDialog from '@/views/node/components/RoginDetailDialog'
export default {
  name: 'NodeRegion',
  components: {
    RoginDetailDialog
  },
  data() {
    return {
      content: '',
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
      AllRegionList: [],
      showAddDialog: false,
      loading: false,
      dialogFormVisible: false,
      RegionList: [],
      searchContent: ''

    }
  },
  created() {
    this.getAllRegion()
  },
  methods: {
    // 获取所有区域列表
    async getAllRegion() {
      try {
        this.loading = true
        const res = await getRegion(this.searchCondition)
        this.AllRegionList = res.currentPageRecords
        this.totalCount = +res.totalCount
        this.totalPage = +res.totalPage

        // console.log(res)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 查看详情
    async  getDetail(row) {
      try {
        this.dialogFormVisible = true
        const res = this.searchCondition
        res.regionId = row.id
        const data = await getNode(res)
        this.RegionList = data.currentPageRecords
        this.content = row.name
        // console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        this.searchCondition = {
          pageIndex: 1,
          pageSize: 10,
          name: '', // 点位搜索词——点位名称
          regionId: ''// 区域搜索——区域id
        }
      }

      // console.log(row.id)
    },
    addRegion() {
      this.showAddDialog = true
    },
    searchRegion() {
      this.searchCondition.name = this.searchContent
      this.getAllRegion()
      // console.log(this.searchContent)
    },
    editRegion(row) {
      this.showAddDialog = true
      this.$refs.add.form = row
      console.log(row)
    },
    async delRegion(id) {
      await delRegion(id)
      this.getAllRegion()
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
.checkdialog{
  .el-table__header{

line-height: 40px;
  }

}
</style>
