<template>
  <div id="TotalNetWin">
    <v-card>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs9>
              <v-slider class="pa-0" label="size" :max="4000000" :min="1" v-model="size" @input="change" :disabled="network"></v-slider>
            </v-flex>
            <v-flex xs3 class="pl-4">
              <v-text-field class="pa-0" :max="4000000" :min="1" v-model="size" type="number" @change="change" :disabled="network"></v-text-field>
            </v-flex>
            <v-flex xs9>
              <v-slider class="pa-0" label="step" :max="400" :min="1" v-model="step" @input="change" :disabled="network"></v-slider>
            </v-flex>
            <v-flex xs3 class="pl-4">
              <v-text-field class="pa-0" :max="400" :min="1" v-model="step" type="number" @change="change" :disabled="network"></v-text-field>
            </v-flex>
            <v-flex xs9>
              <v-slider class="pa-0" label="range" :max="100" :min="1" v-model="range" @input="change" :disabled="network"></v-slider>
            </v-flex>
            <v-flex xs3 class="pl-4">
              <v-text-field class="pa-0" :max="100" :min="1" v-model="range" type="number" @change="change" :disabled="network" suffix="%"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <br>
    <v-card>
      <v-card-text>
        <p v-if="error !== ''" class="ma-0">{{ error }}</p>
        <v-layout v-else-if="rtp.length !== 0" row wrap>
          <v-flex xs9>
            <v-card>
              <v-card-text>
                <high-chart :options="defaultOption(rtp, categories)" style="display: flex"></high-chart>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs3>
            <v-card>
              <v-card-text>
                <support-data :option="tableData"></support-data>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-progress-circular indeterminate class="primary--text" v-else :size="50" style="width:100%;"></v-progress-circular>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import api from '../../store/api'
import _ from 'lodash'
export default {
  data () {
    return {
      tableData: {},
      rtp: [],
      categories: [],
      size: 4000000,
      step: 400,
      range: 20,
      error: '',
      network: false
    }
  },
  beforeMount () {
    this.start()
    this.$store.watch(this.$store.getters.getChoose, function (n) {
      this.start()
    }.bind(this))
  },
  methods: {
    start () {
      let self = this
      self.rtp = []
      self.error = ''
      self.network = true
      api.rtp(self.$store.state.token, self.$store.state.projectId.id, self.size, self.step, self.range).then(function (res) {
        console.log(res.data)
        self.rtp       = self.conertData(res.data.chartData)
        self.tableData = res.data.tableData
        self.network   = false
      }).catch(function (error) {
        console.log(error)
        self.error = error.message
        self.network = false
      })
    },
    defaultOption (datas, categories) {
      return {
        chart: {
          type: 'column'
        },
        title: {
          text: 'RTP'
        },
        xAxis: {
          title: {
            text: 'RTP'
          },
          categories: categories
        },
        yAxis: {
          title: {
            text: 'times'
          },
          type: 'logarithmic'
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: false
            }
          }
        },
        series: [{
          name: 'Times',
          data: datas
        }]
      }
    },
    conertData (data) {
      let result = []
      this.categories = []
      for (let index in data) {
        result.push([index, data[index]])
        this.categories.push(parseFloat(index))
      }
      // console.log(result)
      this.categories.sort((x, y) => {
        if (x > y) return 1
        else if (x < y) return -1
        else return 0
      })
      result.sort(function (x, y) {
        if (parseFloat(x[0]) > parseFloat(y[0])) return 1
        else if (parseFloat(x[0]) < parseFloat(y[0])) return -1
        else return 0
      })
      return result
    },
    change: _.debounce(function () {
      this.start()
    }, 1000)
  }
}
</script>

<style scoped>
.inline > * {
  display: inline-block;
  vertical-align: top;
}
</style>