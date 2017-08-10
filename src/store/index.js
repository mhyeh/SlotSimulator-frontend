import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    token: '',
    projectId: {},
    projects: []
  },

  getters: {
    getChoose: state => () => state.projectId
  },

  actions: { },

  mutations: {
    login (state, token) {
      state.login = true
      state.token = token
    },
    setProject (state, projects) {
      state.projects = projects
    },
    chooseProject (state, item) {
      state.projectId = item
    }
  }
})
