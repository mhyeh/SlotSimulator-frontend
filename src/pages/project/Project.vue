<template>
  <div id="Project">
    <router-view v-on:logout="logout"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Project',
  data () {
    return {
    }
  },
  mounted () {

  },
  methods: {
    logout () {
      this.$emit('logout')
    }
  }
}
</script>
