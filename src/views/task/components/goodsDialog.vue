<template>
  <el-dialog
    title="补货详情"
    width="40%"
    :visible="showGoodsDialog"
    @close="closeDialog"
  >
    <!-- 表格 -->
    <el-scrollbar style="height:330px">
      <Table :table-data="tableData" :header-columns="headerColumns">
        <template #fullNum>
          <!-- <el-table-column
            min-width="10%"
            show-overflow-tooltip
            label="补满数量"
          >
            <template slot-scope="{row}">
              <el-input-number v-model="row.expectCapacity" controls-position="right" :min="1" :max="row.expectCapacity" />
            </template>
          </el-table-column> -->
          <slot name="fullNum" />
        </template>
      </Table>
    </el-scrollbar>
    <!-- 按钮 -->
    <el-row v-if="isShowButton" slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
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
    },
    isShowButton: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      required: true
    },
    headerColumns: {
      type: Array,
      required: true
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
    btnConfirm() {
      this.$emit('btnConfirm')
    }
  }

}
</script>

<style>
.el-dialog .el-dialog__header .el-dialog__title {
    line-height: 22px;
    font-size: 16px;
    font-weight: 600;
}
.el-dialog .el-dialog__body {
    padding: 20px 20px 30px;
    color: #666;
}
</style>
