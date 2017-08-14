<template>
  <v-layout row wrap>
    <p><h5>{{ name }}</h5></p>
    <v-layout row wrap>
      <div class="infoes pa-2" v-for="info of getInfo" :key="info[0]">
        <v-card>
          <v-card-text>
            <p class="text-xs-center">{{ info[0] }}</p>
            <v-card-title><h5 style="white-space: pre-line;">{{ info[1] }}</h5></v-card-title>
          </v-card-text>
        </v-card>
      </div>
    </v-layout>
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
    props: ['options', 'name'],
    data () {
      return {
        labels: ['Symbol', 'Length', 'Hits', 'Frequency', 'Payout']
      }
    },
    computed: {
      getInfo () {
        console.log(this.options)
        let result = []
        for (let i = 2; i < 12; i++) {
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
    }
  }
</script>