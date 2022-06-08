import { defineStore } from 'pinia'
import { checkLogin, getUserInfo } from '@/utils/api'

export const useStore = defineStore('main', {
  state: () => ({
    isLogin: null,
    info: null
  }),
  actions: {
    async changeIsLogin() {
      let bool = false
      const { code } = await checkLogin()
      if (code === 0) bool = true
      this.isLogin = bool
    },
    async changeInfo() {
      const { code, data } = await getUserInfo()
      if (code === 0) this.info = data
    }
  }
})
