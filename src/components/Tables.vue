<template>
  <v-data-table
    v-bind:headers="options.header"
    :items="options.data"
    :hide-actions="hide(options.data)"
  >
    <template slot="items" scope="props">
      <td v-for="data in props.item">
        {{ format(data) }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
import bigNumber from 'bignumber.js'

export default {
  props: ['options'],
  methods: {
    format (data) {
      if (parseInt(data) === data) {
        return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return data
      }
    },
    hide (data) {
      return data.length < 10
    }
  }
}
</script>
