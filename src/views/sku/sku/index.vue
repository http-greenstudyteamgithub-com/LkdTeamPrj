<template>
  <div>
    <SearchPanel
      :label1value.sync="label1value"
      :label1="'商品搜索：'"
      @onSearch="onSearch"
    />
    <div class="myTable">
      <Operation :button-two-name="buttonTwoName" @add="add" @moreOperation="moreOperation" />
      <el-table
        :data="currentPageRecords"
        style="width: 100%;"
      >
        <el-table-column
          type="index"
          label="序号"
        />
        <el-table-column
          prop="skuName"
          label="商品名称"
        />
        <el-table-column
          prop="skuImage"
          label="商品图片"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 24px; height: 24px"
              :src="scope.row.skuImage"
            />
          </template>

        </el-table-column>
        <el-table-column
          prop="brandName"
          label="商品品牌"
        />
        <el-table-column
          prop="unit"
          label="规格"
        />
        <el-table-column
          prop="price"
          label="商品价格"
        />
        <el-table-column
          prop="skuClass.className"
          label="商品类型"
        />
        <el-table-column
          prop="createTime"
          label="创建日期"
        />
        <el-table-column
          prop="operation"
          label="操作"
          width="70"
        >
          <template slot-scope="{row}">
            <el-button style="color:#6486ff" class="btn" @click="editClass(row)">修改</el-button>
          </template>

        </el-table-column>
      </el-table>
      <!-- 新建弹窗 -->
      <AddShop
        ref="addshop"
        :dialog-visible.sync="dialogVisible"
        @confirmFn="confirmFn"
      />
      <!-- 导入数据弹窗 -->
      <upload-dig
        :dialog-visible2.sync="dialogVisible2"
        @confirmFn="confirmFn"
      />
    </div>
    <!-- 分页 -->
    <Pagination
      v-if="totalCount>shopSearchCond.pageSize"
      :current-page.sync="shopSearchCond.pageIndex"
      :total-count="totalCount"
      :page-size="shopSearchCond.pageSize"
      :total-page="totalPage"
      @getList="getShopSearchList"
    />
  </div>
</template>

<script>
import { getShopSearchListApi, newProductApi, editShopApi } from '@/api'
import Operation from '@/components/Operation'
import AddShop from './component/AddShop.vue'
import Pagination from '@/components/Pagination'
import uploadDig from './component/uploadDig.vue'
export default {
  name: 'Sku',
  components: {
    Operation, AddShop, Pagination, uploadDig
  },
  data() {
    return {
      buttonTwoName: '导入数据',
      label1value: '',
      shopSearchCond: {
        pageIndex: 1,
        pageSize: 10,
        skuName: null,
        classId: null
      },
      currentRow: {},
      totalPage: 1,
      totalCount: 0,
      dialogVisible: false,
      dialogVisible2: false,
      currentPageRecords: [] // 商品数据
    }
  },
  computed: {
    // label1value() {
    //   return this.skuId ? '修改商品' : '新增商品'
    // }
  },
  created() {
    this.getShopSearchList()
  },
  methods: {
    async getShopSearchList() {
      try {
        const { currentPageRecords, pageIndex, pageSize, totalCount, totalPage } = await getShopSearchListApi(this.shopSearchCond)
        this.currentPageRecords = currentPageRecords
        // console.log(pageIndex, pageSize, totalCount, totalPage)
        this.shopSearchCond.pageIndex = +pageIndex
        this.shopSearchCond.pageSize = +pageSize
        this.totalCount = +totalCount
        this.totalPage = +totalPage
      } catch (error) {
        console.log(error)
      }
    },
    // 搜索
    onSearch() {
      this.shopSearchCond.skuName = this.label1value
      this.getShopSearchList()
    },
    add() {
      console.log('add')
      this.dialogVisible = true
    },
    editClass(row) {
      this.currentRow = row
      this.$refs.addshop.ruleForm = row
      // console.log(this.$refs.addshop.ruleForm)
      this.dialogVisible = true
    },
    async confirmFn(addObj) {
      console.log('fff')
      try {
        if (addObj.skuName) {
          await editShopApi({ ...addObj, skuId: +this.currentRow.skuId })
        } else {
          const res = await newProductApi(addObj)
          console.log(res)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 导入数据
    moreOperation() {
      this.dialogVisible2 = true
      // console.log('导入数据')
    }

  }
}
</script>

<style>

</style>
