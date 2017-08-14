<template>
  <v-layout>
    <v-flex xs6>
      <v-card>
        <v-card-text>
          <p v-if="error !== '{}'" class="ma-0">{{ error }}</p>
          <tables v-else-if="overAllTheory.length !== 0" :options="overAllTheory" name="Over All Theory" style="display: flex"></tables>
          <v-progress-circular indeterminate class="primary--text" v-else :size="50" style="width:100%;"></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs6>
      <v-card>
        <v-card-text>
          <p v-if="error !== ''" class="ma-0">{{ error }}</p>
          <tables v-else-if="overAll.length !== 0" :options="overAll" name="Over All Theory" style="display: flex"></tables>
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
      overAll: '',
      overAllTheory: '',
      error: ''
    }
  },
  beforeMount () {
    this.start()
  },
  methods: {
    start () {
      let self = this
      api.overallTable(self.$store.state.token, self.$store.state.projectId.id).then(res => {
        self.overAll       = res.data.simulation
        self.overAllTheory = res.data.theory

        papaparse.parse(self.overAll, {
          complete: function (result) {
            self.overAll = result.data
          }
        })

        papaparse.parse(self.overAllTheory, {
          complete: function (result) {
            self.overAllTheory = result.data
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