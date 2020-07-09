<template>
  <div class="ce-menu">
    <ce-header v-bind="$props" />
    <ul v-if="menu">
      <li v-for="(menuItem, key) in menu" :key="key">
        <nav-link
          :to="menuItem.link"
          :target="menuItem.target || false"
          :title="menuItem.title"
        >
          {{ menuItem.title }}
        </nav-link>
        <slot name="link" :link="menuItem" />
        <menu-nested-list
          v-if="menuItem.children"
          :children="menuItem.children"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import baseCe from '../mixins/baseCe'
import MenuNestedList from './menu/NestedList'
export default {
  name: 'CeMenuSitemap',
  components: {
    MenuNestedList
  },
  extends: baseCe,
  props: {
    menu: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>
