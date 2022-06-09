<script setup>
import Navbar from '@/components/Navbar.vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { computed } from 'vue'

const router = useRouter()
const store = useStore()

const userInfo = computed(() => {
  if (store.isLogin && store.info) return store.info
  return null
})

const signOut = () => {
  Toast('已登出')
  localStorage.removeItem('dailyNewsToken')
  store.isLogin = null
  store.info = null
  router.push('/')
}
</script>

<template>
  <div class="container">
    <Navbar />
    <div class="base-info" v-if="userInfo">
      <img
        :src="userInfo.pic"
        alt="avatar"
        @click="$router.push('/updatePerson')"
      />
      <p>{{ userInfo.name }}</p>
    </div>
    <van-cell-group>
      <van-cell title="我的收藏" is-link url="#/store" />
      <van-cell title="退出登入" @click="signOut" />
    </van-cell-group>
  </div>
</template>

<style lang="scss" scoped>
.base-info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  margin: 20px 0;

  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-bottom: 24px;
  }

  p {
    font-size: 20px;
    font-weight: 700;
  }
}

.container {
  height: 100vh;
  background-color: #fff;
}
</style>
