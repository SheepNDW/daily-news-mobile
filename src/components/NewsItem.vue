<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="news-item">
    <router-link :to="`/detail/${data.id}`">
      <div class="news-item__img-box">
        <img
          v-if="data.images?.length > 0"
          v-lazy="data.images[0]"
          alt="news image"
        />
      </div>
      <h4 class="news-item__title">{{ data.title }}</h4>
      <p class="news-item__desc">{{ data.hint }}</p>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.news-item {
  position: relative;
  padding: 15px 0;
  height: 95px;
  overflow: hidden;
  box-sizing: border-box;

  a {
    display: block;
  }

  &__img-box {
    position: absolute;
    top: 15px;
    right: 0;
    width: 65px;
    height: 65px;
    background-color: #d5d5d5;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  &__title {
    margin-right: 75px;
    max-height: 50px;
    line-height: 25px;
    font-size: 16px;
    color: #000;
    overflow: hidden;
  }

  &__desc {
    margin-right: 75px;
    font-size: 12px;
    line-height: 15px;
    color: #999;
  }
}
</style>
