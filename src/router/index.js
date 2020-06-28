import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Logup from '../components/Logup.vue'
import Changekey from '../components/Changekey.vue' ///
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import addsensor from '../components/SensorAdd.vue'
import analysissensor from '../components/SensorAnalysis.vue' ///
import analysisgateway from '../components/GatewayAnalysis.vue' ///
import addgateway from '../components/GatewayAdd.vue' ///
import UpdateSensor from '../components/SensorUpdate.vue' ///
import UpdateGateway from '../components/GatewayUpdate.vue' ///
import Info from '../components/Info.vue'
import SensorView from '../components/SensorView.vue'
import GatewayView from '../components/GatewayView.vue'
import DataCollectorView from '../components/DataCollectorView.vue' ///
import SensorDetail from '../components/SensorDetail.vue'
import GatewayDetail from '../components/GatewayDetail.vue'
import CompanyDetail from '../components/Company.vue'
import Solution from '../components/Solution.vue'
import GSolution from '../components/GSolution.vue'
import SolutionAll from '../components/SolutionAll.vue'
import GSolutionAll from '../components/GSolutionAll.vue'
import Search from '../components/Search.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  { path: '/logup', component: Logup },
  { path: '/changekey', component: Changekey }, ///
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/list/sensor', component: SensorView }, // 传感器列表
      { path: '/list/gateway', component: GatewayView }, // 网关列表
      { path: '/list/datacollector', component: DataCollectorView }, ///
      { path: '/sensor/:id', name: 'sensor', component: SensorDetail }, // 传感器详细信息
      { path: '/gateway/:id', name: 'gateway', component: GatewayDetail }, // 网关详细信息
      { path: '/company/:companyName', name: 'company', component: CompanyDetail },
      { path: '/analysissensor', component: analysissensor }, ///
      { path: '/analysisgateway', component: analysisgateway }, ///
      { path: '/addsensor', component: addsensor },
      { path: '/addgateway', component: addgateway }, ///
      { path: '/updatesensor/:id', name: 'updateSensor', component: UpdateSensor }, ///
      { path: '/updategateway/:id', name: 'updateGateway', component: UpdateGateway }, ///
      { path: '/info', component: Info },
      { path: '/solution/:id', name: 'solution', component: Solution },
      { path: '/Gsolution/:id', name: 'Gsolution', component: GSolution },
      { path: '/solutionAll/:id', name: 'solutionAll', component: SolutionAll },
      { path: '/GsolutionAll/:id', name: 'GsolutionAll', component: GSolutionAll },
      { path: '/search/:word', name: 'search', component: Search }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next() // next 即放行
  if (to.path === '/logup') return next() // next 即放行
  if (to.path === '/changekey') return next() // next 即放行  ///
  const tokenStr = window.sessionStorage.getItem('username')
  if ((!tokenStr)) return next('login')
  next()
})

export default router
