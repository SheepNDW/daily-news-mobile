<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="Index">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<style lang="scss">
html,
body {
  min-height: 100%;
  overflow-x: hidden;
  background: #f4f4f4;
}

#app {
  margin: 0 auto;
  background: #fff;
}
</style>
