<template>
  <div>
    <!-- 查询按钮 -->
    <el-button size="medium " type="text" style="color:#5f84ff" @click="inquireFn">查询详情</el-button>
    <!-- 弹出框 -->
    <el-dialog title="策略详情" :visible.sync="dialogFormVisible">
      <el-form>
        <!-- 第一个框 -->
        <el-form-item label="策略名称 :" :label-width="formLabelWidth">九折优惠</el-form-item>
        <!-- 第二个框 -->
        <el-form-item label="策略方案 :" :label-width="formLabelWidth">
          <el-table
            :data="gridData"
            style="width: 100%;padding: 0;"
            :header-cell-style="headerCellStyle"
          >
            <el-table-column
              prop="policyId"
              label="序号"
              width="80"
              type="index"
            />
            <el-table-column
              prop="nodeName"
              label="点位名称"
              width="158"
            />
            <el-table-column
              prop="innerCode"
              label="设备编号"
              width="158"
            />

          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-pagination
          :current-page="pageIndex"
          :page-size="pageSize"
          layout="slot, prev,next"
          prev-text="上一页"
          next-text="下一页"
          :total="totalCount"
          @current-change="changeFn"
        >
          <span class="totalPage">共{{ totalCount }}条记录 第{{ pageIndex }}/{{ totalPage }}页</span>
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getVmPolicyAPI } from '@/api'
export default {
  name: 'Details',
  data() {
    return {
      // 总页数
      totalPage: 0,
      // 总内容/条
      totalCount: 0,
      // 当前页
      pageIndex: 1,
      // 当前页的内容
      pageSize: 10,
      // 渲染的列表内容
      gridData: [{
        policyId: '',
        nodeName: '',
        innerCode: ''
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    async inquireFn() {
      this.dialogFormVisible = true
      try {
        const { currentPageRecords, totalPage, totalCount, pageIndex, pageSize } = await getVmPolicyAPI(this.pageIndex, this.pageSize)
        console.log(currentPageRecords)
        this.gridData = currentPageRecords
        this.totalPage = +totalPage
        this.totalCount = +totalCount
        this.pageIndex = +pageIndex
        this.pageSize = +pageSize
      } catch (error) {
        console.log(error)
      }
    },
    headerCellStyle() {
      return 'background-color:#f3f6fb;font-weight:400;'
    },
    changeFn() {
    }

  }
}
</script>

<style style lang="scss">
.totalPage{
  flex: 1;
  font-size: 16px!important;
  color: #dbdfe5!important;
  margin-left: 10px;
  font-weight: 400;
}

</style>
