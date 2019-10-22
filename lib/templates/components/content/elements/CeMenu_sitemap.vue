<template>
  <div v-if="menu" class="ce-menu-sitemap">
    <ul>
      <li v-for="(menuItem, key) in menu" :key="key">
        <nuxt-link
          :to="menuItem.link"
          :target="menuItem.target || false"
          :title="menuItem.title"
        >
          {{ menuItem.title }}
        </nuxt-link>
        <nested-list v-if="menuItem.children" :children="menuItem.children" />
      </li>
    </ul>
  </div>
</template>
<script>
import baseCe from '../mixins/baseCe'

// helper component to render nested list
const nestedList = {
  functional: true,
  props: {
    children: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  render(createElement, ctx) {
    return createElement(
      'ul',
      {},
      ctx.props.children.map(el => {
        return createElement('li', {}, [
          createElement(
            'nuxt-link',
            {
              props: {
                to: el.link
              },
              attrs: {
                target: el.target || false,
                title: el.title
              }
            },
            el.title
          ),
          el.children
            ? createElement('nested-list', {
                props: {
                  children: el.children
                }
              })
            : false
        ])
      })
    )
  }
}

export default {
  name: 'CeMenuSitemap',
  components: {
    nestedList
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
