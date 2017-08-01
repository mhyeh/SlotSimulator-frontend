<template>
  <div id="TotalNetWin">
  </div>
</template>

<script>
export default {
  props: ['dataTable'],
  data () {
    return {
      totalNetWin: [],
      range: 10
    }
  },
  methods: {
    calculate () {
      let self = this
      return new Promise((resolve, reject) => {
        let i = 1
        let sum = 0
        while (i < self.dataTable.length) {
          if (self.dataTable[i][2] === 0) {
            sum += self.dataTable[i][1]
          } else {
            while (sum % self.range >= self.totalNetWin.length) {
              self.totalNetWin.push(0)
            }
            self.totalNetWin[sum % self.range]++
            sum = 0
          }

          if (i === self.dataTable.length - 1) {
            resolve()
          }
          i++
        }
      })
    }
  }
}
</script>

<style scoped>

</style>