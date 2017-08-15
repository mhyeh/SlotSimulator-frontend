import Vue from 'vue'
import Router from 'vue-router'

import StartPage   from '@/pages/StartPage'

import Login    from '@/pages/Login'
import Register from '@/pages/Register'

import ProjectPage from '@/pages/ProjectPage'

import OverAllTable from      '@/pages/project/OverAllTable'
import BaseGameTable from     '@/pages/project/BaseGameTable'
import FreeGameTable from     '@/pages/project/FreeGameTable'
import Project from      '@/pages/project/Project'
import Home from         '@/pages/project/Home'
import OverAll from      '@/pages/project/OverAll'
import BaseGame from     '@/pages/project/BaseGame'
import FreeGame from     '@/pages/project/FreeGame'
import RTP from          '@/pages/project/RTP'
import TotalNetWin from  '@/pages/project/TotalNetWin'
import SurvivalRate from '@/pages/project/SurvivalRate'

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
          path: 'ParSheet/OverAll',
          name: 'OverAllTable',
          component: OverAllTable
        },
        {
          path: 'ParSheet/BaseGame',
          name: 'BaseGameTable',
          component: BaseGameTable
        },
        {
          path: 'ParSheet/BonusGame',
          name: 'FreeGameTable',
          component: FreeGameTable
        },
        {
          path: 'WinsDistribution/OverAll',
          name: 'OverAll',
          component: OverAll
        },
        {
          path: 'WinsDistribution/BaseGame',
          name: 'BaseGame',
          component: BaseGame
        },
        {
          path: 'WinsDistribution/BonusGame',
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
