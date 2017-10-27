<template>
  <div id="projectPage">
    <v-layout>
      <v-flex xs6 offset-xs3>
        <v-layout row wrap>
          <v-flex class="projects pa-2" v-for="item in project" :key="item.id" @click="go(item)">
            <v-card v-ripple>
              <v-card-text>
                <v-card-title><h3>{{ item.name }}</h3></v-card-title>
              </v-card-text>
            </v-card>
          </v-flex>
          <div class="projects pa-2">
            <project-creater v-on:reset="reset" v-on:logout="$emit('logout')"></project-creater>
          </div>
        </v-layout>
      </v-flex>
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
      this.$emit('getOthersInfoPageLink')
      this.$router.push('/Project')
    },
    reset () {
      location.reload()
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