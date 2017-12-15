<template>
  <v-app>
    <template v-if="!$route.path.match('Project')"> 
      <v-toolbar class="teal lighten-1" dark>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        {{ name }}
        <v-toolbar-items v-if="name !== ''" class="hidden-sm-and-down">
          
          <v-btn flat @click="logout">Log out</v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-else class="hidden-sm-and-down">
          <v-btn flat to="/login">Sign in</v-btn>
          <v-btn flat to="/register">Sign up</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template> 
    <template v-else>
      <v-navigation-drawer app absolute light  v-model="drawer" overflow class="grey lighten-2">
        <v-toolbar flat class="grey lighten-2">
          <v-list class="pa-0 grey lighten-2">
            <v-list-tile avatar tag="div">
              <v-list-tile-avatar>
                <v-icon>mdi-drawing grey lighten-2 blue--text</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Chart Generator</v-list-tile-title>
              </v-list-tile-content>
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
      <v-toolbar app class="teal lighten-1" dark>
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
        <v-menu right>
          <v-btn icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="item in settings" :key="item.title" @click="generate(item.title)">
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
    </template>
    
    <main>
      <v-content v-if="$route.path.match('Project')">
        <v-container fluid>
          <router-view v-on:login="login" v-on:logout="logout" id="main"></router-view>
        </v-container>
      </v-content>
      <v-container v-else fluid>
        <router-view v-on:login="login" v-on:logout="logout" v-on:getOthersInfoPageLink="getOthersInfoPageLink" id="main"></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import api from './store/api'

export default {
  name: 'app',
  data () {
    return {
      title: 'SlotsMaster',
      drawer: true,
      lists: [
        {
          action: 'mdi-table-large',
          title: 'PAR Sheet',
          items: [
            { title: 'Over All' },
            { title: 'Base Game' },
            { title: 'Bonus Game' }
          ]
        },
        {
          action: 'mdi-chart-line',
          title: 'Wins Distribution',
          items: [
            { title: 'Over All' },
            { title: 'Base Game' },
            { title: 'Bonus Game' }
          ]
        },
        {
          action: 'mdi-chart-bar',
          title: 'Player Experience',
          items: [
            { title: 'RTP' },
            { title: 'Total Net Win' },
            { title: 'Survival Rate' }
          ]
        }
      ],
      settings: [
        { title: 'Project Setting' },
        { title: 'Delete Project' }
      ],
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
  },
  methods: {
    getOthersInfoPageLink () {
      let self = this
      while (self.lists.length > 3) {
        self.lists.pop()
      }
      api.getConfig(localStorage.getItem('token'), self.$store.state.projectId.id).then(res => {
        let pages = res.data.pages
        let items = []
        for (let i of pages) {
          items.push({ title: i.title })
        }
        self.lists.push({
          action: 'mdi-chevron-down',
          title: 'OthersInfo',
          items: items
        })
      })
    },
    generate (title) {
      let self = this
      if (title === 'Delete Project') {
        api.deleteProject(localStorage.getItem('token'), self.$store.state.projectId.id).then(() => {
          self.$router.push('/Account/')
        })
      } else if (title === 'Home') {
        self.$router.push('/Account/')
      } else if (title === 'DashBoard') {
        self.$router.push('/Project/')
      } else {
        self.$router.push('/Project/' + title.replace(/\s+/g, ''))
      }
    },
    changeProject (item) {
      this.$store.commit('chooseProject', item)
      this.$router.push('/Project/')
    },
    login () {
      let self = this
      api.getUserInfo(localStorage.getItem('token')).then(res => {
        self.name = res.data.name
        self.$router.push('/Account')
      }).catch(error => {
        console.log(error.response.data)
      })
    },
    logout () {
      this.name = ''
      localStorage.setItem('token', '')
      this.$router.push('/login')
    }
  },
  beforeMount () {
    let self = this
    let token = ((localStorage.getItem('token') !== undefined) ? localStorage.getItem('token') : '')
    api.getUserInfo(token).then(res => {
      self.name = res.data.name
      self.$router.push('/Account')
    }).catch(error => {
      console.log(error.response.data)
      localStorage.setItem('token', '')
    })
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
