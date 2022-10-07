<template>
  <el-select v-model="value" filterable placeholder="全部" class="select" @change="onchange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { getregionList } from '@/api'
export default {
  name: 'UserPartAll',
  data() {
    return {
      options: [],
      value: ''
    }
  },
  created() {
    this.getregionList()
  },
  methods: {
    async getregionList() {
      const data = await getregionList()
      const newdata = JSON.parse(JSON.stringify(data).replace(/name/gi, 'value').replace(/remark/gi, 'label'))
      this.options = newdata.currentPageRecords
    //   console.log(newdata)
    },
    onchange(a) {
      console.log(a)
    }
  }
}
</script>

<style lang="scss">
.select{
 .el-input__inner{
      height: 26px !important;
    line-height: 26px;
    border: 1px solid #5373e0;

}
.el-input__icon {
    height: 100%;
    width: 25px;
    text-align: center;
    line-height: 27px;}}
</style>
