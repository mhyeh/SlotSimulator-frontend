import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import RTP from '@/components/RTP'
import TotalNetWin from '@/components/TotalNetWin'
import SurvivalRate from '@/components/SurvivalRate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
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
