<template>
  <div style="margin: 0 auto;width:100%;height:100%;">

  </div>
</template>

<script>
let Highcharts = require('highcharts')
require('highcharts/modules/boost')(Highcharts)

export default {
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    options: function (value) {
      this.chart.update(value, true)
      return value
    }
  },
  mounted () {
    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    })

    this.chart = Highcharts.chart(this.$el, this.options)
  },
  beforeDestroy () {
    this.chart.destroy()
  }
}
</script>