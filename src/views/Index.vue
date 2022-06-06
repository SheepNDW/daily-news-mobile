<script setup>
import HomeHeader from '@/components/HomeHeader.vue'
import { getNewsLatest } from '@/utils/api'
import { ref } from 'vue'

const today = ref('')
const newsList = ref([])
const bannerList = ref([])

getNewsLatest().then((data) => {
  const { date, stories, top_stories } = data
  today.value = date
  newsList.value.push(
    Object.freeze({
      date,
      stories
    })
  )
  bannerList.value = Object.freeze(top_stories)
})
</script>

<template>
  <HomeHeader :time="today" />
  <section class="banner-box">
    <van-swipe v-if="bannerList.length > 0" autoplay="3000" lazy-render>
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <router-link :to="`/detail/${item.id}`" class="banner-box__content">
          <img :src="item.image" alt="banner" class="banner-box__image" />
          <div class="banner-box__mark">
            <h3 class="banner-box__title">{{ item.title }}</h3>
            <span class="banner-box__tip">{{ item.hint }}</span>
          </div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </section>
</template>

<style lang="scss" scoped>
.banner-box {
  box-sizing: border-box;
  height: 375px;
  background-color: #d5d5d5;

  .van-swipe {
    height: 100%;
    background-color: #fff;

    :deep(.van-swipe__indicators) {
      left: auto;
      right: 15px;
      transform: none;

      .van-swipe__indicator--active {
        width: 15px;
        border-radius: 3px;
        background-color: #fff;
      }
    }
  }

  &__content {
    position: relative;
    display: block;
    height: 100%;
    color: #fff;
  }

  &__image {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__mark {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 110px;
    padding: 10px 20px;
    box-sizing: border-box;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.5)
    );
  }

  &__title {
    padding-top: 10px;
    max-height: 50px;
    font-size: 20px;
    line-height: 25px;

    // 文字溢出 (2行)
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  &__tip {
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
