import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/StartPage'
import MainPage from '@/components/MainPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage
    },
    {
      path: '/Project',
      name: 'MainPage',
      component: MainPage
    }
  ]
})
