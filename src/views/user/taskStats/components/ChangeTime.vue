<template>
  <div>
    <div class="timeChange">
      <div v-for="(item,i) in times" :key="i">
        <div :class="{active:item===newarr[0]}" @click="active(i)">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangeTime',
  props: {
    times: {
      type: Array,
      default: () => {
        return ['周', '月', '年']
      }
    }
  },
  data() {
    return {
      newarr: []
    }
  },
  methods: {
    active(i) {
      this.newarr = this.times.filter(item => {
        return item === this.times[i]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.timeChange{
display: flex;
justify-content: space-around;
align-items: center;
height: 30px;
background-color: #e9f3ff;
overflow: hidden;
border-radius:9px;
.active{
   display: inline-block;
   text-align: center;
    background-color: #fff;
    border-radius: 5px;
     font-size: 14px;
     color: #000;
}
div{
text-align: center;
    padding:2px 5px ;
    font-size: 12px;
     height: 20px;
     color: #999;
    // line-height: 30px;
}
}
</style>
