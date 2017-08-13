<template>
  <v-layout>
    <v-flex xs6>
      <v-card>
        <v-card-text>
          <p v-if="error !== ''" class="ma-0">{{ error }}</p>
          <tables v-else-if="baseGameTheory.length !== 0" :options="baseGameTheory" style="display: flex"></tables>
          <v-progress-circular indeterminate class="primary--text" v-else :size="50" style="width:100%;"></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6>
      <v-card>
        <v-card-text>
          <p v-if="error !== ''" class="ma-0">{{ error }}</p>
          <tables v-else-if="baseGame.length !== 0" :options="baseGame" style="display: flex"></tables>
          <v-progress-circular indeterminate class="primary--text" v-else :size="50" style="width:100%;"></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import papaparse from 'papaparse'

import api from '../../store/api'

export default {
  data () {
    return {
      baseGame: '',
      baseGameTheory: '',
      error: ''
    }
  },
  beforeMount () {
    this.start()
  },
  methods: {
    start () {
      let self = this
      api.basegameTable(self.$store.state.token, self.$store.state.projectId.id).then(res => {
        self.baseGame       = res.simulation
        self.baseGameTheory = res.theory

        papaparse.parse(self.baseGame, {
          complete: function (result) {
            self.baseGame = result.data
          }
        })

        papaparse.parse(self.baseGameTheory, {
          complete: function (result) {
            self.baseGameTheory = result.data
          }
        })
      }).catch(error => {
        console.log(error)
        self.error = error.message
      })
    }
  }
}
</script>