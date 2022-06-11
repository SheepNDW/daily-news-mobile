<script setup>
import Navbar from '@/components/Navbar.vue'
import { useStore } from '@/store'
import { getPhoneCode, login } from '@/utils/api'
import { Toast } from 'vant'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const regPhone = /^1\d{10}$/
const regCode = /^\d{6}$/

const loginForm = reactive({
  phone: '',
  code: ''
})
const formRef = ref(null)

const isEnable = ref(true)
const countDown = ref('30s')
const sendCode = async () => {
  try {
    await formRef.value.validate('phone')
    const { code } = await getPhoneCode(loginForm.phone)
    if (code !== 0) return Toast('當前網路異常，請稍後再試')

    // 開啟計時器
    isEnable.value = false
    countDown.value = '30s'
    let n = 30
    let timer = setInterval(() => {
      n--
      if (n <= 0) {
        clearInterval(timer)
        isEnable.value = true
      }
      countDown.value = `${n}s`
    }, 1000)
  } catch (err) {}
}

const store = useStore()
const route = useRoute()
const router = useRouter()
const onSubmit = async () => {
  const { code, token } = await login(loginForm.phone, loginForm.code)
  if (code !== 0) {
    Toast('登入失敗')
    formRef.value.resetValidation()
    loginForm.code = ''
    return
  }

  localStorage.setItem('dailyNewsToken', token)
  store.changeIsLogin()
  store.changeInfo().then(() => {
    Toast.success('登入成功!')
    store.storeList = null

    // 跳轉至指定位置
    const from = route.query.from
    if (from) return router.replace(`/${from}`)
    router.replace('/person')
  })
}
</script>

<template>
  <div class="container">
    <Navbar />
    <van-form ref="formRef" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="loginForm.phone"
          center
          label="手機號"
          label-width="50px"
          name="phone"
          :rules="[
            { required: true, message: '手機號碼為必填!' },
            { pattern: regPhone, message: '手機格式不正確!' }
          ]"
        >
          <template #button>
            <van-button
              class="form-btn"
              size="small"
              :type="isEnable ? 'primary' : 'default'"
              :disabled="!isEnable"
              @click="sendCode"
            >
              {{ isEnable ? '發送驗證碼' : countDown }}
            </van-button>
          </template>
        </van-field>
        <van-field
          v-model="loginForm.code"
          label="驗證碼"
          label-width="50px"
          name="code"
          :rules="[
            { required: true, message: '驗證碼為必填!' },
            { pattern: regCode, message: '驗證碼格式不正確!' }
          ]"
        />
      </van-cell-group>
      <div style="margin: 20px 40px">
        <van-button round block type="primary" native-type="submit">
          立即登入 / 註冊
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
.van-form {
  margin-top: 30px;
  box-sizing: border-box;

  .form-btn {
    width: 78px;
  }
}

.container {
  height: 100vh;
  background-color: #fff;
}
</style>
