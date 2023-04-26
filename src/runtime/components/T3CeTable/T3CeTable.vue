<template>
  <div :class="`t3-ce-table--${tableClass}`" class="t3-ce-table">
    <T3CeHeader
      :header="props.header"
      :header-layout="props.headerLayout"
      :header-position="props.headerPosition"
      :header-link="props.headerLink"
      :subheader="props.subheader"
    />
    <table>
      <caption v-if="tableCaption">
        {{
          tableCaption
        }}
      </caption>
      <thead v-if="thead?.length">
        <tr>
          <th v-for="(col, colKey) in thead" :key="colKey">
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody v-if="tbody">
        <tr v-for="(row, rowKey) in tbody" :key="rowKey">
          <component
            :is="tableHeaderPosition === 2 && colKey === 0 ? 'th' : 'td'"
            v-for="(col, colKey) in row"
            :key="colKey"
          >
            {{ col }}
          </component>
        </tr>
      </tbody>
      <tfoot v-if="tfoot?.length">
        <tr>
          <td v-for="(col, colKey) in tfoot" :key="colKey">
            {{ col }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { T3CeTableProps } from '../../../types'
import { useT3CeTable } from './useT3CeTable'

const props = withDefaults(defineProps<T3CeTableProps>(), {
  bodytext: () => []
})

const { thead, tbody, tfoot } = useT3CeTable(props)
</script>
