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
    <RouterLink :to="`/detail/${data.id}`" class="news-item__link">
      <div class="news-item__text-box">
        <h4 class="news-item__title">{{ data.title }}</h4>
        <p class="news-item__desc">{{ data.hint }}</p>
      </div>
      <div class="news-item__img-box">
        <img
          v-if="data?.images.length > 0"
          v-lazy="data.images[0]"
          alt="news cover"
        />
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.news-item {
  box-sizing: border-box;
  height: 70px;

  &__link {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  &__text-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 250px;
  }

  &__title {
    font-size: 20px;
    color: #000;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  &__desc {
    font-size: 12px;
    color: #999;
  }

  &__img-box {
    height: 100%;

    img {
      height: 100%;
      width: 100%;
      background: #f4f4f4;
    }
  }
}
</style>
