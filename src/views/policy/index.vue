<template>
  <div>
    <!-- 搜索组件模块 S -->
    <div style="margin-bottom:20px">
      <el-card shadow="never">
        <span style="font-size:15px">策略搜索：</span>
        <el-input
          v-model="input"
          class="input-box"
          placeholder="请输入"
          :clearable="true"
          style="width:200px;margin-right: 8px;height: 36px;line-height: 36px; "
        />
        <el-button type="primary" style="background-color:#5373e0" class="el-icon-search">  查询</el-button>
      </el-card>
    </div>
    <!-- 搜索组件模块 M -->
    <!-- 表单模块 S -->
    <el-card shadow="never">
      <!-- 新建 按钮 -->
      <addBtn />
      <el-table
        :data="tableData"
        style="width: 100%;margin-top: 45px;"
        :header-cell-style="headerCellStyle"
      >
        <el-table-column
          prop="policyId"
          label="序号"
          width="100"
          type="index"
        />
        <el-table-column
          prop="policyName"
          label="策略名称"
          width="460"
        />
        <el-table-column
          prop="discount"
          label="策略方案"
          width="460"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
        />
        <el-table-column
          prop="handle"
          label="操作 "
        >
          <template>
            <!-- 查询详情按钮 -->
            <div class="btn-content">
              <Details />
              <el-button size="medium " type="text" style="color:#86b42b">修改</el-button>
              <el-button size="medium " type="text" style="color:#ff5a5a">删除</el-button>
            </div>
          </template>
        </el-table-column>

      </el-table>
    </el-card>
    <!-- 表单模块 M -->

  </div>
</template>

<script>
import addBtn from './components/addBtn'
import Details from './components/Details'
import { getTacticsListAPI, getVmPolicyAPI } from '@/api'
export default {
  name: 'Policy',
  components: { addBtn, Details },
  data() {
    return {
      dialogVisible: false,
      pageIndex: 1,
      pageSize: 10,
      input: '',
      tableData: [{
        policyId: '',
        policyName: '',
        discount: '',
        createTime: ''
      }]
    }
  },
  created() {
    this.getTacticsList()
  },
  methods: {
    // 策略列表
    async getTacticsList() {
      const res = await getTacticsListAPI()
      // console.log(res)
      this.tableData = res
    },
    // 策略详情弹出层
    async getVmPolicy() {
      try {
        await getVmPolicyAPI(this.pageIndex, this.pageSize)
      } catch (error) {
        console.log(error)
      }
    },
    handleClose() {
    },
    headerCellStyle() {
      return 'background-color:#f3f6fb;font-weight:400;'
    }

  }
}
</script>

<style scoped lang="scss">

  .btn-content{
    display: flex;
    align-content: center;
  }
</style>
