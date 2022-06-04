import { createRouter, createWebHashHistory } from 'vue-router'

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

export default router
