<template>
  <menu-pages v-bind="$props" class="ce-menu-sitemap" />
</template>
<script>
import MenuPages from './CeMenu_pages'
export default {
  name: 'CeMenuSitemap',
  components: {
    MenuPages
  },
  extends: MenuPages
}
</script>
