<template>
  <div id="login">
    <div style="margin:0 auto;width:300px;">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <h3 class="headline mb-0">Login</h3>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Email" required v-model="account"></v-text-field>
          <v-text-field label="Password" type="password" required v-model="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue white--text" @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import api from '../store/api'
export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login () {
      let self = this
      let token
      if (self.account !== '' && self.password !== '') {
        api.login(self.account, self.password).then(res => {
          token = res.data.token
          localStorage.setItem('token', token)
          self.$emit('login')
        }).catch(res => {
          console.log(res)
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
