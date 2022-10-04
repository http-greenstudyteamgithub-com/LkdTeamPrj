<template>
  <div>
    <SearchPanel
      :label1value.sync="label1value"
      :label1="'商品类型搜索：'"
      @onSearch="onSearch"
    />
    <div class="myTable">
      <Operation @add="add" />
      <el-table
        :data="tableData"
        style="width: 100%;"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          prop="className"
          width="950"
          label="商品类型名称"
        />
        <el-table-column
          prop="operation"
          label="操作"
          width="150"
        >
          <template slot-scope="{row}">
            <el-button style="color:#6486ff" class="btn" @click="editClass(row)">修改</el-button>
            <el-button style="color:#ff5a5a" class="btn" @click="deltClass(row)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
      <!-- 新建弹窗 -->
      <addClassDig :dialog-visible.sync="dialogVisible" @confirmFn="confirmFn" />
    </div>
    <!-- 分页 -->
    <Pagination
      v-if="totalCount>searchCondition.pageSize"
      :current-page.sync="searchCondition.pageIndex"
      :total-count="totalCount"
      :page-size="searchCondition.pageSize"
      :total-page="totalPage"
      @getList="skuClassSearch"
    />
  </div>
</template>

<script>
import SearchPanel from '@/components/SearchPanel'
import Operation from '@/components/Operation'
import addClassDig from './compoent/addClassDig.vue'
import { skuClassSearchApi, newProductClassApi, deltClassApi, editClassApi } from '@/api'
import Pagination from '@/components/Pagination'
export default {
  name: 'SkuClass',
  components: {
    SearchPanel, Operation, addClassDig, Pagination
  },
  data() {
    return {
      // label1value: '',
      currentPageRecords: [],
      dialogVisible: false,
      searchCondition: {
        pageIndex: 1,
        pageSize: 10
      },
      totalPage: 1,
      totalCount: 1,
      className: '',
      classId: ''
    }
  },
  computed: {
    tableData() {
      return this.currentPageRecords
    },
    label1value() {
      return this.classId ? '修改商品类型' : '新增商品类型'
    }
  },
  created() {
    this.skuClassSearch()
  },
  methods: {
    async skuClassSearch(className) {
      const searchObj = {
        ...this.searchCondition,
        className: className || null
      }
      this.className = className
      try {
        const { currentPageRecords, pageIndex, pageSize, totalPage, totalCount } = await skuClassSearchApi(searchObj)
        // console.log(res)
        this.currentPageRecords = currentPageRecords
        this.searchCondition.pageIndex = +pageIndex
        this.searchCondition.pageSize = +pageSize
        this.totalPage = +totalPage
        this.totalCount = +totalCount
      } catch (error) {
        console.log(error)
      }
    },
    onSearch() {
      // 查询请求
      this.skuClassSearch(this.label1value)
      console.log(this.label1value)
    },
    // 添加新类别新建btn
    add() {
      this.dialogVisible = true
      console.log(11)
    },
    // 修改
    async editClass(row) {
      // 拿到当前点击的row数据
      this.dialogVisible = true // 弹出层
      this.className = row.className
      this.classId = row.classId
      // try {
      //   await editClassApi(row.classId, this.className)
      // } catch (error) {
      //   console.log(error)
      // }
    },
    async confirmFn(className) {
      // console.log(333)
      try {
        if (this.classId) {
          // 有id 修改
          await editClassApi(this.classId, className)
        } else {
          await newProductClassApi(className)
        }
        this.skuClassSearch()
      } catch (error) {
        console.log(error)
      }
      console.log(111)
    },
    // 删除
    async deltClass(row) {
      try {
        await deltClassApi(row.classId)
        this.skuClassSearch() // 获取最新列表
      } catch (error) {
        console.log(error)
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.el-table has-gutter {
    color: #666;
    font-weight: 500;
    background-color: #f3f6fb;
}
.el-button{
  padding: 0;
}
::v-deep .el-table td, .el-table th.is-leaf {
    border-bottom: 0px solid #EBEEF5!important;
}
::v-deep .el-table th, .el-table tr {
    background-color: rgb(243, 246, 251);
}
</style>
