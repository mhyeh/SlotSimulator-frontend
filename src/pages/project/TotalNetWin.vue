<template>
  <div id="TotalNetWin">
    <v-card>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs9>
              <v-slider class="pa-0" label="size" :max="1000000" :min="1" v-model="size" @input="change" :disabled="network"></v-slider>
            </v-flex>
            <v-flex xs3 class="pl-4">
              <v-text-field class="pa-0" :max="1000000" :min="1" v-model="size" type="number" @change="change" :disabled="network"></v-text-field>
            </v-flex>
            <v-flex xs9>
              <v-slider class="pa-0" label="step" :max="100" :min="1" v-model="step" @input="change" :disabled="network"></v-slider>
            </v-flex>
            <v-flex xs3 class="pl-4">
              <v-text-field class="pa-0" :max="100" :min="1" v-model="step" type="number" @change="change" :disabled="network"></v-text-field>
            </v-flex>
            <v-flex xs9>
              <v-slider class="pa-0" label="range" :max="10" :min="1" v-model="range" @input="change" :disabled="network"></v-slider>
            </v-flex>
            <v-flex xs3 class="pl-4">
              <v-text-field class="pa-0" :max="10" :min="1" v-model="range" type="number" @change="change" :disabled="network"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <br>
    <v-card>
      <v-card-text>
        <p v-if="error !== ''" class="ma-0">{{ error }}</p>
        <high-chart v-else-if="totalNetWin.length !== 0" :options="defaultOption(totalNetWin, min, max)" style="display: flex"></high-chart>
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
      totalNetWin: [],
      size: 1000000,
      step: 100,
      range: 10,
      min: 0,
      max: 0,
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
      var self = this
      self.totalNetWin = []
      self.error = ''
      self.network = true
      api.totalNetWin(self.$store.state.token, self.$store.state.projectId.id, self.size, self.step, self.range).then(function (res) {
        self.totalNetWin = self.conertData(res.data)
        self.network = false
      }).catch(function (error) {
        console.log(error)
        self.error = error.message
        self.network = false
      })
    },
    defaultOption (datas, min, max) {
      return {
        chart: {
          type: 'column',
          zoomType: 'x'
        },
        title: {
          text: ''
        },
        xAxis: {
          min: min,
          max: max
        },
        yAxis: {
          title: {
            text: 'times'
          }
        },
        legend: {
          enabled: false
        },
        series: [{
          data: datas
        }]
      }
    },
    conertData (data) {
      var result = []
      for (var index in data) {
        // if (result.length < 1000) {
        result.push([index, data[index]])
        // }
        if (parseFloat(index) > this.max) this.max = parseFloat(index)
        if (parseFloat(index) < this.min) this.min = parseFloat(index)
      }
      // console.log(result)
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