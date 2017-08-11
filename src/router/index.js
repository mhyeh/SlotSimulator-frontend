import Vue from 'vue'
import Router from 'vue-router'

import StartPage   from '@/Pages/StartPage'

import Login    from '@/Pages/Login'
import Register from '@/Pages/Register'

import ProjectPage from '@/Pages/ProjectPage'

import OverAllTable from      '@/Pages/project/OverAllTable'
import BaseGameTable from     '@/Pages/project/BaseGameTable'
import FreeGameTable from     '@/Pages/project/FreeGameTable'
import Project from      '@/Pages/project/Project'
import Home from         '@/Pages/project/Home'
import OverAll from      '@/Pages/project/OverAll'
import BaseGame from     '@/Pages/project/BaseGame'
import FreeGame from     '@/Pages/project/FreeGame'
import RTP from          '@/Pages/project/RTP'
import TotalNetWin from  '@/Pages/project/TotalNetWin'
import SurvivalRate from '@/Pages/project/SurvivalRate'

Vue.use(Router)

const router = new Router({
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
      component: ProjectPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/Project',
      component: Project,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        },
        {
          path: 'Table/OverAll',
          name: 'OverAllTable',
          component: OverAllTable
        },
        {
          path: 'Table/BaseGame',
          name: 'BaseGameTable',
          component: BaseGameTable
        },
        {
          path: 'Table/FreeGame',
          name: 'FreeGameTable',
          component: FreeGameTable
        },
        {
          path: 'PayoutDistribution/OverAll',
          name: 'OverAll',
          component: OverAll
        },
        {
          path: 'PayoutDistribution/BaseGame',
          name: 'BaseGame',
          component: BaseGame
        },
        {
          path: 'PayoutDistribution/FreeGame',
          name: 'FreeGame',
          component: FreeGame
        },
        {
          path: 'PlayerExperience/RTP',
          name: 'RTP',
          component: RTP
        },
        {
          path: 'PlayerExperience/TotalNetWin',
          name: 'TotalNetWin',
          component: TotalNetWin
        },
        {
          path: 'PlayerExperience/SurvivalRate',
          name: 'SurvivalRate',
          component: SurvivalRate
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (router.app.$store === undefined || !router.app.$store.state.login) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
