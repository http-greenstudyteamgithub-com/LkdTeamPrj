<template>
  <div>
    <!-- stripe 是否为斑马纹
    headerCellStyle 表头样式
    max-height 表格最大高度
    handleSelectionChange(多选框绑定事件) 当选择项发生变化时会触发该事件
     -->
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :header-cell-style="headerCellStyle"
      :max-height="maxHeight"
      :stripe="stripe"
      tooltip-effect="dark"
      style="width: 100%"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <template v-for="(item,index) of headerColumns">
        <!-- selection多选框 -->
        <el-table-column
          v-if="item.selection"
          :key="`selection_${index}`"
          type="selection"
        />
        <!-- index 序列号-->
        <el-table-column
          v-else-if="item.index"
          :key="`index_${index}`"
          type="index"
          :label="item.label"
        />
        <!-- 自定义插槽 -->
        <slot
          v-else-if="item.slot"
          :name="item.slot"
        />
        <!-- 常规项 -->
        <el-table-column
          v-else
          :key="`normal_${index}`"
          show-overflow-tooltip
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
        />
      </template>

    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    // 表头样式
    headerCellStyle: {
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
    }
  }
}
</script>

<style>

</style>

