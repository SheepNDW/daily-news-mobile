<script setup>
import { getNewsCommentsById, getNewsDetailById } from '@/utils/api'
import { onBeforeUnmount, onUpdated, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const { newsComments, newsPopularity, newsInfo, getNewsDetail } =
  useNewsDetail()

getNewsDetail()

const handleGoBack = () => {
  router.back()
}

onUpdated(() => {
  const imgPlaceHolder = document.querySelector('.img-place-holder')
  if (imgPlaceHolder?.innerHTML.trim() === '') {
    imgPlaceHolder.innerHTML += `<img src="${newsInfo.value.image}" alt="news image" />`
  }

  const questionTitle = document.querySelector('.question-title')
  if (questionTitle?.innerHTML.trim() === '') {
    questionTitle.innerHTML += newsInfo.value.title
  }
})

// 離開頁面時清除樣式
onBeforeUnmount(() => {
  const link = document.getElementById('link')
  if (!link) return
  document.head.removeChild(link)
})

function useNewsDetail() {
  const newsComments = ref(0)
  const newsPopularity = ref(0)
  const newsInfo = ref(null)

  const getNewsDetail = async () => {
    const id = route.params.id
    const data = await getNewsDetailById(id)
    newsInfo.value = data
    // 動態創建 CSS
    const link = document.createElement('link')
    link.id = 'link'
    link.rel = 'stylesheet'
    link.href = newsInfo.value.css[0]
    document.head.appendChild(link)

    const { comments, popularity } = await getNewsCommentsById(id)
    newsComments.value = comments
    newsPopularity.value = popularity
  }

  return {
    newsComments,
    newsPopularity,
    newsInfo,
    getNewsDetail
  }
}
</script>

<template>
  <van-skeleton title :row="5" v-if="newsInfo === null" />
  <div class="content" v-html="newsInfo.body" v-else></div>
  <div class="nav-box">
    <van-icon name="arrow-left" @click="handleGoBack" />
    <van-icon name="comment-o" :badge="newsComments" />
    <van-icon name="good-job-o" :badge="newsPopularity" />
    <van-icon name="star-o" color="#1989fa" />
    <van-icon name="share-o" color="#ccc" />
  </div>
</template>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  padding-bottom: 50px;
  margin-top: 0;

  :deep(.img-place-holder) {
    height: 375px;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      min-height: 100%;
      margin: 0;
    }
  }

  :deep(.meta) {
    .avatar {
      margin: 0;
    }

    .originUrl {
      display: block;
    }
  }
}

.van-skeleton {
  padding: 30px 15px;
}

.nav-box {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 15px;
  background-color: #f4f4f4;

  .van-icon:first-child {
    position: relative;
    &::after {
      position: absolute;
      top: -10%;
      right: -15px;
      content: '';
      width: 1px;
      height: 120%;
      background-color: #d5d5d5;
    }
  }

  :deep(.van-badge) {
    background-color: transparent;
    border: none;
    color: #000;
    right: -5px;
  }
}
</style>
