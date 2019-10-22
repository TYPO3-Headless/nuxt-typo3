<template>
  <menu-pages v-bind="$props" class="ce-menu-abstract">
    <template v-slot:link="{ link }">
      <html-parser
        v-if="link.data && link.data.abstract"
        :content="link.data.abstract"
      />
    </template>
  </menu-pages>
</template>
<script>
import MenuPages from './CeMenu_pages'
export default {
  name: 'CeMenuAbstract',
  components: {
    MenuPages
  },
  extends: MenuPages
}
</script>
