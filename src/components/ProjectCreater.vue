<template>
  <v-card v-ripple>
    <v-card-text class="blue">
      <v-dialog v-model="dialog" persistent max-width="50vw">
        <v-card-title slot="activator"><h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3></v-card-title>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="e1 > 1" :editable="edit[0]">Basic Setting</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" :complete="e1 > 2" :editable="edit[1]">Files Upload</v-stepper-step>
          </v-stepper-header>
          <v-stepper-content step="1">
            <v-layout row wrap pt-4>
              <v-flex xs1></v-flex>
              <v-flex xs6 pb-4>
                <v-flex xs6>
                  <v-text-field label="Project Name" required v-model="name"></v-text-field>
                  <v-text-field label="Block" type="number" min="1" max="5000" required v-model="block"></v-text-field>
                  <v-text-field label="Thread" type="number" min="1" max="1000" required v-model="thread"></v-text-field>
                  <v-text-field label="Run Time" type="number" min="1" max="1000000000" required v-model="runTime"></v-text-field>
                </v-flex>
              </v-flex>
              <v-flex xs5 pb-4>
                <v-flex xs7>
                  <v-text-field label="Rows" type="number" min="1" required v-model="rows"></v-text-field>
                  <v-text-field label="Reels" type="number" min="1" required v-model="reels"></v-text-field>
                  <v-text-field label="Bet Cost" type="number" min="1" required v-model="betCost"></v-text-field>
                </v-flex>
              </v-flex>
              <v-flex xs1></v-flex>
              <v-btn class="blue darken-2 grey--text text--lighten-4" @click.native="e1 = 2, edit[1] = true">CONTINUE</v-btn>
              <v-btn flat @click="close">CLOSE</v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-layout row wrap pt-4>
              <v-flex xs1></v-flex>
              <v-flex xs6 pb-4>
                <v-flex xs6>
                  <file-input ref="file" label="Symbol" accept=".csv" @file="Symbols"></file-input>
                  <file-input ref="file" label="Stops" accept=".csv" multiple @file="Stops"></file-input>
                  <file-input ref="file" label="Attributes" accept=".csv" @file="Attributes"></file-input>
                  <file-input ref="file" label="PayTable" accept=".csv" @file="PayTable"></file-input>
                  
                </v-flex>
              </v-flex>
              <v-flex xs5 pb-4>
                <v-flex xs7>
                  <file-input ref="file" label="Pattern" accept=".csv" multiple @file="Pattern"></file-input>
                  <file-input ref="file" label="Config" accept=".js" @file="Config"></file-input>
                  <file-input ref="file" label="Game Logic" accept=".cu" @file="GameLogic"></file-input>
                </v-flex>
              </v-flex>
              <v-flex xs1></v-flex>
              <v-btn class="blue darken-2 grey--text text--lighten-4" @click="create">CREATE</v-btn>
              <v-btn flat @click="close">CLOSE</v-btn>
            </v-layout>
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
      formDatas: ['name', 'block', 'thread', 'runTime', 'rows', 'reels', 'betCost'],
      files: ['symbol', 'stops', 'attr', 'pattern', 'payTable'],
      edit: [true, false, false],
      name: 'Project1',
      block: 625,
      thread: 160,
      runTime: 4000000,
      rows: 3,
      reels: 5,
      betCost: 25,
      symbol: null,
      stops: null,
      attr: null,
      pattern: null,
      payTable: null,
      config: null,
      gameLogic: null,
      e1: 1,
      dialog: false
    }
  },
  methods: {
    create () {
      let self = this
      let form = new FormData()
      for (let formData of this.formDatas) {
        form.append(formData, this[formData])
      }
      for (let file of this.files) {
        if (this[file] !== null) {
          for (let i in this[file]) {
            form.append(file, this[file][i], this[file][i].name)
          }
        }
      }
      if (this.config !== null) {
        form.append('config', this.config[0], this.config[0].name)
      }
      if (this.gameLogic !== null) {
        form.append('gameLogic', this.gameLogic[0], this.gameLogic[0].name)
      }
      api.createProject(localStorage.getItem('token'), form).then(() => {
        self.$emit('reset')
      }).catch(error => {
        if (error.response.data.code === 104) {
          self.$emit('logout')
        } else {
          self.$emit('reset')
        }
      })
    },
    close () {
      this.$emit('reset')
    },
    Symbols (file) {
      this.symbol = file
    },
    Stops (file) {
      this.stops = file
    },
    Attributes (file) {
      this.attr = file
    },
    PayTable (file) {
      this.payTable = file
    },
    Pattern (file) {
      this.pattern = file
    },
    BonusPattern (file) {
      this.bonusPattern = file
    },
    GameLogic (file) {
      this.gameLogic = file
    },
    Config (file) {
      this.config = file
    }
  }
}
</script>

<style scoped>
  .list {
    height: 15vh;
    overflow-y: scroll;
  }
</style>
