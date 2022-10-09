<template>
  <div>
    <div class="search">
      <el-form :inline="true" class="form-inline">
        <el-form-item label="型号搜索:">
          <el-input
            v-model.trim="data.name"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" class="searchBtn" size="small" @click="Search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="background-color: #fff; padding: 20px;">
      <div class="operation">
        <el-button
          class="btn"
          icon="el-icon-circle-plus-outline"
          @click="add"
        >新建</el-button>
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
          prop="name"
          label="型号名称"
          min-width="10%"
        />
        <el-table-column
          prop="model"
          label="型号编码"
          min-width="10%"
        />
        <el-table-column
          label="设备图片"
          min-width="10%"
        >
          <template slot-scope="{row}">
            <el-image
              style="width: 25px; height: 25px ; border-radius: 50%;"
              :src="row.image"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="vmRow"
          label="货道行"
          min-width="10%"
        />
        <el-table-column
          prop="vmCol"
          label="货道列"
          min-width="10%"
        />
        <el-table-column
          prop="channelMaxCapacity"
          label="设备容量"
          min-width="10%"
        />
        <el-table-column
          label="操作"
          min-width="10%"
        >
          <!-- <template slot-scope="res"></template> -->
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="modifyVm(row)">修改</el-button>
            <el-button type="text" size="small" style="color: red;" @click="delVm(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <Pagination v-if="page.totalCount>data.pageSize" :current-page.sync="data.pageIndex" :total-count="page.totalCount" :page-size="data.pageSize" :total-page="page.totalPage" @getList="taskSearchResult" />
    <!-- 新建弹窗 -->
    <AddVmDialog ref="addDialog" :dialog-form-visible.sync="dialogFormVisible" @refreshList="Search" />
  </div>
</template>

<script>
import { getTypeAPI, delVmType } from '@/api/index.js'
import AddVmDialog from './components/addVmDialog.vue'
export default {
  name: 'Type',
  components: {
    AddVmDialog
  },
  data() {
    return {
      value: '',
      formInline: {
        user: '',
        region: ''
      },
      data: {
        pageIndex: 1,
        pageSize: 10,
        name: ''
      },
      list: [],
      page: {
        pageIndex: 0,
        totalCount: 0,
        totalPage: 0
      },
      dialogFormVisible: false// 展示新建弹窗
    }
  },
  created() {
    this.getType()
  },
  methods: {
    async getType() {
      const res = await getTypeAPI(this.data)
      this.list = res.currentPageRecords
      this.page.pageIndex = +res.pageIndex
      this.page.totalCount = +res.totalCount
      this.page.totalPage = +res.totalPage
    },
    taskSearchResult() {
      this.getType()
    },
    Search() {
      this.data.pageIndex = 1
      this.getType()
    },
    add() {
      this.dialogFormVisible = true
    },
    modifyVm(row) {
      this.$refs.addDialog.form = { ...row }
      this.dialogFormVisible = true
      console.log(row)
    },
    async delVm(row) {
      this.$confirm('是否确认删除', '提示', {
        type: 'warning'
      }).then(async() => {
        try {
          await delVmType(row.typeId)
          this.Search()
          this.$message.success('删除成功')
        } catch (error) {
          if (error.response) {
            this.$message.error(error.response.data)
          }
        }
      }).catch(() => {
      })
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
  .operation{
    display: flex;
    margin-bottom: 20px;
  }
  .btn {
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    border: none;
  }
</style>
