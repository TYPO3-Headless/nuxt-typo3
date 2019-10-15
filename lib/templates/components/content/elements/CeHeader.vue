<template>
  <div class="ce-header">
    <component
      :is="headerLevel"
      v-if="headerLayout >= 0 && headerLayout !== 100"
      :class="headerPosition"
    >
      <nuxt-link v-if="headerLink" :to="headerLink">
        {{ props.header }}
      </nuxt-link>
      <span v-else>{{ header }}</span>
    </component>
    <p v-if="subheader">
      {{ subheader }}
    </p>
  </div>
</template>

<script>
import baseCe from '../mixins/baseCe'
export default {
  extends: baseCe,
  computed: {
    headerLevel() {
      // by defualt if type is 0, set h1
      return `h${this.headerLayout === 0 ? 1 : this.headerLayout}`
    }
  }
}
</script>
