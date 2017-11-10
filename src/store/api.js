import axois from 'axios'

let config = {
  baseURL: 'https://slot.dacsc.club',
  timeout: 120000000
}

let client = axois.create(config)

// 用來設定給分分布的range，可以改成讀設定檔
let _distribution = [
  {
    'lower': 0,
    'upper': 1,
    'space': 0.1
  },
  {
    'lower': 1,
    'upper': 5,
    'space': 0.2
  },
  {
    'lower': 5,
    'upper': 10,
    'space': 0.5
  },
  {
    'lower': 10,
    'upper': 100,
    'space': 1
  },
  {
    'lower': 100,
    'upper': 300,
    'space': 5
  },
  {
    'lower': 300,
    'upper': 1000,
    'space': 10
  },
  {
    'lower': 1000,
    'upper': 5000,
    'space': 100
  },
  {
    'lower': 5000,
    'upper': 10000,
    'space': 500
  }
]

export default {
  login: function (account, password) {
    return client.post('/account', {account: account, password: password})
  },
  register: function (account, password, checkPassword, name) {
    return client.post('/account/register', {account: account, password: password, checkPassword: checkPassword, name: name})
  },
  getUserInfo: function (token) {
    return client.get('/account', { headers: {'Authorization': token} })
  },
  createProject: function (token, data) {
    let config = {
      headers: {
        'Authorization': token,
        'content-type': 'multipart/form-data'
      }
    }
    return client.post('/project', data, config)
  },
  getAllProject: function (token) {
    return client.get('/project', { headers: {'Authorization': token} })
  },
  getProject: function (token, id) {
    return client.get('/project/' + id, { headers: {'Authorization': token} })
  },
  getAllProjectType: function (token) {
    return client.get('/projectType/', { headers: {'Authorization': token} })
  },
  getProjectType: function (token, id) {
    return client.get('/projectType/' + id, { headers: {'Authorization': token} })
  },
  getPARSheet: function (token, id, type) {
    return client.get('/analysisData/table/' + id + '/' + type, { headers: {'Authorization': token} })
  },
  getDistribution: function (token, id, size, distribution, type) {
    return client.get('/analysisData/chart/' + id + '/distribution?size=' + size + '&distribution=' + JSON.stringify(_distribution) + '&table=' + type, { headers: {'Authorization': token} })
  },
  rtp: function (token, id, size, step, range) {
    return client.get('/analysisData/chart/' + id + '/rtp?size=' + size + '&step=' + step + '&range=' + range, { headers: {'Authorization': token} })
  },
  totalNetWin: function (token, id, size, range) {
    return client.get('/analysisData/chart/' + id + '/totalNetWin?size=' + size + '&range=' + range, { headers: {'Authorization': token} })
  },
  survivalRate: function (token, id, size) {
    return client.get('/analysisData/chart/' + id + '/survivalRate?size=' + size, { headers: {'Authorization': token} })
  },
  uploadFiles: function (token, id, data) {
    let config = {
      headers: {
        'Authorization': token,
        'content-type': 'multipart/form-data'
      }
    }
    return client.put('/fileUpload/' + id, data, config)
  },
  getConfig: function (token, id) {
    return client.get('/project/' + id + '/getConfig', { headers: {'Authorization': token} })
  },
  getOthersData: function (token, id, config) {
    return client.get('/analysisData/others/' + id + '?config=' + JSON.stringify(config), { headers: {'Authorization': token} })
  }
}

