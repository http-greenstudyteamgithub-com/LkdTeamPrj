<template>
  <div>
    <!-- 搜索框 -->
    <SearchPanel :label1="label1" :label2="label2" :label1value.sync="label1value" :label2value.sync="label2value" />
    <!-- 操作按钮 新建/删除等 -->
    <div class="panel">
      <Operation :button-one-name="buttonOneName" :button-two-name="buttonTwoName" @add="add" @moreOperation="moreOperation" />
      <!-- 表格 -->
      <table :headerCellStyle="headerCellStyle" />
      <!-- 分页组件 -->
      <Pagination :current-page.sync="currentPage" :total-count="totalCount" :total-page="totalPage" :page-size="pageSize" />
    </div>
  </div>
</template>

<script>
// 需要传入一个onSearch自定义方法  点击搜索框查询按钮的时候会触发
// 给操作按钮传入两个方法 第一个是add 第二个是moreOperation
//
export default {
  name: 'CommonPanel',
  props: {
    // !搜索框相关
    label1: {
      type: String,
      required: true
    },
    label2: {
      type: String,
      default: ''
    },
    // 需要.sync
    label1value: {
      type: String,
      required: true
    },
    // 需要.sync
    label2value: {
      type: String,
      default: ''
    },
    // !操作按钮
    buttonOneName: {
      type: String,
      default: '新建'
    },
    buttonTwoName: {
      type: String,
      default: ''
    },
    add: {
      type: Function,
      default: () => {}
    },
    moreOperation: {
      type: Function,
      default: () => {}
    },
    // !表格
    headerCellStyle: { // 表头样式
      type: Object,
      default: () => {
        return { background: '#f5f7fa', color: '#737674', fontWeight: 400 }
      }
    },
    // 表格最大高度
    /*  eslint-disable */
    maxHeight: [String, Number],
    // 是否斑马纹
    stripe: {
      type: Boolean,
      default: true
    },
    // 表格数据
    tableData: {
      type: Array,
      required: true
    },
    // 表头数据
    headerColumns: {
      type: Array,
      required: true
    },
    // 多选触发的事件
    handleSelectionChange: {
      type: Function,
      default:()=>{}
    },
    //控制表格加载状态
    loading:{
      type:Boolean,
      default:false
    },
    // !分页组件
    currentPage: {
      type: Number,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    },
    totalPage: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    }


  }
}
</script>

<style>

</style>
