<template>
  <div id="projectPage">
    <v-layout>
    <v-spacer></v-spacer>
    <v-flex xs2 class="projects pa-2" v-for="item in project" :key="item.id" @click="go(item)">
      <v-card v-ripple>
        <v-card-text>
          <v-card-title><h3>{{ item.name }}</h3></v-card-title>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs2 class="projects pa-2" @click="add">
      <v-card v-ripple>
        <v-card-text class="blue">
          <v-card-title><h3>+</h3></v-card-title>
        </v-card-text>
      </v-card>
    </v-flex>
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
      project: []
    }
  },
  beforeMount () {
    let self = this
    api.getAllProject(self.$store.state.token).then(function (res) {
      self.project = res.data
      self.$store.commit('setProject', res.data)
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