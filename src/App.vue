<template>
  <div id="app">
    <auth-bar></auth-bar>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import AuthBar from '@/components/AuthBar.vue'

  export default {
    components:{
      AuthBar
    }
  };
</script>

<style>
</style>
