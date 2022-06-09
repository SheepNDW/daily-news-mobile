<script setup>
import { computed, onBeforeMount } from 'vue'
import { useStore } from '@/store'
import { formatTime } from '@/assets/utils'
import timg from '@/assets/images/timg.jpg'

const props = defineProps({
  time: {
    type: String,
    default: ''
  }
})

const store = useStore()
onBeforeMount(() => {
  if (store.isLogin === null) store.changeIsLogin()
  if (store.info === null) store.changeInfo()
})

const pic = computed(() => {
  if (store.isLogin) return store.info?.pic || timg
  return timg
})

const currTime = computed(() => {
  const time = props.time || null
  const [month, day] = formatTime(time, '{1}-{2}').split('-')
  const area = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月'
  ]

  return {
    month: area[month - 1],
    day
  }
})
</script>

<template>
  <header class="header-box">
    <div class="header-box__left">
      <div class="header-box__time">
        <span>{{ currTime.day }}</span>
        <span>{{ currTime.month }}</span>
      </div>
      <h1 class="header-box__title">知乎日報</h1>
    </div>
    <RouterLink to="/person" class="header-box__link-btn">
      <img :src="pic" alt="user avatar" />
    </RouterLink>
  </header>
</template>

<style lang="scss" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;

  &__left {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  &__time {
    padding-right: 15px;
    border-right: 1px solid #ddd;

    span {
      display: block;
      height: 20px;
      line-height: 20px;
      font-size: 20px;
      text-align: center;

      &:nth-child(2) {
        height: 15px;
        line-height: 15px;
        font-size: 12px;
      }
    }
  }

  &__title {
    padding-left: 10px;
    font-size: 22px;
  }

  &__link-btn {
    box-sizing: border-box;
    width: 30px;
    height: 30px;

    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>
