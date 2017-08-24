<template>
  <v-data-table
    v-bind:headers="header"
    :items="getData(option)"
    hide-actions
  >
    <template slot="items" scope="props">
      <td>{{ props.item.Data }}</td>
      <td class="text-xs-right">{{ format(props.item.Value) }}</td>
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

        item.push({Data: 'Avg',    Value: data.Avg})
        item.push({Data: 'Q1',     Value: data.Q1})
        item.push({Data: 'Median', Value: data.Median})
        item.push({Data: 'Q3',     Value: data.Q3})
        item.push({Data: 'Min',    Value: data.Min})
        item.push({Data: 'Max',    Value: data.Max})

        return item
      },
      format (data) {
        if (parseInt(data) === data) {
          return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        } else {
          return data
        }
      }
    }
  }
</script>
