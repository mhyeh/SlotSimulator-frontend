<template>
  <div id="RTP">
    <div id="setting">
    </div>
    <div id="chart">
    </div>
  </div>
</template>

<script>
let Highcharts = require('highcharts')
export default {
  props: ['dataTable'],
  data () {
    return {
      rtp: [],
      range: 5,
      step: 400,
      pay: 25
    }
  },
  methods: {
    calculate () {
      let self = this
      return new Promise((resolve, reject) => {
        for (let i = 1; i < self.dataTalbe.length; i += self.step) {
          let sum = 0
          for (let j = 0; j < self.step; j++) {
            sum += self.dataTalbe[i + j][1] + self.pay
          }
          let rtp = sum / self.pay / self.step
          while (rtp % self.range >= self.rtp.length) {
            self.rtp.push(0)
          }
          self.rtp[rtp % self.range]++
          if (i === self.dataTalbe.length - self.step) {
            resolve()
          }
        }
      })
    }
  },
  mounted () {
    let self = this

    Highcharts.chart(self.$el, {
      chart: {
        type: 'column'
      },
      title: {
        text: 'RTP'
      },
      xAxis: {
        type: 'caregory',
        title: {
          text: 'range'
        }
      },
      credits: {
        enabled: false
      }
    })
  }
}
</script>

<style scoped>

</style>