<template>
  <div>
    <div class="search">
      <el-form :inline="true" class="form-inline">
        <el-form-item label="设备编号：">
          <el-input
            v-model.trim="value"
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
          @click="AddDevice"
        >新建</el-button>
        <el-button type="warning" class="btn2" @click="Batch">工单配置</el-button>
      </div>
      <el-table
        :header-cell-style="{background:'#f5f7fa',color:'#737674',fontWeight:400}"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          type="index"
          label="序号"
          min-width="10%"
        />

        <el-table-column
          prop="innerCode"
          label="设备编号"
          min-width="10%"
        />
        <el-table-column
          prop="type.name"
          label="设备型号"
          min-width="10%"
        />
        <el-table-column
          prop="node.name"
          label="详细地址"
          min-width="10%"
        />
        <el-table-column
          prop="ownerName"
          label="合作商"
          min-width="10%"
        />
        <el-table-column
          label="设备状态"
          min-width="10%"
        >
          <template slot-scope="{row}">
            <span style="margin-left: 10px">{{ row.vmStatus === 0 ? '未投放' : row.vmStatus === 1 ? '运营' : '撤机'
            }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          min-width="10%"
        >
          <!-- <template slot-scope="res"></template> -->
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="getChannelList(row)">货道</el-button>
            <el-button type="text" size="small" @click="checkPolicy(row.innerCode)">策略</el-button>
            <el-button type="text" size="small" @click="edit(row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <Pagination v-if="totalCount<data.pageSize" :current-page.sync="data.pageIndex" :total-count="page.totalCount" :page-size="data.pageSize" :total-page="page.totalPage" @getList="taskSearchResult" />
    <!-- 新建 弹框-->

    <el-dialog title="新增设备" :visible.sync="dialogFormVisible" @close="empty">
      <el-form ref="addDeptForm" :model="form" :rules="rules">
        <el-form-item label="设备编号:" :label-width="formLabelWidth" style="margin-bottom: 20px;">
          <span>系统自动生成</span>
        </el-form-item>
        <el-form-item label="选择型号:" prop="version" :label-width="formLabelWidth">
          <el-select v-model="form.version" placeholder="请选择" class="selectWidth">
            <el-option v-for="item in versionList" :key="item.typeId" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择点位:" prop="point" :label-width="formLabelWidth">
          <el-select v-model="form.point" placeholder="请选择" class="selectWidth">
            <el-option v-for="item in pointList" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="empty">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 工单配置 -->
    <el-dialog title="批量策略管理" :visible.sync="ShowBatch" @close="cancel">
      <el-form ref="batchs" :model="batch">
        <el-form-item label="选择策略:" :label-width="formLabelWidth">
          <el-select v-model="batch.batchId" placeholder="请选择" class="selectWidth">
            <el-option v-for="item in batchList" :key="item.policyId" :label="item.policyName" :value="item.policyId" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="fixStrategy">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 查看策略 -->
    <el-dialog title="策略管理" :visible.sync="showPolicy">
      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机器编号:" :label-width="formLabelWidth">
              <span>{{ policyList.innerCode }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="策略名称：" :label-width="formLabelWidth">
              <span>{{ policyList.policyName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="策略方案:" :label-width="formLabelWidth">
              <span>{{ policyList.discount }}%</span>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="policyBtn" @click="cancelPolicy">取消策略</el-button>
      </div>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog v-if="showEdit" title="修改设备" :visible.sync="showEdit">
      <el-form :model="editId">
        <el-form-item label="机器编号:" :label-width="formLabelWidth">
          <span>{{ editList.innerCode }}</span>
        </el-form-item>
        <el-form-item label="供货时间:" :label-width="formLabelWidth">
          <span>{{ editList.lastSupplyTime }}</span>
        </el-form-item>
        <el-form-item label="设备类型:" :label-width="formLabelWidth">
          <span>{{ editList.type? editList.type.name : '没有设备' }}</span>
        </el-form-item>
        <el-form-item label="设备容量:" :label-width="formLabelWidth">
          <span>{{ editList.type?editList.type.channelMaxCapacity :'0' }}</span>
        </el-form-item>
        <el-form-item label="选择点位:" :label-width="formLabelWidth">
          <el-select v-model="editId.nodeId" placeholder="请选择" class="selectWidth">
            <el-option v-for="item in pointList" :key="item.typeId" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="合作商:" :label-width="formLabelWidth">
          <span>{{ editList.ownerName }}</span>
        </el-form-item>
        <el-form-item label="所属区域:" :label-width="formLabelWidth">
          <span>{{ editList.region.name }}</span>
        </el-form-item>
        <el-form-item label="设备地址:" :label-width="formLabelWidth">
          <span>{{ editList.node.name }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEdit=false">取 消</el-button>
        <el-button type="primary" @click="sureEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 货道 -->
    <ChannelListDialog ref="channelListDialog" :show-chanel-list-dialog.sync="showChanelListDialog" :business-id="businessId" />
  </div>
</template>

<script>
import {
  getAutomatAPI, getTypeAPI, getNodeAPI, getVmAPI,
  getPolicyAPI, setApplyPolicyAPI, getVmPolicyAPI, cancelPolicyAPI,
  editPointAPI, getVmSearchResult, getVmChannelList
} from '@/api/index.js'
import ChannelListDialog from '@/views/vm/index/components/ChannelListDialog'
export default {
  name: 'Manage',
  components: {
    ChannelListDialog
  },
  data() {
    return {
      batch: {
        innerCode: '',
        batchId: 1
      },
      value: '',
      formInline: {
        user: '',
        region: ''
      },
      data: {
        pageIndex: 1,
        pageSize: 10
      },
      totalCount: 0,
      totalPage: 0,
      list: [],
      page: {
        pageIndex: 0,
        totalCount: 0,
        totalPage: 0
      },
      search: {},
      dialogFormVisible: false,
      form: {
        version: '',
        point: ''
      },
      rules: {
        version: [{
          required: true,
          message: '型号必填'
        }],
        point: [{
          required: true,
          message: '点位必填'
        }]
      },
      version: {
        pageIndex: 1,
        pageSize: 10000
      },
      versionList: [],
      pointList: [],
      formLabelWidth: '120px',
      vmData: {
        vmType: 0,
        nodeId: 0,
        createUserId: 1
      },
      ShowBatch: false,
      innerCodeList: [],
      batchList: [],
      //  策略部分
      showPolicy: false,
      policyList: [],
      // 修改设备部分
      showEdit: false,
      editList: [],
      // 点位id
      editId: {
        nodeId: '1',
        id: ''
      },
      // 货道
      showChanelListDialog: false,
      headerColumns: [
        { selection: true },
        { index: true, label: '序号' },
        { label: '设备编号', prop: 'innerCode', minWidth: '10%' },
        { slot: 'vmType' },
        { slot: 'addr' },
        { label: '合作商', prop: 'ownerName', minWidth: '10%' },
        { slot: 'vmStatus' },
        { slot: 'operation' }
      ], // 表头
      vmList: [],
      loading: false, // 控制表格加载状态
      totalCounts: 0,
      totalPages: 0,
      businessId: 0
    }
  },
  computed: {
    datas() {
      return {
        innerCodeList: this.innerCodeList,
        policyId: this.batch.batchId
      }
    }
  },
  created() {
    this.getAutomat()
  },
  methods: {
    async getAutomat() {
      const res = await getAutomatAPI(this.data)
      this.list = res.currentPageRecords
      this.page.pageIndex = +res.pageIndex
      this.page.totalCount = +res.totalCount
      this.page.totalPage = +res.totalPage
    },
    taskSearchResult() {
      this.getAutomat()
    },
    Search() {
      if (this.value.length === 0) {
        this.data.pageIndex = 1
        this.data.pageSize = 10
        this.data.innerCode = ''
        this.getAutomat()
      } else {
        this.data.pageIndex = 1
        this.data.pageSize = 10
        this.data.innerCode = this.value
        this.getAutomat()
      }
    },
    async AddDevice() {
      this.dialogFormVisible = true
      const { currentPageRecords } = await getTypeAPI(this.version)
      this.versionList = currentPageRecords
      const { currentPageRecords: point } = await getNodeAPI(this.version)
      this.pointList = point
    },
    empty() {
      this.dialogFormVisible = false
      this.$refs.addDeptForm.resetFields()
    },
    async add() {
      const res = this.versionList.filter(item => item.name === this.form.version)
      this.vmData.vmType = res[0].typeId
      const result = this.pointList.filter(item => item.name === this.form.point)
      this.vmData.nodeId = result[0].id
      await getVmAPI(this.vmData)
      await this.getAutomat()
      this.empty()
    },
    cancel() {
      this.batch.batchId = 1
      this.ShowBatch = false
    },
    async Batch() {
      if (this.innerCodeList.length) {
        this.ShowBatch = true
        const res = await getPolicyAPI()
        this.batchList = res
      } else {
        this.$message({
          message: '请勾选售货机',
          type: 'warning'
        })
      }
    },
    handleSelectionChange(val) {
      const arr = []
      val.forEach(item => {
        arr.push(item.innerCode)
      })
      this.innerCodeList = arr
    },
    //  确定更改策略
    async fixStrategy() {
      try {
        await setApplyPolicyAPI(this.datas)
        this.getAutomat()
      } finally {
        this.cancel()
      }
    },
    //  查看策略
    async checkPolicy(id) {
      const res = await getVmPolicyAPI(id)
      // 有策略
      if (res.innerCode) {
        this.showPolicy = true
        this.policyList = res
        this.batch.innerCode = id
        this.getAutomat()
      } else { //  没有策略
        this.innerCodeList = [id]
        this.Batch()
      }
    },
    // 取消策略
    async cancelPolicy() {
      const data = {
        innerCode: this.batch.innerCode,
        policyId: this.policyList.policyId
      }
      await cancelPolicyAPI(data)
      this.showPolicy = false
      this.getAutomat()
    },
    // 修改
    async edit(row) {
      this.showEdit = true
      this.editList = row
      const { currentPageRecords } = await getNodeAPI(this.version)
      this.pointList = currentPageRecords
      this.editId.id = row.nodeId
      this.editId.id = row.id
    },
    async sureEdit() {
      try {
        await editPointAPI(this.editId)
        this.showEdit = false
        this.getAutomat()
      } catch (error) {
        this.$message.error('该设备正在运营')
      }
    },
    // 获取售货机列表
    async  getVmSearchResult() {
      const { currentPageRecords, totalCount, totalPage } = await getVmSearchResult(this.searchCondition)
      this.vmList = currentPageRecords
      this.totalCounts = +totalCount
      this.totalPages = +totalPage
    },
    // 货道
    async getChannelList(row) {
      this.businessId = row.businessId
      this.showChanelListDialog = true
      this.$refs.channelListDialog.typeInfo = row.type
      this.$refs.channelListDialog.innerCode = row.innerCode
      try {
        const res = await getVmChannelList(row.innerCode)
        this.$refs.channelListDialog.chanelList = res
        this.showChanelListDialog = true
      } catch (error) {
        console.log(error)
      }
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
  ::v-deep .selectWidth{
    width: 80%;
    margin-bottom: 20px;
  }
  ::v-deep .el-dialog {
    width: 50%;
  }

  ::v-deep .el-dialog__footer{
    text-align: center;
  }
  ::v-deep .el-dialog{
    border-radius: 10px;
  }
  .policyBtn{
    background-color: #fbf4f0;
    border: unset;
    border-radius: 4px;
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
  .btn2 {
    background-color: #f6ede7 !important;
    color: #655b56!important;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    border: none;
  }

</style>

