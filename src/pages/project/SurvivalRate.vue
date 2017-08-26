<template>
  <div id="TotalNetWin">
    <v-card>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs9>
              <v-slider class="pa-0" label="size" :max="100000" :min="1" v-model="size" @input="change" :disabled="network"></v-slider>
            </v-flex>
            <v-flex xs3 class="pl-4">
              <v-text-field class="pa-0" :max="100000" :min="1" v-model="size" type="number" @change="change" :disabled="network"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
    <br>
    <v-card>
      <v-card-text>
        <p v-if="error !== ''" class="ma-0">{{ error }}</p>
        <v-data-table v-else-if="survivalRate.length !== 0"
          v-bind:headers="header"
          :items="survivalRate"
        >
          <template slot="items" scope="props">
            <td>{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.hand }}</td>
            <td class="text-xs-right">{{ props.item.isSurvival }}</td>
          </template>
        </v-data-table>
        <v-progress-circular indeterminate class="primary--text" v-else :size="50" style="width:100%;"></v-progress-circular>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import api from '../../store/api'
import _ from 'lodash'
export default {
  data () {
    return {
      header: [
        {
          text: 'Run',
          align: 'left',
          sortable: false,
          value: 'Run'
        },
        {
          text: 'SpinCount',
          sortable: false,
          value: 'SpinCount'
        },
        {
          text: 'Ruin/Double',
          sortable: false,
          value: 'Ruin/Double'
        }
      ],
      survivalRate: [],
      size: 100000,
      error: '',
      network: false
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
      let self = this
      self.survivalRate = []
      self.error = ''
      self.network = true
      api.survivalRate(localStorage.getItem('token'), self.$store.state.projectId.id, self.size).then(res => {
        self.survivalRate = res.data
        self.network = false
      }).catch(error => {
        console.log(error)
        self.error = error.message
        self.network = false
        if (error.response.data.code === 104) {
          self.$emit('logout')
        }
      })
    },
    change: _.debounce(function () {
      this.start()
    }, 1000)
  }
}
</script>

<style scoped>
.inline>* {
  display: inline-block;
  vertical-align: top;
}
</style>