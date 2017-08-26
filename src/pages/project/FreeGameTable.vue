<template>
  <v-layout>
    <v-flex xs6>
      <v-card>
        <v-card-text>
          <p v-if="theoryError !== ''" class="ma-0">{{ '' }}</p>
          <tables v-else-if="freeGameTheory.length !== 0" :options="freeGameTheory" name="Free Game Theory Par Sheet" style="display: flex"></tables>
          <v-progress-circular indeterminate class="primary--text" v-else :size="50" style="width:100%;"></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6>
      <v-card>
        <v-card-text>
          <p v-if="simulationError !== ''" class="ma-0">{{ '' }}</p>
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
      api.freegameSimulation(localStorage.getItem('token'), self.$store.state.projectId.id).then(res => {
        papaparse.parse(res.data.simulation, {
          complete: function (result) {
            self.freeGame = result.data
          }
        })
      }).catch(error => {
        console.log(error)
        self.simulationError = error.message
        if (error.response.code === 104) {
          self.$emit('logout')
        }
      })
      api.freegameTheory(localStorage.getItem('token'), self.$store.state.projectId.id).then(res => {
        papaparse.parse(res.data.theory, {
          complete: function (result) {
            self.freeGameTheory = result.data
          }
        })
      }).catch(error => {
        console.log(error)
        self.theoryError = error.message
        if (error.response.code === 104) {
          self.$emit('logout')
        }
      })
    }
  }
}
</script>
