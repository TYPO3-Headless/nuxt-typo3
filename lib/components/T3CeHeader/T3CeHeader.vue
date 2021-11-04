<template>
  <div
    v-if="header && headerLayout !== 100"
    :class="headerCss"
    class="t3-ce-header"
  >
    <component
      :is="`h${headerLevel}`"
      v-if="headerLayout >= 0 && headerLayout !== 100"
      :class="headerPosition"
    >
      <t3-nav-link v-if="headerLink" :to="headerLink.href">
        {{ header }}
      </t3-nav-link>
      <template v-else>
        {{ header }}
      </template>
    </component>
    <component :is="`h${headerLevel + 1}`" v-if="subheader">
      {{ subheader }}
    </component>
  </div>
</template>

<script>
import baseCe from '../../mixins/component/baseCe'
export default {
  name: 'T3CeHeader',
  extends: baseCe,
  computed: {
    headerLevel () {
      // by defualt if type is 0, set h1
      return this.headerLayout === 0 ? 1 : this.headerLayout
    },
    headerCss () {
      return this.headerPosition ? `t3-ce-header--${this.headerPosition}` : ''
    }
  }
}
</script>
