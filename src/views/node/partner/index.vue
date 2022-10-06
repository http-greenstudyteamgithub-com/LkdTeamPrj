<template>
  <div>
    <!-- 搜索通栏 -->
    <SearchPanel label1="合作商搜索: " :label1value.sync="searchCondition.name" />
    <!-- 按钮 -->
    <div class="panel">
      <Operation @add="add" />
      <!-- 表格-->
      <el-table
        v-loading="loading"
        :header-cell-style="{background:'#f5f7fa',color:'#737674',fontWeight:400}"
        :data="AllPartnerList"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          min-width="20%"
        />
        <el-table-column
          prop="name"
          label="合作商名称"
          min-width="10%"
        />
        <el-table-column
          prop="account"
          label="账号"
          min-width="8%"
        >
          <!-- <template slot-scope="{row}">
            <span style="margin-left: 10px">{{ row.taskType.typeName }}</span>
          </template> -->
        </el-table-column>
        <el-table-column
          prop="vmCount"
          label="设备数量"
          min-width="8%"
        />
        <el-table-column
          prop="ratio"
          label="分成比例"
          min-width="8%"
        />
        <el-table-column
          prop="contact"
          label="联系人"
          min-width="8%"
        />
        <el-table-column
          prop="mobile"
          label="联系电话"
          min-width="10%"
        />
        <el-table-column
          label="操作"
          min-width="12%"
        >
          <template slot-scope="{row}">
            <el-button class="changepwd" type="text" size="small">重置密码</el-button>
            <el-button class="btn" @click="getDetail(row)">查看详情</el-button>
            <el-button class="editbtn" type="text" size="small">修改</el-button>
            <el-button class="delbtn" type="text" size="small">删除</el-button>

          </template>

        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination v-if="totalCount>searchCondition.pageSize" :current-page.sync="searchCondition.pageIndex" :total-count="totalCount" :page-size="searchCondition.pageSize" :total-page="totalPage" @getList="getAllRegion" />
      <!-- 弹出窗 -->
      <PartnerDatailDialog :show-add-dialog.sync="showAddDialog" />
    </div>
  </div>
</template>

<script>
import { getPartner } from '@/api'
import PartnerDatailDialog from '@/views/node/components/PartnerDatailDialog'
export default {
  name: 'NodeRegion',
  components: {
    PartnerDatailDialog
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
      AllPartnerList: [],
      showAddDialog: false,
      loading: false

    }
  },
  created() {
    this.getPartnerRegion()
  },
  methods: {
    // 获取所有合作商列表
    async getPartnerRegion() {
      try {
        this.loading = true
        const res = await getPartner(this.searchCondition)
        this.AllPartnerList = res.currentPageRecords
        this.totalCount = +res.totalCount
        this.totalPage = +res.totalPage

        console.log(this.AllPartnerList)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 查看详情
    getDetail() {
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
.changepwd{
  font-size: 14px;
  color:#6486ff ;
  margin-left: -5px;
}
</style>
