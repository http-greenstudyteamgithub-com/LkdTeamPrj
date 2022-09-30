<template>
  <div>
    <CommonPanel
      :label1="label1"
      :label2="label2"
      :label1value.sync="searchCondition.name"
      :label2value.sync="searchCondition.regionId"
      :current-page.sync="searchCondition.pageIndex"
      :page-size="searchCondition.pageSize"
      :total-count="totalCount"
      :table-data="tableData"
      :header-columns="headerColumns"
      :total-page="totalPage"
    >
      <template v-slot:searchPanelSlot>
        <el-select placeholder="请输入" clearable>
          <el-option v-for="(item,index) of AllRegionList" :key="index" :label="item.name" :value="item.id" />
        </el-select>
      </template>
    </CommonPanel>
  </div>
</template>

<script>
import { getRegion } from '@/api'
export default {
  name: 'NodeNode',
  data() {
    return {
      label1: '点位搜索',
      label2: '区域搜索',
      tableData: [], // 表格数据
      headerColumns: [
        // 序号
        {
          index: true,
          label: '序号'
        }
      ], // 表头
      totalCount: 0, // 总数量
      totalPage: 0, // 总页数
      searchCondition: {
        pageIndex: 1,
        pageSize: 10,
        name: '', // 点位搜索词——点位名称
        regionId: ''// 区域搜索——区域id
      },
      AllRegionList: []
    }
  },
  created() {
    this.getAllRegion()
  },
  methods: {
    // 获取所有区域列表
    async getAllRegion() {
      const searchCondition = { pageIndex: 1, pageSize: 100000 }
      try {
        const res = await getRegion(searchCondition)
        this.AllRegionList = res.currentPageRecords
        console.log(this.AllRegionList)
      } catch (error) {
        console.log(error)
      }
    }
  }

}
</script>

<style>

</style>
