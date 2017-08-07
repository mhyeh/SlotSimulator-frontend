import Vue from 'vue'
import Router from 'vue-router'

import StartPage   from '@/Pages/StartPage'

import Login    from '@/components/Login'
import Register from '@/components/Register'

import ProjectPage from '@/Pages/ProjectPage'
import MainPage    from '@/Pages/MainPage'

import Home from         '@/components/Home'
import RTP from          '@/components/RTP'
import TotalNetWin from  '@/components/TotalNetWin'
import SurvivalRate from '@/components/SurvivalRate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Account',
      name: 'ProjectPage',
      component: ProjectPage
    },
    {
      path: '/Project',
      name: 'MainPage',
      component: MainPage,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        },
        {
          path: 'RTP',
          name: 'RTP',
          component: RTP
        },
        {
          path: 'TotalNetWin',
          name: 'TotalNetWin',
          component: TotalNetWin
        },
        {
          path: 'SurvivalRate',
          name: 'SurvivalRate',
          component: SurvivalRate
        }
      ]
    }
  ]
})
