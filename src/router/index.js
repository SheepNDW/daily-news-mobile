import { createRouter, createWebHashHistory } from 'vue-router'
import { useStore } from '@/store/index'
import { checkLogin } from '@/utils/api'
import { Toast } from 'vant'

const Index = () => import('@/views/Index.vue')
const Detail = () => import('@/views/Detail.vue')
const Login = () => import('@/views/Login.vue')
const Person = () => import('@/views/Person.vue')
const UpdatePerson = () => import('@/views/UpdatePerson.vue')
const Store = () => import('@/views/Store.vue')

const routes = [
  { path: '/', component: Index },
  { path: '/detail/:id', component: Detail },
  { path: '/login', component: Login },
  { path: '/person', component: Person },
  { path: '/updatePerson', component: UpdatePerson },
  { path: '/store', component: Store },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to) => {
  const arr = ['/person', '/updatePerson', '/store']
  const store = useStore()

  if (arr.includes(to.path)) {
    const isLogin = store.isLogin
    if (isLogin) return
    if (isLogin === false) {
      Toast('請先登入！')
      return '/login'
    }
    if (isLogin === null) {
      try {
        const { code, data } = await checkLogin()
        if (code !== 0) {
          Toast('請先登入！')
          return '/login'
        }
        store.info = data
        store.isLogin = true
      } catch (err) {
        return false
      }
    }
  }
})

export default router
