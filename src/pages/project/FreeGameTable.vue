<template>
  <v-layout>
    <v-flex xs6>
      <v-card>
        <v-card-text>
          <p v-if="error !== ''" class="ma-0">{{ error }}</p>
          <tables v-else-if="freeGameTheory.length !== 0" :options="freeGameTheory" name="Free Game Theory Par Sheet" style="display: flex"></tables>
          <v-progress-circular indeterminate class="primary--text" v-else :size="50" style="width:100%;"></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6>
      <v-card>
        <v-card-text>
          <p v-if="error !== ''" class="ma-0">{{ error }}</p>
          <tables v-else-if="freeGame.length !== 0" :options="freeGame" name="Free Game Simulation Par Sheet" style="display: flex"></tables>
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
      freeGame: '',
      freeGameTheory: '',
      error: ''
    }
  },
  beforeMount () {
    this.start()
  },
  methods: {
    start () {
      let self = this
      api.freegameTable(self.$store.state.token, self.$store.state.projectId.id).then(res => {
        self.freeGame       = res.data.simulation
        self.freeGameTheory = res.data.theory
        papaparse.parse(self.freeGame, {
          complete: function (result) {
            self.freeGame = result.data
          }
        })

        papaparse.parse(self.freeGameTheory, {
          complete: function (result) {
            self.freeGameTheory = result.data
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
