<template>
  <div class="ce-menu-sitemap">
    <ul>
      <li v-for="(firstLevel, keyFirstLevel) in sitemap" :key="keyFirstLevel">
        <nuxt-link :to="firstLevel.link"> {{ firstLevel.title }} </nuxt-link>
        <nested-list :children="firstLevel.children" />
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
    sitemap: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>
