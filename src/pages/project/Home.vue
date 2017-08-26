<template>
  <v-layout row wrap>
    <v-card v-if="error !== ''">
      <v-card-text>
        {{ error }}
      </v-card-text>
    </v-card>
    <v-flex v-else-if="infoes.type !== ''" class="infoes pa-2" v-for="(value, key) in infoes" :key="key">
      <v-card>
        <v-card-text>
          {{ key }}
          <v-card-title><h3 style="white-space: pre-line;">{{ value }}</h3></v-card-title>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-progress-circular indeterminate class="primary--text" v-else :size="50" style="width:100%;"></v-progress-circular>
  </v-layout>
</template>

<script>
import api from '../../store/api'
export default {
  name: 'home',
  data () {
    return {
      infoes: {},
      error: ''
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
      let showDatas = ['type', 'block', 'thread', 'runTime', 'reels', 'rows', 'betCost']
      let self = this
      let data = {}
      self.infoes = {
        type: ''
      }
      self.error = ''
      api.getProject(localStorage.getItem('token'), self.$store.state.projectId.id).then(res => {
        data = res.data
        return api.getProjectType(localStorage.getItem('token'), data.typeId)
      }).then(res => {
        data.type = res.data.name
        for (let showData of showDatas) {
          self.infoes[showData] = data[showData].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      }).catch(error => {
        console.log(error)
        self.error = error.message
        if (error.response.data.code === 104) {
          self.$emit('logout')
        }
      })
    }
  }
}
</script>

<style scoped>
.infoes {
  display: inline-block;
  vertical-align: top;
}
</style>



