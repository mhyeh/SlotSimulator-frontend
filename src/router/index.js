import Vue from 'vue'
import Router from 'vue-router'
import LineChart from '@/components/LineChart'
import FileInput from '@/components/FileInput'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FileReader',
      component: FileInput
    },
    {
      path: '/lineChart',
      name: 'lineChart',
      component: LineChart
    }
  ]
})
