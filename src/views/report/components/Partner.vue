<template>
  <div class="box">
    <!-- 选择合作商 -->
    <span style="font-size:15px">合作商：</span>
    <el-select v-model="value" clearable placeholder="请选择">
      <el-option
        v-for="item of optionslist"
        :key="item.value"
        :label="item.name"
        :value="item.name"
      />
    </el-select>
    <!-- 选择合作商 -->
  </div>
</template>

<script>
import { getPartnerSearchAPI } from '@/api'
export default {
  data() {
    return {
      optionslist: [{
        value: '选项1',
        label: '0'
      }],
      value: ''
    }
  },
  created() {
    this.getPartnerSearch()
  },
  methods: {
    async getPartnerSearch() {
      const res = await getPartnerSearchAPI()
      this.optionslist = res.currentPageRecords
      console.log(this.optionslist)
    }
  }
}
</script>

<style style lang="scss">
</style>
