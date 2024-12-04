<template>
  <T3CeMenuPages
    v-bind="$props"
    class="t3-ce-menu-abstract"
  >
    <template #link="{ link }">
      {{ link.title }}
      <T3HtmlParser
        v-if="link.abstract"
        :content="link.abstract"
      />
    </template>
  </T3CeMenuPages>
</template>

<script lang="ts" setup>
import T3CeMenuPages from '../T3CeMenuPages/T3CeMenuPages.vue'
import T3HtmlParser from '../T3HtmlParser/T3HtmlParser.vue'
import type { T3CeMenuPagesProps } from '../../../module'

defineProps<T3CeMenuPagesProps>()
</script>
