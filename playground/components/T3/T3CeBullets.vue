<template>
  <div class="t3-ce-bullets">
    <T3CeHeader v-if="props.header" v-bind="props" />
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

<script lang="ts" setup>
import { T3CeBulletsProps } from '../../../src/types'
import { useT3CeBullets } from '#typo3/components/T3CeBullets/useT3CeBullets'

const props = defineProps<T3CeBulletsProps>()
const { listTag, showBaseList } = useT3CeBullets(props)
</script>
