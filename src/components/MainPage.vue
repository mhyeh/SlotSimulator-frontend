<template>
  <div id="mainPage">
    <file-input v-on:readFile="parseToJson"></file-input>
    <line-chart v-if="hasFile"></line-chart>
  </div>
</template>

<script>
  let papaparse = require('papaparse')

  import LineChart from '@/components/LineChart'
  import FileInput from '@/components/FileInput'

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
            self.jsonToChartData(result.data).then(function () {
              self.hesFile = true
              console.log('Finish')
            })
          }
        }

        papaparse.parse(data, config)

        // draw chart
      },
      jsonToChartData (dataTable) {
        let self = this
        return new Promise((resolve, reject) => {
          for (let i = 0; i < dataTable[0].length; i++) {
            let dataSet = {
              lebel: dataTable[0][i],
              data: []
            }
            self.fileData.push(dataSet)
          }
          for (let i = 1; i < dataTable.length; i++) {
            for (let j = 0; j < dataTable[i].length; j++) {
              self.fileData[j].data.push(dataTable[i][j])
              if (i === dataTable.length - 1 && j === dataTable[i].length - 1) {
                resolve()
              }
            }
          }
        })
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



