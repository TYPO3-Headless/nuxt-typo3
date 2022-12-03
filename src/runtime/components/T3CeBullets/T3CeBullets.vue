<script lang="ts" setup>
interface T3CeHeaderLink {
  additionalAttributes?: string[]
  class?: string
  href?: string
  linkText?: string
  target?: string
  title?: string
}

interface Props {
  header?: string
  headerLayout?: number
  headerPosition?: string
  headerLink?: T3CeHeaderLink
  subheader?: string
  bodytext?: string[] | [][]
  bulletsType?: number
}

const props = withDefaults(defineProps<Props>(), {
  header: '',
  headerLayout: 0,
  headerPosition: '',
  headerLink: () => ({
    additionalAttributes: [],
    class: '',
    href: '',
    linkText: '',
    target: '',
    title: ''
  }),
  subheader: '',
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
