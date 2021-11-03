<template>
  <div class="t3-ce-menu">
    <t3-ce-header v-bind="$props" />
    <ul v-if="menu">
      <li v-for="(menuItem, key) in menu" :key="key">
        <t3-nav-link
          :to="menuItem.link"
          :target="menuItem.target || false"
          :title="menuItem.title"
        >
          {{ menuItem.title }}
        </t3-nav-link>
        <slot name="link" :link="menuItem" />
        <t3-ce-menu-pages-list
          v-if="menuItem.children"
          :children="menuItem.children"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import baseCe from '../../mixins/component/baseCe'
import T3CeMenuPagesList from './T3CeMenuPagesList.vue'
export default {
  name: 'T3CeMenuPages',
  components: {
    T3CeMenuPagesList
  },
  extends: baseCe,
  props: {
    menu: {
      type: Array,
      required: true
    }
  }
}
</script>
