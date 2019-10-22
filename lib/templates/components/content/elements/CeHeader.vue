<template>
  <div v-if="headerLayout !== 100" :class="headerCss" class="ce-header">
    <component
      :is="`h${headerLevel}`"
      v-if="headerLayout >= 0 && headerLayout !== 100"
      :class="headerPosition"
    >
      <nav-link v-if="headerLink" :to="headerLink.url">
        {{ header }}
      </nav-link>
      <template v-else>{{ header }}</template>
    </component>
    <component :is="`h${headerLevel + 1}`" v-if="subheader">
      {{ subheader }}
    </component>
  </div>
</template>

<script>
import baseCe from '../mixins/baseCe'
export default {
  extends: baseCe,
  computed: {
    headerLevel() {
      // by defualt if type is 0, set h1
      return this.headerLayout === 0 ? 1 : this.headerLayout
    },
    headerCss() {
      return this.headerPosition ? `ce-header--${this.headerPosition}` : ''
    }
  }
}
</script>
