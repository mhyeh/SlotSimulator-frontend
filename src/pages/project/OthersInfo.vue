<template>
  <v-layout v-if="connect" row wrap>
    <v-flex xs12>
      <v-card v-if="config.settingItem !== undefined">
        <v-card-text>
          <v-container fluid>
            <v-layout row wrap v-for="(item, index) in config.settingItem" :key="index">
              <template v-if="item.type === 'slider'">
                <v-flex xs9>
                  <v-slider class="pa-0" :label="item.name" :max="item.config.max" :min="item.config.min" v-model="item.value" @input="change" :disabled="network"></v-slider>
                </v-flex>
                <v-flex xs3 class="pl-4">
                  <v-text-field class="pa-0" :max="item.config.max" :min="item.config.min" v-model="item.value" type="number" @change="change" :disabled="network"></v-text-field>
                </v-flex>
              </template>
              <template v-else-if="item.type === 'text'">
                <v-text-field :label="item.name" v-model="item.value" :disabled="network"></v-text-field>
              </template>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <br>
      <v-card v-if="error !== ''">
        <v-card-text>
          <p class="ma-0">{{ error }}</p>
        </v-card-text>
      </v-card>
      <v-card v-else-if="data !== null">
        <v-card-text>
          <v-container fluid>
            <v-layout row wrap v-for="(item, index) in data" :key="index">
              <template v-if="item.type === 'chart'">
                <v-flex xs12 class="pa-2">
                  <v-card>
                    <v-card-text>
                      <high-chart :options="item.config" style="display: flex"></high-chart>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </template>
              <template v-else-if="item.type === 'table'">
                <v-flex xs12 class="pa-2">
                  <v-card>
                    <v-card-text>
                      <tables :options="item.config" style="display: flex"></tables>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </template>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
      <v-card v-else>
        <v-card-text>
          <v-progress-circular indeterminate class="primary--text" :size="50" style="width:100%;"></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import api from '../../store/api'
import _ from 'lodash'

export default {
  data () {
    return {
      config: null,
      connect: false,
      network: false,
      error: '',
      data: null
    }
  },
  watch: {
    '$route': 'render'
  },
  methods: {
    render () {
      let self = this
      this.connect = false
      this.getConfig().then(() => {
        if (self.config.settingItem !== undefined) {
          for (let item of self.config.settingItem) {
            item.value = item.config.default
          }
        }
        self.connect = true
        self.start()
      }).catch(error => {
        if (error.response.data.code === 104) {
          self.$emit('logout')
        }
      })
    },
    getConfig () {
      let self = this
      return new Promise((resolve, reject) => {
        api.getConfig(localStorage.getItem('token'), self.$store.state.projectId.id).then(res => {
          let route = self.$router.currentRoute.params.name
          self.config = res.data[route]
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    start () {
      let self   = this
      let config = {
        page: self.$router.currentRoute.params.name
      }
      let settings = {}

      self.network = true
      self.data = null

      for (let item of self.config.settingItem) {
        settings[item.name] = item.value
      }
      config.setting = settings
      api.getOthersData(localStorage.getItem('token'), self.$store.state.projectId.id, config).then(res => {
        self.data    = res.data
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
  },
  beforeMount () {
    this.render()
  }
}
</script>