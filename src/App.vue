<template>
  <v-app id="app">
    <router-view :title="title"></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'Analysis Chart'
    }
  },
  mounted () {
    window.location.href = '/#/'
  }
}
</script>

<style scoped>
</style>
