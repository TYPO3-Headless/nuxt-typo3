<script lang="ts" setup>
import { computed } from 'vue'
import type { T3CeBullets } from '../../../types'

const props = withDefaults(defineProps<T3CeBullets>(), {
  bodytext: () => [],
  bulletsType: 0
})

const listTag = computed(() => {
  return props.bulletsType === 1 ? 'ol' : 'ul'
})

const showBaseList = computed(() => {
  return props.bulletsType === 0 || props.bulletsType === 1
})
</script>
<template>
  <div class="t3-ce-bullets">
    <T3CeHeader v-bind="props" />
    <component :is="listTag" v-if="showBaseList">
      <li v-for="(el, i) in bodytext" :key="i">
        {{ el }}
      </li>
    </component>
    <dl v-else>
      <!-- eslint-disable-next-line vue/no-v-for-template-key -->
      <template v-for="(el, i) in bodytext" :key="`${i}-0`">
        <dt>
          {{ el[0] }}
        </dt>
        <dd v-if="el[1]" :key="`${i}-1`">
          {{ el[1] }}
        </dd>
      </template>
    </dl>
  </div>
</template>
