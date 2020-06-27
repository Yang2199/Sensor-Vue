import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Logup from '../components/Logup.vue'
import Findkey from '../components/Findkey.vue' ///
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import addsensor from '../components/SensorAdd.vue'
import addgateway from '../components/GatewayAdd.vue' ///
import UpdateSensor from '../components/SensorUpdate.vue' ///
import UpdateGateway from '../components/GatewayUpdate.vue' ///
import Info from '../components/Info.vue'
import SensorView from '../components/SensorView.vue'
import GatewayView from '../components/GatewayView.vue'
import SensorDetail from '../components/SensorDetail.vue'
import GatewayDetail from '../components/GatewayDetail.vue'
import CompanyDetail from '../components/Company.vue'
import Solution from '../components/Solution.vue'
import SolutionAll from '../components/SolutionAll.vue'
import Search from '../components/Search.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  { path: '/logup', component: Logup },
  { path: '/findkey', component: Findkey }, ///
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/list/sensor', component: SensorView }, // 传感器列表
      { path: '/list/gateway', component: GatewayView }, // 网关列表
      { path: '/sensor/:id', name: 'sensor', component: SensorDetail }, // 传感器详细信息
      { path: '/gateway/:id', name: 'gateway', component: GatewayDetail }, // 网关详细信息
      { path: '/company/:companyName', name: 'company', component: CompanyDetail },
      { path: '/addsensor', component: addsensor },
      { path: '/addgateway', component: addgateway }, ///
      { path: '/updatesensor/:id', name: 'updateSensor', component: UpdateSensor }, ///
      { path: '/updategateway/:id', name: 'updateGateway', component: UpdateGateway }, ///
      { path: '/info', component: Info },
      { path: '/solution/:id', name: 'solution', component: Solution },
      { path: '/solutionAll/:id', name: 'solutionAll', component: SolutionAll },
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
  if (to.path === '/findkey') return next() // next 即放行  ///
  const tokenStr = window.sessionStorage.getItem('username')
  if ((!tokenStr)) return next('login')
  next()
})

export default router
