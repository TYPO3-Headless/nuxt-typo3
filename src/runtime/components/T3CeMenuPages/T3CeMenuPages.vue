<template>
  <div class="t3-ce-menu">
    <T3CeHeader v-bind="props" />
    <ul v-if="props.menu">
      <li v-for="(menuItem, key) in menu" :key="key">
        <NuxtLink
          :to="menuItem.link"
          :target="menuItem.target || null"
          :title="menuItem.title"
        >
          {{ menuItem.title }}
        </NuxtLink>
        <slot name="link" :link="menuItem" />
        <T3CeMenuPagesList
          v-if="menuItem.children"
          :children="menuItem.children"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { T3CeMenuPages } from '../../../types'
import T3CeMenuPagesList from './T3CeMenuPagesList.vue'

const props = defineProps<T3CeMenuPages>()
</script>
