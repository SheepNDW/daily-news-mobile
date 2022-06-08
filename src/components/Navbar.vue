<script setup>
import { useRouter } from 'vue-router'

defineProps({
  title: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const goBack = () => {
  router.back()
}
</script>

<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="goBack"
  />
</template>

<style lang="scss" scoped>
:deep(.van-icon),
:deep(.van-nav-bar__text) {
  color: #000;
}
</style>
