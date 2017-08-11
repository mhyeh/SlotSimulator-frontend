<template>
  <v-app>
    <template v-if="!$route.path.match('Project')"> 
      <v-toolbar fixed class="teal lighten-1" dark>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat to="./login">Sign in</v-btn>
          <v-btn flat to="./register">Sign up</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template> 
    <template v-else>
      <v-navigation-drawer absolute persistent light :mini-variant.sync="mini" v-model="drawer" overflow class="grey lighten-2">
        <v-toolbar flat class="grey lighten-2">
          <v-list class="pa-0">
            <v-list-tile avatar tag="div">
              <v-list-tile-avatar>
                <v-icon>mdi-drawing grey lighten-2 blue--text</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Chart Generator</v-list-tile-title>
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
          <v-list-tile @click="generate('Home')">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-subheader class="grey--text text--darken-1">Player Experience Simulation</v-subheader>
          <v-list-tile v-for="item in playerExpriences" :key="item.title" @click="generate(item.title)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar fixed class="teal lighten-1" dark>
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-menu :nudge-width="100">
          <v-toolbar-title slot="activator">
            <span>{{ project.name }}</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-toolbar-title>
          <v-list>
            <v-list-tile v-for="item in projects" :key="item.name" @click="changeProject(item)">
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
    </template>
    
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
      title: 'Analysis Chart',
      drawer: true,
      playerExpriences: [
        { title: 'RTP', icon: 'mdi-chart-bar' },
        { title: 'Total Net Win', icon: 'mdi-chart-line' },
        { title: 'Survival Rate', icon: 'mdi-table-large' }
      ],
      mini: false,
      right: null
    }
  },
  computed: {
    project: function () {
      return this.$store.state.projectId
    },
    projects: function () {
      return this.$store.state.projects
    }
  },
  methods: {
    generate (title) {
      if (title === 'Home') {
        this.$router.push('/Project/')
      } else {
        this.$router.push('/Project/' + title.replace(/\s+/g, ''))
      }
    },
    changeProject (item) {
      this.$store.commit('chooseProject', item)
    }
  }
}
</script>

<style scoped>
  @import '../node_modules/mdi/css/materialdesignicons.min.css';
  v-navigation-drawer {
    overflow-y: scroll;
  }
</style>
