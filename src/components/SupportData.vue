<template>
  <v-data-table
    v-bind:headers="header"
    :items="getData(option)"
    hide-actions
  >
    <template slot="items" scope="props">
      <td>{{ props.item.Data }}</td>
      <td class="text-xs-right">{{ props.item.Value }}</td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    props: ['option'],
    data () {
      return {
        header: [
          {
            text: 'Data',
            align: 'left',
            sortable: false,
            value: 'Data'
          },
          {
            text: 'Value',
            sortable: false,
            value: 'Value'
          }
        ]
      }
    },
    methods: {
      getData (data) {
        let item = []

        item.push({Data: 'Avg', Value: data.avg})
        item.push({Data: 'mid', Value: data.mid})
        item.push({Data: 'q1', Value: data.q1})
        item.push({Data: 'q3', Value: data.q3})
        item.push({Data: 'min', Value: data.min})
        item.push({Data: 'max', Value: data.max})

        return item
      }
    }
  }
</script>
