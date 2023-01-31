<template>
  <ul>
    <li
      v-for="child in children"
      :key="child.id"
    >
      <t3-nav-link
        :to="child.link"
        :attrs="{
          target: child.target || false,
          title: child.title
        }"
      >
        {{ child.title }}
      </t3-nav-link>
      <T3CeMenuPagesList
        v-if="child.children"
        :children="child.children"
      />
    </li>
  </ul>
</template>

<script>
import T3CeMenuPagesList from './T3CeMenuPagesList.vue'

// helper component to render nested list
export default {
  name: 'T3CeMenuPagesList',
  components: {
    T3CeMenuPagesList
  },
  props: {
    children: {
      type: Array,
      required: true
    }
  }
}
</script>
