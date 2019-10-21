<template>
  <div class="container">
    <nav>
      <nuxt-link
        v-for="(item, key) in $store.state.typo3.initial.navigation"
        :key="key"
        :to="item.link"
      >
        {{ item.title }}
      </nuxt-link>
    </nav>
    <lang-switcher />
    <nuxt />
  </div>
</template>
<script>
export default {}
</script>
<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  margin: 0;
}

.container {
  max-width: 1230px;
  margin: 0 auto;
}
</style>
