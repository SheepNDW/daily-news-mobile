<script setup>
import Navbar from '@/components/Navbar.vue'
import { useStore } from '@/store'
import { updateUser } from '@/utils/api'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { ref } from 'vue'

const store = useStore()
const router = useRouter()

const { info } = storeToRefs(store)

const isLoading = ref(false)
const username = ref(info.value.name)
const userPic = ref([])

const onSubmit = async () => {
  if (isLoading.value) return
  isLoading.value = true
  // 格式驗證
  const reg = /^[\w\u4E00-\u9FFF]+$/
  if (!reg.test(username.value)) return Toast('用戶名格式不正確')
  if (userPic.value.length === 0) return Toast('請上傳一張圖片')

  // 提交給後台
  const { code, data } = await updateUser(username.value, userPic.value[0].file)
  isLoading.value = false
  if (code !== 0) return Toast('修改失敗 請稍後再試')
  Toast.success('修改成功')
  store.info = data
  router.replace('/person')
}
</script>

<template>
  <div class="container">
    <Navbar />
    <div class="form-box">
      <van-cell-group inset>
        <van-field v-model="username" label="用戶名" label-width="60px" />
        <van-field label="用戶頭像" label-width="60px">
          <template #input>
            <van-uploader v-model="userPic" max-count="1" />
          </template>
        </van-field>
      </van-cell-group>

      <div style="margin: 20px 40px">
        <van-button
          round
          block
          type="primary"
          @click="onSubmit"
          :loading="isLoading"
          loading-text="處理中..."
        >
          修改資料
        </van-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: #fff;
}

.form-box {
  margin-top: 30px;
}
</style>
