import axois from 'axios'

let config = {
  baseURL: '',
  timeout: 10000
}

let client = axois.create(config)

export default {
  getAllProject: function () {
    return client.get('/project')
  }
}
