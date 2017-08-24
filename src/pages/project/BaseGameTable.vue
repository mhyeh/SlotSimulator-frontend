<template>
  <v-layout>
    <v-flex xs6>
      <v-card>
        <v-card-text>
          <p v-if="theoryError !== ''" class="ma-0">{{ '' }}</p>
          <tables v-else-if="baseGameTheory.length !== 0" :options="baseGameTheory" name="Base Game Theory Par Sheet" style="display: flex"></tables>
          <v-progress-circular indeterminate class="primary--text" v-else :size="50" style="width:100%;"></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6>
      <v-card>
        <v-card-text>
          <p v-if="simulationError !== ''" class="ma-0">{{ '' }}</p>
          <tables v-else-if="baseGame.length !== 0" :options="baseGame" name="Base Game Simulation Par Sheet" style="display: flex"></tables>
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
      simulationError: '',
      theoryError: ''
    }
  },
  beforeMount () {
    this.start()
  },
  methods: {
    start () {
      let self = this
      api.basegameSimulation(self.$store.state.token, self.$store.state.projectId.id).then(res => {
        papaparse.parse(res.data.simulation, {
          complete: function (result) {
            self.baseGame = result.data
          }
        })
      }).catch(error => {
        console.log(error)
        self.simulationError = error.message
      })
      api.basegameTheory(self.$store.state.token, self.$store.state.projectId.id).then(res => {
        papaparse.parse(res.data.theory, {
          complete: function (result) {
            self.baseGameTheory = result.data
          }
        })
      }).catch(error => {
        console.log(error)
        self.theoryError = error.message
      })
    }
  }
}
</script>