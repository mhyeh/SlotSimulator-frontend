<template>
  <v-layout row wrap pt-4>
    <v-flex xs1></v-flex>
    <v-flex xs6 pb-4>
      <v-flex xs6>
        <v-text-field label="Project Name" required v-model="name"></v-text-field>
        <v-text-field label="Block" type="number" min="1" max="5000" required v-model="block"></v-text-field>
        <v-text-field label="Thread" type="number" min="1" max="1000" required v-model="thread"></v-text-field>
        <v-text-field label="Run Time" type="number" min="1" max="1000000000" required v-model="runTime"></v-text-field>
        <file-input ref="file" label="Symbol" accept=".csv" @file="Symbols"></file-input>
        <file-input ref="file" label="Stops" accept=".csv" multiple @file="Stops"></file-input>
        <file-input ref="file" label="Attributes" accept=".csv" @file="Attributes"></file-input>
      </v-flex>
    </v-flex>
    <v-flex xs5 pb-4>
      <v-flex xs7>
        <v-text-field label="Rows" type="number" min="1" required v-model="rows"></v-text-field>
        <v-text-field label="Reels" type="number" min="1" required v-model="reels"></v-text-field>
        <v-text-field label="Bet Cost" type="number" min="1" required v-model="betCost"></v-text-field>
        <file-input ref="file" label="PayTable" accept=".csv" @file="PayTable"></file-input>
        <file-input ref="file" label="Pattern" accept=".csv" multiple @file="Pattern"></file-input>
        <file-input ref="file" label="Game Logic" accept=".cu,.h" multiple @file="GameLogic"></file-input>
        <file-input ref="file" label="Config" accept=".js" @file="Config"></file-input>
      </v-flex>
    </v-flex>
    <v-layout row wrap>
      <v-flex xs1></v-flex>
      <v-btn class="blue darken-2 grey--text text--lighten-4" @click="update">UPDATE</v-btn>
    </v-layout>
  </v-layout>
</template>

<script>
import api from '../../store/api'

export default {
  data () {
    return {
      formDatas: ['name', 'block', 'thread', 'runTime', 'rows', 'reels', 'betCost'],
      files: ['symbol', 'stops', 'attr', 'pattern', 'payTable'],
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
      gameLogic: null
    }
  },
  watch: {
    '$route': 'start'
  },
  methods: {
    update () {
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
      if (this.gameLogic !== null && this.gameLogic.length === 2) {
        for (let i in this.gameLogic) {
          form.append('gameLogic', this.gameLogic[i], this.gameLogic[i].name)
        }
      }
      api.updateProject(localStorage.getItem('token'), self.$store.state.projectId.id, form).then(() => {
        self.$router.push('/Project/')
      }).catch(error => {
        if (error.response.data.code === 104) {
          self.$emit('logout')
        } else {
          self.$router.push('/Project/')
        }
      })
    },
    start () {
      let self = this
      api.getProject(localStorage.getItem('token'), self.$store.state.projectId.id).then(res => {
        let project = res.data
        for (let data of self.formDatas) {
          self[data] = project[data]
        }
      }).catch(error => {
        console.log(error)
        if (error.response.data.code === 104) {
          self.$emit('logout')
        }
      })
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
    GameLogic (file) {
      this.gameLogic = file
    },
    Config (file) {
      this.config = file
    }
  },
  mounted () {
    this.start()
  }
}
</script>