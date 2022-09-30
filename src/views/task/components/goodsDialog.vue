<template>
  <el-dialog
    title="补货详情"
    width="40%"
    :visible="showGoodsDialog"
    @close="closeDialog"
  >
    <!-- 表格 -->
    <Table />
    <!-- 按钮 -->
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button class="set" @click="closeDialog">取 消</el-button>
      <el-button v-loading="confirmLoading" class="add" @click="btnConfirm">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showGoodsDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      confirmLoading: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:showGoodsDialog', false)
    },
    btnConfirm() {}
  }

}
</script>

<style>
.el-dialog .el-dialog__header .el-dialog__title {
    line-height: 22px;
    font-size: 16px;
    font-weight: 600;
}
</style>
