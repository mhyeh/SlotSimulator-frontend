<template>
  <v-layout row wrap>
    <p><h5>{{ name }}</h5></p>
    <v-layout row wrap>
      <v-flex class="pa-1" v-for="info of getInfo" :key="info[0]">
        <v-card>
          <v-card-text>
            {{ info[0] }}
            <v-card-title><h5 style="white-space: pre-line;">{{ format(info[1]) }}</h5></v-card-title>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-data-table
      v-bind:headers="getHeader"
      :items="getItems"
    >
      <template slot="items" scope="props">
        <td>{{ props.item.Symbol }}</td>
        <td class="text-xs-right">{{ props.item.Length }}</td>
        <td class="text-xs-right">{{ format(props.item.Hits) }}</td>
        <td class="text-xs-right">{{ props.item.Frequency }}</td>
        <td class="text-xs-right">{{ format(props.item.Payout) }}</td>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
  export default {
    props: ['options', 'theory', 'name'],
    data () {
      return {
        labels: ['Symbol', 'Length', 'Hits', 'Frequency', 'Payout']
      }
    },
    computed: {
      getInfo () {
        let result = []
        let i = 2
        if (this.theory) {
          i = 4
        }
        for (; i < 12; i++) {
          result.push(this.options[i])
        }
        return result
      },
      getHeader () {
        let header = []

        header.push({
          text: this.options[12][0],
          align: 'left',
          sortable: false,
          value: this.options[12]
        })

        for (let i = 1; i < this.options[12].length; i++) {
          header.push({
            text: this.options[12][i],
            sortable: false,
            value: this.options[12][i]
          })
        }

        return header
      },
      getItems () {
        let items = []

        for (let i = 13; i < this.options.length - 1; i++) {
          let data = {
            Symbol: ''
          }
          for (let j = 0; j < this.labels.length; j++) {
            data[this.labels[j]] = this.options[i][j]
          }
          items.push(data)
        }
        return items
      }
    },
    methods: {
      format (data) {
        if (parseInt(data).toString() === data) {
          return data.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        } else {
          return data
        }
      }
    }
  }
</script>