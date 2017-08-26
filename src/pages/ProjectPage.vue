<template>
  <div id="projectPage">
    <v-layout>
    <v-spacer></v-spacer>
    <div class="projects pa-2" v-for="item in project" :key="item.id" @click="go(item)">
      <v-card v-ripple>
        <v-card-text>
          <v-card-title><h3>{{ item.name }}</h3></v-card-title>
        </v-card-text>
      </v-card>
    </div>
    <div class="projects pa-2" @click="add">
      <project-creater></project-creater>
    </div>
    <v-spacer></v-spacer>
    </v-layout>
  </div>
</template>

<script>
import api from '../store/api'
export default {
  name: 'projectPage',
  props: ['title'],
  data () {
    return {
      project: [],
      dialog: false
    }
  },
  beforeMount () {
    let self = this
    console.log(localStorage.getItem('token'))
    api.getAllProject(localStorage.getItem('token')).then(res => {
      self.project = res.data
      self.$store.commit('setProject', res.data)
    }).catch(error => {
      console.log(error.response.data)
      if (error.response.data.code === 104) {
        self.$emit('logout')
      }
    })
  },
  methods: {
    go (item) {
      this.$store.commit('chooseProject', item)
      this.$router.push('/Project')
    },
    add () {

    }
  }
}
</script>

<style scoped>
.projects {
  display: inline-block;
  vertical-align: top;
}
.projects:hover {
  cursor: pointer
}
</style>