<template>
  <v-layout v-if="connect">
    {{setting}}
  </v-layout>
</template>

<script>
import api from '../../store/api'

export default {
  data () {
    return {
      config: null,
      connect: false
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
        self.connect = true
        if (self.config.settingItem !== undefined) {
          self.setting = '123456'
        }
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
    }
  },
  beforeMount () {
    this.render()
  }
}
</script>