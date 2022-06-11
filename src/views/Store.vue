<script setup>
import Navbar from '@/components/Navbar.vue'
import StoreItem from '@/components/StoreItem.vue'
import { useStore } from '@/store'
import { removeStoreNews } from '@/utils/api'
import { Toast } from 'vant'
import { computed, onBeforeMount } from 'vue'

const store = useStore()
const storeList = computed(() => store.storeList ?? [])

onBeforeMount(() => {
  if (store.storeList === null) store.changeStoreList()
})

const removeNews = async (id) => {
  const { code } = await removeStoreNews(id)
  if (code !== 0) return Toast('刪除失敗 請再試一次')
  Toast.success('刪除成功')
  store.removeStoreItem(id)
}
</script>

<template>
  <div class="container">
    <Navbar title="收藏列表" />
    <van-empty description="暫無收藏" v-if="storeList.length === 0" />
    <template v-else>
      <van-swipe-cell v-for="item in storeList" :key="item.id">
        <div class="content">
          <StoreItem
            :data="{ ...item.news, images: [item.news.image], hint: '' }"
          />
        </div>
        <template #right>
          <van-button
            square
            type="danger"
            text="刪除"
            class="delete-btn"
            @click="removeNews(item.id)"
          />
        </template>
      </van-swipe-cell>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: #fff;
}

.content {
  padding: 0 15px;
}

.delete-btn {
  height: 100%;
}

:deep(.van-swipe-cell__wrapper) {
  margin-top: 20px;
}
</style>
