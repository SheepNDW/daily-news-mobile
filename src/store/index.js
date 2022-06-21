import { defineStore } from 'pinia'
import { checkLogin, getStoreNews, getUserInfo } from '@/utils/api'

export const useStore = defineStore('main', {
  state: () => ({
    isLogin: null,
    info: null,
    storeList: null
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
    },
    async changeStoreList() {
      let { code, data } = await getStoreNews()
      if (code !== 0) data = []
      this.storeList = data
    },
    removeStoreItem(id) {
      if (this.storeList === null) return
      this.storeList = this.storeList.filter((item) => item.id !== id)
    }
  }
})
