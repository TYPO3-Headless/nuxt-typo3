<template>
  <t3-ce-menu-pages v-bind="$props" class="t3-ce-menu-abstract">
    <template #link="{ link }">
      <t3-html-parser
        v-if="link.data && link.data.abstract"
        :content="link.data.abstract"
      />
    </template>
  </t3-ce-menu-pages>
</template>
<script>
import T3CeMenuPages from '../T3CeMenuPages/T3CeMenuPages.vue'
export default {
  name: 'T3CeMenuAbstract',
  components: {
    T3CeMenuPages
  },
  extends: T3CeMenuPages
}
</script>
