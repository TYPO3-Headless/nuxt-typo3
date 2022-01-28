<template>
  <div class="container">
    <nav v-if="navMain">
      <nuxt-link v-if="navMain.link" :to="navMain.link">
        {{ navMain.title }}
      </nuxt-link>
      <template v-if="navMain.children">
        <nuxt-link
          v-for="(item, key) in navMain.children"
          :key="key"
          :to="item.link"
        >
          {{ item.title }}
        </nuxt-link>
      </template>
      <t3-lang-switcher />
    </nav>

    <nuxt />
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Default',
  computed: {
    ...mapState('typo3', {
      navMain: state => state.initial?.navigation?.[0] // get first typo3 instance from root tree
    })
  }
}
</script>
<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  margin: 0;
}

nav {
  margin: 20px 0;
}

.container {
  max-width: 1230px;
  margin: 0 auto;
}
</style>
