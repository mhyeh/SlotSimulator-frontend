<template>
  <div id="RTP">
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>

</style>