<template>
  <v-card v-ripple>
    <v-card-text class="blue">
      <v-dialog v-model="dialog" persistent width="60vw">
        <v-card-title slot="activator"><h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3></v-card-title>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="e1 > 1" :editable="edit[0]">Basic Setting</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" :complete="e1 > 2" :editable="edit[1]">Set Stops and Attributes</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3" :editable="edit[2]">Set Pay Table</v-stepper-step>
          </v-stepper-header>
          <v-stepper-content step="1">
            <v-layout row wrap pt-4>
              <v-flex xs1></v-flex>
              <v-flex xs6>
                <v-flex xs6>
                  <v-text-field label="Project Name" required v-model="projectName"></v-text-field>
                  <v-select
                    label="Project Type"
                    autocomplete
                    required
                    :items="items"
                    v-model="projectType"
                  ></v-select>
                  <v-text-field label="Block" type="number" min="1" max="5000" required v-model="block"></v-text-field>
                  <v-text-field label="Thread" type="number" min="1" max="1000" required v-model="thread"></v-text-field>
                  <v-text-field label="Run Time" type="number" min="1" max="1000000000" required v-model="runnTime"></v-text-field>
                </v-flex>
              </v-flex>
              <v-flex xs5>
                <v-flex xs7>
                  <v-text-field label="Rows" type="number" min="1" required v-model="rows"></v-text-field>
                  <v-text-field label="Reels" type="number" min="1" required v-model="reels"></v-text-field>
                  <v-text-field label="Bet Cost" type="number" min="1" required v-model="betCost"></v-text-field>
                </v-flex>
                <v-layout row>
                  <v-flex xs5>
                    <v-text-field label="Symbol" v-model="symbol" ref="symbol"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-btn primary @click="add">ADD</v-btn>
                  </v-flex>
                </v-layout>
                <v-flex xs7 elevation-1 pa-1>
                  <v-list class="list">
                    <v-list-tile v-for="(symbol, index) in symbols" v-bind:key="index">
                      <v-list-tile-content>{{ symbol }}</v-list-tile-content>
                      <v-list-tile-action>
                        <v-icon @click="deleteItem(index)" class="red--text text--lighten-2">delete</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </v-flex>
              </v-flex>
              <v-flex xs1></v-flex>
              <v-btn primary @click.native="e1 = 2, edit[1] = true">CONTINUE</v-btn>
              <v-btn flat @click="close">CLOSE</v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-layout row wrap>
              <v-flex xs1></v-flex>
              <v-flex xs6>
              </v-flex>
              <v-flex xs5>
              </v-flex>
              <v-flex xs1></v-flex>
              <v-btn primary @click.native="e1 = 3, edit[2] = true">CONTINUE</v-btn>
              <v-btn flat @click="close">CLOSE</v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="3">
            
            <v-btn primary @click="create" >SAVE</v-btn>
            <v-btn flat @click="close">CLOSE</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
import api from '../store/api'

export default {
  data () {
    return {
      edit: [true, false, false],
      projectName: 'Project1',
      projectType: 1,
      block: 1000,
      thread: 1000,
      runnTime: 4000000,
      rows: 3,
      reels: 5,
      betCost: 25,
      symbol: '',
      symbols: [],
      items: [],
      e1: 1,
      dialog: false
    }
  },
  methods: {
    add () {
      if (this.symbol !== '') {
        let flag = true
        for (let symbol of this.symbols) {
          if (symbol === this.symbol) {
            flag = false
          }
        }
        if (flag) {
          this.symbols.push(this.symbol)
        }
        this.symbol = ''
      }
      this.$refs.symbol.focus()
    },
    deleteItem (index) {
      this.symbols.splice(index, 1)
    },
    create () {
      this.reset()
    },
    close () {
      this.reset()
    },
    reset () {
      Object.assign(this.$data, this.$options.data.apply(this))
      this.getProjectType()
    },
    getProjectType () {
      let self = this

      self.items = []
      api.getAllProjectType(self.$store.state.token).then(res => {
        for (let item of res.data) {
          self.items.push({
            text: item.name,
            value: item.id
          })
        }
      })
    }
  },
  mounted () {
    this.getProjectType()
  }
}
</script>

<style scoped>
  .list {
    height: 15vh;
    overflow-y: scroll;
  }
</style>
