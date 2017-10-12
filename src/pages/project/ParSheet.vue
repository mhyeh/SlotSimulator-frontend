<template>
  <v-layout>
    <v-flex xs6 class="mr-2">
      <v-card>
        <v-card-text>
          <p v-if="theoryError !== ''" class="ma-0">{{ '' }}</p>
          <tables v-else-if="theory.length !== 0" :options="theory" theory="true" :name="title + ' Theory PAR Sheet'" style="display: flex"></tables>
          <v-progress-circular indeterminate class="primary--text" v-else :size="50" style="width:100%;"></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6>
      <v-card>
        <v-card-text>
          <p v-if="simulationError !== ''" class="ma-0">{{ '' }}</p>
          <tables v-else-if="simulation.length !== 0" :options="simulation" :name="title + ' Simulation PAR Sheet'" style="display: flex"></tables>
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
  props: ['table', 'title'],
  data () {
    return {
      simulation: '',
      theory: '',
      simulationError: '',
      theoryError: ''
    }
  },
  beforeMount () {
    this.start()
  },
  watch: {
    '$route': 'start'
  },
  methods: {
    start () {
      let self = this
      api.getPARSheet(localStorage.getItem('token'), self.$store.state.projectId.id, this.table + 'Sim').then(res => {
        papaparse.parse(res.data.table, {
          complete: function (result) {
            self.simulation = result.data
          }
        })
      }).catch(error => {
        console.log(error)
        self.simulationError = error.message
        if (error.response.data.code === 104) {
          self.$emit('logout')
        }
      })
      api.getPARSheet(localStorage.getItem('token'), self.$store.state.projectId.id, this.table + 'Theory').then(res => {
        papaparse.parse(res.data.table, {
          complete: function (result) {
            self.theory = result.data
          }
        })
      }).catch(error => {
        console.log(error)
        self.theoryError = error.message
        if (error.response.data.code === 104) {
          self.$emit('logout')
        }
      })
    }
  }
}
</script>