<template>
  <div id="Register">
    <div style="margin:0 auto;width:300px;">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <h3 class="headline mb-0">Register</h3>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Email" required></v-text-field>
          <v-text-field label="Password" type="password" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue white--text">Register</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register'
}
</script>

<style scoped>
</style>
