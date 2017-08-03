import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import RTP from '@/components/RTP'
import TotalNetWin from '@/components/TotalNetWin'
import SurvivalRate from '@/components/SurvivalRate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/RTP',
      name: 'RTP',
      component: RTP
    },
    {
      path: '/TotalNetWin',
      name: 'TotalNetWin',
      component: TotalNetWin
    },
    {
      path: '/SurvivalRate',
      name: 'SurvivalRate',
      component: SurvivalRate
    }
  ]
})
