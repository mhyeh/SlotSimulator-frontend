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
        let file = event.target.files[0]
        let CHUNK_SIZE = 1024
        let offset = 0
        let self = this
        let read = function () {
          if (offset >= file.size) {
            console.log('Done')
            self.$emit('readFile', self.fileData)
            return
          }
          let fr = new FileReader()
          let slice = file.slice(offset, offset + CHUNK_SIZE)
          fr.addEventListener('load', function () {
            self.fileData += fr.result
            offset += CHUNK_SIZE
            read()
          }, false)
          fr.readAsText(slice)
        }
        read()
      }
    }
  }
</script>

<style scoped>

</style>
