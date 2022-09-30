<template>
  <el-pagination
    :current-page="currentPage"
    :page-size="pageSize"
    layout="slot, prev,next"
    prev-text="上一页"
    next-text="下一页"
    :total="totalCount"
    @current-change="changeCurrentPage"
  >
    <span class="totalPage">共{{ totalCount }}条记录 第{{ currentPage }}/{{ totalPage }}页</span>
  </el-pagination>
</template>

<script>
// 给分页组件绑定一个自定义事件 changeCurrentPage
export default {
  name: 'Pagination',
  props: {
    currentPage: { // 需要.sync
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
  },
  data() {
    return {
    }
  },
  methods: {
    changeCurrentPage(currentPage) {
      this.$emit('update:currentPage', currentPage)// 改变父组件当前页数据
      this.$emit('getList')// 重新获取数据
    }
  }

}
</script>

<style lang="scss" scoped>
.totalPage{
  flex: 1;
  font-size: 16px!important;
  color: #dbdfe5!important;
  margin-left: 10px;
  font-weight: 400;
}
</style>
<style lang="scss">
.el-pagination .btn-next, .el-pagination .btn-prev {
    background: center center no-repeat #d5ddf8;
    cursor: pointer;
    margin: 0 10px;
    color: #303133;
}
.el-pagination button {
    border: none;
    padding: 0 12px;
}
.el-pagination button:disabled {
    color: #C0C4CC;
    background-color: #edf0f9;
    color: #d8dde3!important;
    cursor: not-allowed;
}
.btn-prev:disabled {
    color: #d8dde3;
}
.el-pagination button:hover {
    color: unset;
}

.el-pagination{
  display: flex;
  justify-content: end;
  background: #fff;
  padding: 32px 16px
}
</style>
