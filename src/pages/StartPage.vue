<template>
  <v-app id="startPage">
    <v-toolbar fixed class="teal lighten-1" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="./login">Sign in</v-btn>
        <v-btn flat  to="./register">Sign up</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs6 offset-xs3>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'startPage',
  props: ['title'],
  data () {
    return {
      project: []
    }
  },
  mounted () {

  }
}
</script>
