<template>
  <div id="app">
    <HeadNav/>
    <router-view class='router-view-margin'/>
  </div>
</template>

<script>
import HeadNav from './components/HeadNav.vue';
import Footer from './components/Footer.vue';
export default {
  name: 'App',
  components:{
    HeadNav,
    Footer
  }
}
</script>

<style>
.router-view-margin{
	margin-top: 50px;
}
</style>
