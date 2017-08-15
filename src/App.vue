<template>
  <v-app>
    <template v-if="!$route.path.match('Project')"> 
      <v-toolbar fixed class="teal lighten-1" dark>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon v-if="isLogin === true" class="hidden-md-and-up">
          {{ name }}
          <v-btn flat @click="logout">Log out</v-btn>
        </v-toolbar-side-icon>
        <v-toolbar-side-icon v-else class="hidden-md-and-up">
          <v-btn flat to="/login">Sign in</v-btn>
          <v-btn flat to="/register">Sign up</v-btn>
        </v-toolbar-side-icon>
        <v-toolbar-items v-if="isLogin === true" class="hidden-sm-and-down">
          {{ name }}
          <v-btn flat @click="logout">Log out</v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-else class="hidden-sm-and-down">
          <v-btn flat to="./login">Sign in</v-btn>
          <v-btn flat to="./register">Sign up</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template> 
    <template v-else>
      <v-navigation-drawer absolute persistent light :mini-variant.sync="mini" v-model="drawer" overflow class="grey lighten-2">
        <v-toolbar flat class="grey lighten-2">
          <v-list class="pa-0 grey lighten-2">
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
        <v-list class="pt-0 grey lighten-2" dense>
          <v-divider></v-divider>
          <v-list-tile @click="generate('Home')">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="generate('DashBoard')">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>DashBoard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-group v-for="list in lists" :value="list.active" v-bind:key="list.title">
            <v-list-tile slot="item">
              <v-list-tile-action>
                <v-icon>{{ list.action }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ list.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>keyboard_arrow_down</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="subItem in list.items" v-bind:key="subItem.title" @click="generate(list.title + '/' + subItem.title)" class="grey lighten-2">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
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
        <router-view v-on:login="login" id="main"></router-view>
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
      lists: [
        {
          action: 'mdi-table-large',
          title: 'Table',
          items: [
            { title: 'Over All' },
            { title: 'Base Game' },
            { title: 'Free Game' }
          ]
        },
        {
          action: 'mdi-chart-bar',
          title: 'Payout Distribution',
          items: [
            { title: 'Over All' },
            { title: 'Base Game' },
            { title: 'Free Game' }
          ]
        },
        {
          action: 'mdi-chart-line',
          title: 'Player Experience',
          items: [
            { title: 'RTP' },
            { title: 'Total Net Win' },
            { title: 'Survival Rate' }
          ]
        }
      ],
      mini: false,
      right: null,
      isLogin: false,
      name: ''
    }
  },
  computed: {
    project: function () {
      return this.$store.state.projectId
    },
    projects: function () {
      return this.$store.state.projects
    }
    // isLogin: function () {
    //   return localStorage.getItem('isLogin')
    // },
    // name: function () {
    //   return localStorage.getItem('name')
    // }
  },
  methods: {
    generate (title) {
      if (title === 'Home') {
        this.$router.push('/Account/')
      } else if (title === 'DashBoard') {
        this.$router.push('/Project/')
      } else {
        this.$router.push('/Project/' + title.replace(/\s+/g, ''))
      }
    },
    changeProject (item) {
      this.$store.commit('chooseProject', item)
    },
    login (name) {
      localStorage.setItem('isLogin', true)
      localStorage.setItem('name', name)
      // this.isLogin
      this.isLogin = localStorage.getItem('isLogin')
      this.name = localStorage.getItem('name')
    },
    logout () {
      localStorage.setItem('isLogin', false)
      localStorage.setItem('name', '')
      this.$router.push('/')
      this.isLogin = localStorage.getItem('isLogin')
      this.name = localStorage.getItem('name')
    }
  }
}
</script>

<style soped>
  @import '../node_modules/mdi/css/materialdesignicons.min.css';

  #main {
    height: 90vh;
    overflow-y: scroll !important;
  }

  #main::-webkit-scrollbar { 
    display: none; 
  }
</style>
