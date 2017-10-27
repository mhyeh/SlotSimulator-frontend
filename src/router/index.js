import Vue from 'vue'
import Router from 'vue-router'

import StartPage   from '@/pages/StartPage'

import Login    from '@/pages/Login'
import Register from '@/pages/Register'

import ProjectPage from '@/pages/ProjectPage'

import ParSheet from       '@/pages/project/ParSheet'
import Project from        '@/pages/project/Project'
import Home from           '@/pages/project/Home'
import Distribution from   '@/pages/project/Distribution'
import RTP from            '@/pages/project/RTP'
import TotalNetWin from    '@/pages/project/TotalNetWin'
import SurvivalRate from   '@/pages/project/SurvivalRate'
import ProjectSetting from '@/pages/project/ProjectSetting'
import UploadFile from     '@/pages/project/UploadFile'
import OthersInfo from     '@/pages/project/OthersInfo'

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
      component: ProjectPage
    },
    {
      path: '/Project',
      component: Project,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        },
        {
          path: 'ParSheet/OverAll',
          name: 'OverAllTable',
          component: ParSheet,
          props: {table: 'overall', title: 'Over All'}
        },
        {
          path: 'ParSheet/BaseGame',
          name: 'BaseGameTable',
          component: ParSheet,
          props: {table: 'base', title: 'Base Game'}
        },
        {
          path: 'ParSheet/BonusGame',
          name: 'FreeGameTable',
          component: ParSheet,
          props: {table: 'bonus', title: 'Bonus Game'}
        },
        {
          path: 'WinsDistribution/OverAll',
          name: 'OverAll',
          component: Distribution,
          props: {type: 'overall', title: 'Over All'}
        },
        {
          path: 'WinsDistribution/BaseGame',
          name: 'BaseGame',
          component: Distribution,
          props: {type: 'basegame', title: 'Base Game'}
        },
        {
          path: 'WinsDistribution/BonusGame',
          name: 'FreeGame',
          component: Distribution,
          props: {type: 'freegame', title: 'Bonus Game'}
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
        },
        {
          path: 'ProjectSetting',
          name: 'ProjectSetting',
          component: ProjectSetting
        },
        {
          path: 'UploadFile',
          name: 'UploadFile',
          component: UploadFile
        },
        {
          path: 'OthersInfo/:name',
          name: 'OthersInfo',
          component: OthersInfo
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
