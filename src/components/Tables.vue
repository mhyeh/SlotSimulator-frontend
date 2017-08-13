<template>
  <v-layout>
    <div class="infoes pa-2" v-for="info of getInfo" :key="info[0]">
      <v-card>
        <v-card-text>
          <p class="text-xs-center">{{ info[0] }}</p>
          <v-card-title><h3 style="white-space: pre-line;">{{ info[1] }}</h3></v-card-title>
        </v-card-text>
      </v-card>
    </div>
    <v-data-table
      v-bind:headers="getHeader"
      :items="getItems"
    >
      <template slot="items" scope="props">
        <td>{{ props.item.Symbol }}</td>
        <td class="text-xs-right">{{ props.item.Length }}</td>
        <td class="text-xs-right">{{ props.item.Hits }}</td>
        <td class="text-xs-right">{{ props.item.Frequency }}</td>
        <td class="text-xs-right">{{ props.item.Payout }}</td>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
  export default {
    props: {
      option: []
    },
    data () {
      return {
        labels: ['Symbol', 'Length', 'Hits', 'Frequency', 'Payout']
      }
    },
    methods: {
      getInfo () {
        let result = []
        for (let i = 0; i < 12; i++) {
          result.push(this.option[i])
        }
        return result
      },
      getHeader () {
        let header = []

        header.push({
          text: this.option[12][0],
          align: 'left',
          sortable: false,
          value: this.option[12]
        })

        for (let i = 1; i < this.option[12].length; i++) {
          header.push({
            text: this.option[12][i],
            value: this.option[12][i]
          })
        }

        return header
      },
      getItems () {
        let items = []

        for (let i = 13; i < this.option.length; i++) {
          let data = {
            Symbol: ''
          }
          for (let j = 0; j < this.labels.length; j++) {
            data[this.labels[i]] = this.option[i][j]
          }
          items.push(data)
        }
        return items
      }
    }
  }
</script>