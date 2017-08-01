<template>
  <div id="mainPage">
    <file-input v-on:readFile="parseToJson"></file-input>
    <div id="chart">
      <r-t-p v-if="hasFile" :dataTable="fileData"></r-t-p>
      <total-net-win v-if="hasFile" :dataTable="fileData"></total-net-win>
      <survival-rate v-if="hasFile" :dataTable="fileData"></survival-rate>
    </div>
  </div>
</template>

<script>
  let papaparse = require('papaparse')

  import FileInput from '@/components/FileInput'
  import RTP from '@/components/RTP'
  import TotalNetWin from '@/components/TotalNetWin'
  import SurvivalRate from '@/components/SurvivalRate'

  export default {
    name: 'mainPage',
    data () {
      return {
        hasFile: false,
        fileData: []
      }
    },
    methods: {
      parseToJson (data) {
        let self = this

        let config = {
          complete: function (result) {
            self.fileData = result.data
            self.hasFile = true
            console.log('Finish')
          }
        }

        papaparse.parse(data, config)
      }
    },
    components: {FileInput, RTP, TotalNetWin, SurvivalRate}
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

  #chart {
    height: 80%;
    overflow-y: scroll;
  }
</style>