<template>
  <div class="search">
    <el-form :inline="true" class="form-inline">
      <el-form-item :label="label1">
        <el-input
          clearable
          :value="label1value"
          placeholder="请输入"
          @input="$emit('update:label1value', $event)"
        />
      </el-form-item>
      <el-form-item v-if="label2.length>0" :label="label2">
        <slot name="searchPanelSlot" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" class="searchBtn" size="small" @click="$emit('onSearch')">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 此组件为通栏 搜索框
// 需要传入2个表单选项的名字和值 传值的时候需要.sync 实现子组件修改父组件数据的双向绑定
//  第二个不传名字则只出现一个input框
// 需要传入一个自定义方法 onSearch 点击查询按钮的时候会触发
export default {
  name: 'SearchPanel',
  props: {
    /*  eslint-disable */
    label1: {
      type:String,
      required:true
    },
    label2: {
      type:String,
      default:""
    },
    label1value: {
      type:String,
      required:true
    },
    label2value: {
      type:String,
      default:""
    },
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    changeValue(e) {
      this.$emit('update:label1value', e)
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
</style>
