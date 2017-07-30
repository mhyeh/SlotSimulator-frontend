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
        reader.addEventListener('load', function () {
          this.fileData = reader.result
          console.log(reader.result)
        }.bind(reader), false)
        reader.readAsText(file)
      }
    }
  }
</script>

<style scoped>

</style>
