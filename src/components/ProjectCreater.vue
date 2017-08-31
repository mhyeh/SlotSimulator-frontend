<template>
  <v-card v-ripple>
    <v-card-text class="blue">
      <v-dialog v-model="dialog" persistent width="50vw">
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
                  <v-select
                    label="Project Type"
                    required
                    :items="items"
                    v-model="typeId"
                  ></v-select>
                  <v-text-field label="Rows" type="number" min="1" required v-model="rows"></v-text-field>
                  <v-text-field label="Reels" type="number" min="1" required v-model="reels"></v-text-field>
                  <v-text-field label="Bet Cost" type="number" min="1" required v-model="betCost"></v-text-field>
                </v-flex>
              </v-flex>
              <v-flex xs1></v-flex>
              <v-btn primary @click.native="e1 = 2, edit[1] = true">CONTINUE</v-btn>
              <v-btn flat @click="close">CLOSE</v-btn>
            </v-layout>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-layout row wrap pt-4>
              <v-flex xs1></v-flex>
              <v-flex xs6 pb-4>
                <v-flex xs6>
                  <file-input label="Symbol" accept=".csv" @file="Symbols"></file-input>
                  <file-input label="BaseStops" accept=".csv" @file="BaseStops"></file-input>
                  <file-input label="BonusStops" accept=".csv" @file="BonusStops"></file-input>
                  <file-input label="Attributes" accept=".csv" @file="Attributes"></file-input>
                </v-flex>
              </v-flex>
              <v-flex xs5 pb-4>
                <v-flex xs7>
                  <file-input label="BasePayTable" accept=".csv" @file="BasePayTable"></file-input>
                  <file-input label="BonusPayTable" accept=".csv" @file="BonusPayTable"></file-input>
                  <file-input label="BasePattern" accept=".csv" @file="BasePattern"></file-input>
                  <file-input label="BonusPattern" accept=".csv" @file="BonusPattern"></file-input>
                </v-flex>
              </v-flex>
              <v-flex xs1></v-flex>
              <v-btn primary @click="create">CREATE</v-btn>
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
      formDatas: ['name', 'typeId', 'block', 'thread', 'runTime', 'rows', 'reels', 'betCost'],
      files: ['symbol', 'baseStops', 'bonusStops', 'attr', 'basePattern', 'bonusPattern'],
      edit: [true, false, false],
      name: 'Project1',
      typeId: 1,
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
      items: [],
      e1: 1,
      dialog: false
    }
  },
  methods: {
    create () {
      let form = new FormData()
      for (let formData of this.formDatas) {
        form.append(formData, this[formData])
      }
      for (let file of this.files) {
        form.append(file, this[file], this[file].name)
      }
      api.createProject(localStorage.getItem('token'), form).then(() => {
        this.reset()
      }).catch(error => {
        console.log(error)
        this.reset()
      })
    },
    close () {
      this.reset()
    },
    reset () {
      Object.assign(this.$data, this.$options.data.apply(this))
      this.getProjectType()
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
      this.BasePayTable = file
    },
    BonusPayTable (file) {
      this.BonusPayTable = file
    },
    BasePattern (file) {
      this.basePattern = file
    },
    BonusPattern (file) {
      this.bonusPattern = file
    },
    getProjectType () {
      let self = this

      self.items = []
      api.getAllProjectType(localStorage.getItem('token')).then(res => {
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
