<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    console.log(this)
  }
}
</script>

<style >
#app{
    min-width: 1200px;
    overflow: hidden;
    /*max-width:100%;*/
}

</style>
