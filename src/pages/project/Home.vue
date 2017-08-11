<template>
  <div id="home">
    <v-card v-if="error !== ''">
      <v-card-text>
        {{ error }}
      </v-card-text>
    </v-card>
    <div v-else-if="infoes !== null" class="infoes pa-2" v-for="(value, key) in infoes" :key="key">
      <v-card>
        <v-card-text>
          <p class="text-xs-center">{{ key }}</p>
          <v-card-title><h3 style="white-space: pre-line;">{{ value }}</h3></v-card-title>
        </v-card-text>
      </v-card>
    </div>
    <v-progress-circular indeterminate class="primary--text" v-else :size="50" style="width:100%;"></v-progress-circular>
  </div>
</template>

<script>
import api from '../../store/api'
export default {
  name: 'home',
  data () {
    return {
      infoes: null,
      error: ''
    }
  },
  beforeMount () {
    this.start()
    this.$store.watch(this.$store.getters.getChoose, function (n) {
      console.log(1)
      this.start()
    }.bind(this))
  },
  methods: {
    start () {
      let showDatas = ['type', 'block', 'thread', 'runTime', 'reels', 'rows', 'betCost']
      let self = this
      let data = {}
      self.infoes = {
        type: 0
      }
      self.error = ''
      api.getProject(self.$store.state.token, self.$store.state.projectId.id).then(res => {
        data = res.data
        return api.getProjectType(self.$store.state.token, data.typeId)
      }).then(res => {
        data.type = res.data.name
        for (let showData of showDatas) {
          self.infoes[showData] = data[showData]
        }
      }).catch(error => {
        console.log(error)
        self.error = error.message
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



