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
                  <file-input ref="file" label="Game Logic" accept=".cu" @file="GameLogic"></file-input>
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
                  <file-input ref="file" label="BaseStops" accept=".csv" @file="BaseStops"></file-input>
                  <file-input ref="file" label="BonusStops" accept=".csv" @file="BonusStops"></file-input>
                  <file-input ref="file" label="Attributes" accept=".csv" @file="Attributes"></file-input>
                  <file-input ref="file" label="Config" accept=".js" @file="Config"></file-input>
                </v-flex>
              </v-flex>
              <v-flex xs5 pb-4>
                <v-flex xs7>
                  <file-input ref="file" label="BasePayTable" accept=".csv" @file="BasePayTable"></file-input>
                  <file-input ref="file" label="BonusPayTable" accept=".csv" @file="BonusPayTable"></file-input>
                  <file-input ref="file" label="BasePattern" accept=".csv" @file="BasePattern"></file-input>
                  <file-input ref="file" label="BonusPattern" accept=".csv" @file="BonusPattern"></file-input>
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
      files: ['symbol', 'baseStops', 'bonusStops', 'attr', 'basePattern', 'bonusPattern', 'basePayTable', 'bonusPayTable'],
      edit: [true, false, false],
      name: 'Project1',
      block: 1000,
      thread: 1000,
      runTime: 4000000,
      rows: 3,
      reels: 5,
      betCost: 25,
      symbol: null,
      baseStops: null,
      bonusStops: null,
      attr: null,
      basePattern: null,
      bonusPattern: null,
      basePayTable: null,
      bonusPayTable: null,
      config: null,
      gameLogic: null,
      items: [],
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
          form.append(file, this[file], this[file].name)
        }
      }
      if (this.config !== null) {
        form.append('config', this.config, this.config.name)
      }
      if (this.gameLogic !== null) {
        form.append('gameLogic', this.gameLogic, this.gameLogic.name)
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
    BaseStops (file) {
      this.baseStops = file
    },
    BonusStops (file) {
      this.bonusStops = file
    },
    Attributes (file) {
      this.attr = file
    },
    BasePayTable (file) {
      this.basePayTable = file
    },
    BonusPayTable (file) {
      this.bonusPayTable = file
    },
    BasePattern (file) {
      this.basePattern = file
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
