<template>
  <div id="login">
    <div style="margin:0 auto;width:300px;">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <h3 class="headline mb-0">Register</h3>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Email" required v-model="account"></v-text-field>
          <v-text-field label="Password" type="password" required v-model="password"></v-text-field>
          <v-text-field label="Confirm Password" type="password" required v-model="checkPassword"></v-text-field>
          <v-text-field label="Name" required v-model="name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue white--text" @click="register">Register</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import api from '../store/api'
export default {
  name: 'register',
  data () {
    return {
      account: '',
      password: '',
      checkPassword: '',
      name: ''
    }
  },
  methods: {
    register () {
      let self = this
      let token
      if (self.account !== '' && self.password !== '' && self.checkPassword !== '' && self.name !== '') {
        api.register(self.account, self.password, self.checkPassword, self.name).then(function (res) {
          token = res.data.token
          return api.getUserInfo(token)
        }).then(res => {
          self.$emit('login', res.data.name)
          self.$store.commit('login', token)
          self.$router.replace('/Account')
        }).catch((res) => {
          console.log(res)
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
