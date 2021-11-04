<template>
  <div>
    <ul class="lang-switcher">
      <li v-for="(locale, index) in available" :key="index">
        <nuxt-link :to="locale.link">
          {{ locale.title }}
        </nuxt-link>
      </li>
    </ul>
    Current locale: {{ current }}
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'T3NavLink',
  computed: {
    ...mapState({
      current: state => state.typo3.locale,
      available: state => state.typo3.initial.i18n
    })
  }
}
</script>
<style>
.lang-switcher {
  margin: 10px 0;
  padding: 0;
}
.lang-switcher li {
  display: inline-block;
  margin-right: 10px;
}
</style>
