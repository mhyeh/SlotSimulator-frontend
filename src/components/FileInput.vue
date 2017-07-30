<template>
  <div id="fileInput">
    <input type="file" @change="readFile($event)">
  </div>
</template>

<script>
  export default {
    name: 'fileInput',
    data () {
      return {
        fileData: ''
      }
    },
    methods: {
      readFile (event) {
        var reader = new window.FileReader()
        var file = event.target.files[0]
        reader.onload = function (event) {}
        reader.readAsText(file)
        this.fileData = reader.result
        console.log(reader.result)
      }
    }
  }
</script>

<style scoped>

</style>
