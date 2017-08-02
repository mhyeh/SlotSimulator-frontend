<template>
  <v-app id="app" standalone>
    <v-navigation-drawer absolute persistent light :mini-variant.sync="mini" v-model="drawer" overflow>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <v-icon>mdi-drawing blue--text</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Toolbar</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini" ripple>
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="generate(item.title)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="indigo darken-4" dark>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Chart Generator</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'home' },
        { title: 'RTP', icon: 'mdi-chart-bar' },
        { title: 'Total Net Win', icon: 'mdi-chart-line' },
        { title: 'Survival Rate', icon: 'mdi-table-large' }
      ],
      mini: false,
      right: null
    }
  },
  methods: {
    generate (title) {
      if (title === 'Home') {
        window.location.href = '/#/'
      } else {
        window.location.href = '/#/' + title.replace(/\s+/g, '')
      }
    }
  }
}
</script>

<style>
  @import '../node_modules/mdi/css/materialdesignicons.min.css';
</style>
