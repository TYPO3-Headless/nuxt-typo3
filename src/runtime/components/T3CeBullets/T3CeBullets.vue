<script lang="ts" setup>
import type { T3CeBulletsProps } from '../../../types'
import { useT3CeBullets } from './useT3CeBullets'

const props = withDefaults(defineProps<T3CeBulletsProps>(), {
  bodytext: () => [],
  bulletsType: 0
})

const { listTag, showBaseList } = useT3CeBullets(props)
</script>
<template>
  <div class="t3-ce-bullets">
    <T3CeHeader
      v-if="props.header"
      v-bind="props"
    />
    <component
      :is="listTag"
      v-if="showBaseList"
    >
      <li
        v-for="(el, i) in bodytext"
        :key="i"
      >
        {{ el }}
      </li>
    </component>
    <dl v-else>
      <!-- eslint-disable-next-line vue/no-v-for-template-key -->
      <template
        v-for="(el, i) in bodytext"
        :key="`${i}-0`"
      >
        <dt>
          {{ el[0] }}
        </dt>
        <dd
          v-if="el[1]"
          :key="`${i}-1`"
        >
          {{ el[1] }}
        </dd>
      </template>
    </dl>
  </div>
</template>
