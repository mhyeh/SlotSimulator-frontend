<template>
  <div id="home">
    <v-card v-if="error !== ''">
      <v-card-text>
        {{ error }}
      </v-card-text>
    </v-card>
    <div v-else-if="infoes !== null" class="infoes pa-2" v-for="(value, key) in infoes" :key="key">
      <v-card v-ripple>
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
      this.start()
    }.bind(this))
  },
  methods: {
    start () {
      var self = this
      self.infoes = null
      self.error = ''
      api.getProject(self.$store.state.token, self.$store.state.projectId.id).then(function (res) {
        self.infoes = res.data
      }).catch(function (error) {
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



