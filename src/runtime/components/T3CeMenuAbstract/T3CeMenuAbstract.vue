<template>
  <T3CeMenuPages
    v-bind="$props"
    class="t3-ce-menu-abstract"
  >
    <template #link="{ link }">
      <T3HtmlParser
        v-if="link?.data?.abstract"
        :content="link.data.abstract"
      />
    </template>
  </T3CeMenuPages>
</template>

<script lang="ts" setup>
import T3CeMenuPages from '../T3CeMenuPages/T3CeMenuPages.vue'
import T3HtmlParser from '../T3HtmlParser/T3HtmlParser.vue'
</script>
