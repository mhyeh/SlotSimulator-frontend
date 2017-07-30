<template>
  <div id="mainPage">
    <file-input v-on:readFile="readFile"></file-input>
    <line-chart v-if="hasFile"></line-chart>
  </div>
</template>

<script>
  import LineChart from '@/components/LineChart'
  import FileInput from '@/components/FileInput'

  export default {
    name: 'mainPage',
    data () {
      return {
        hasFile: false,
        fileData: {}
      }
    },
    methods: {
      readFile () {
        this.hasFile = true

        // read file

        // draw chart
      }
    },
    components: {LineChart, FileInput}
  }
</script>

<style scoped>
  #mainPage {
    top: 10%;
    left: 10%;
    height: 80%;
    width: 80%;
    text-align: center;
  }

  file-input {
    height: 20%;
  }

  line-chart {
    height: 80%;
  }
</style>



