<template>
  <v-layout justify-center>
    <v-flex xs10>
      <v-card>
        <v-layout row wrap pa-4 ma-4>
            <v-flex xs1></v-flex>
            <v-flex xs6 pb-4>
              <v-flex xs6>
                <file-input label="BaseGame Par Sheet" accept=".csv" @file="BasePar"></file-input>
                <file-input label="BonusGame Par Sheet" accept=".csv" @file="BonusPar"></file-input>
                <file-input label="OverAll Par Sheet" accept=".csv" @file="OverallPar"></file-input>
                <file-input label="BaseGame Distribution" accept=".csv" @file="BaseDistribution"></file-input>
                <file-input label="BonusGame Distribution" accept=".csv" @file="BonusDistribution"></file-input>
                <file-input label="OverAll DisTribution" accept=".csv" @file="OverallDistribution"></file-input>
              </v-flex>
            </v-flex>
            <v-flex xs5 pb-4>
              <v-flex xs7>
                <file-input label="RTP" accept=".csv" @file="Rtp"></file-input>
                <file-input label="Total Net Win" accept=".csv" @file="TotalNetWin"></file-input>
                <file-input label="Survival Rate" accept=".csv" @file="SurvivalRate"></file-input>
              </v-flex>
            </v-flex>
            <v-flex xs1></v-flex>
            <v-btn primary @click="send">SEND</v-btn>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      files: ['basePar', 'bonusPar', 'overallPar', 'baseDistribution', 'bonusDistribution', 'overallDistribution', 'rtp', 'totalNetWin', 'survivalRate'],
      basePar: null,
      bonusPar: null,
      overallPar: null,
      baseDistribution: null,
      bonusDistribution: null,
      overallDistribution: null,
      rtp: null,
      totalNetWin: null,
      survivalRate: null
    }
  },
  methods: {
    send () {
      let form = new FormData()
      for (let file of this.files) {
        form.append(file, this[file], this[file].name)
      }
    },
    BasePar (data) {
      this.basePar = data
    },
    BonusPar (data) {
      this.bonusPar = data
    },
    OverallPar (data) {
      this.overallPar = data
    },
    BaseDistribution (data) {
      this.baseDistribution = data
    },
    BonusDistribution (data) {
      this.bonusDistribution = data
    },
    OverallDistribution (data) {
      this.overallDistribution = data
    },
    Rtp (data) {
      this.rtp = data
    },
    TotalNetWin (data) {
      this.totalNetWin = data
    },
    SurvivalRate (data) {
      this.survivalRate = data
    }
  }
}
</script>
