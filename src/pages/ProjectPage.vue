<template>
  <v-app id="projectPage">
    <v-toolbar fixed class="teal lighten-1" dark>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <span>All</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list>
          <v-list-tile v-for="item in items" :key="item">
            <v-list-tile-title v-text="item"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main>
      <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
      </v-container>
    </main>
  </v-app>
</template>

<script>
import projectRepository from '../Repositories/ProjectRepository'

export default {
  name: 'projectPage',
  props: ['title'],
  data () {
    return {
      project: []
    }
  },
  mounted () {
    let self = this
    projectRepository.getAllProject().then(result => {
      self.project = result
    })
  }
}
</script>
