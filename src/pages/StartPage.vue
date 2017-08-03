<template>
  <v-app id="startPage">
    <v-toolbar fixed class="teal lighten-1" dark>
      <v-toolbar-title>Analysis Chart</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
      </v-container>
    </main>
  </v-app>
</template>

<script>
import ProjectRepository from '../Repositories/ProjectRepository'

export default {
  name: 'startPage',
  data () {
    return {
      project: []
    }
  },
  mounted () {
    let self = this
    ProjectRepository.getAllProject().then(result => {
      self.project = result
    })
  }
}
</script>
