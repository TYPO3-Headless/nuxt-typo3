<template>
  <menu-pages v-bind="$props" class="ce-menu-sitemap" />
</template>
<script>
import MenuPages from './CeMenuPages'
export default {
  name: 'CeMenuSitemap',
  components: {
    MenuPages
  },
  extends: MenuPages
}
</script>
