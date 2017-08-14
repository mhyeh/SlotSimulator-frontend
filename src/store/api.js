import axois from 'axios'

let config = {
  baseURL: 'https://slot.dacsc.club',
  timeout: 30000
}

let client = axois.create(config)

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
    return client.post('/account/register', {account: account, password: password, checkPassword, name})
  },
  getUserInfo: function (token) {
    return client.get('/account', { headers: {'Authorization': token} })
  },
  getAllProject: function (token) {
    return client.get('/project', { headers: {'Authorization': token} })
  },
  getProject: function (token, id) {
    return client.get('/project/' + id, { headers: {'Authorization': token} })
  },
  getProjectType: function (token, id) {
    return client.get('/project/type/' + id, { headers: {'Authorization': token} })
  },
  overallTable: function (token, id) {
    return client.get('/table/' + id + '/overAll', { headers: {'Authorization': token} })
  },
  basegameTable: function (token, id) {
    return client.get('/table/' + id + '/baseGame', { headers: {'Authorization': token} })
  },
  freegameTable: function (token, id) {
    return client.get('/table/' + id + '/freeGame', { headers: {'Authorization': token} })
  },
  overall: function (token, id, size, distribution) {
    return client.get('/chart/' + id + '/overAll?size=' + size + '&distribution=' + JSON.stringify(_distribution), { headers: {'Authorization': token} })
  },
  basegame: function (token, id, size, distribution) {
    return client.get('/chart/' + id + '/baseGame?size=' + size + '&distribution=' + JSON.stringify(_distribution), { headers: {'Authorization': token} })
  },
  freegame: function (token, id, size, distribution) {
    return client.get('/chart/' + id + '/freeGame?size=' + size + '&distribution=' + JSON.stringify(_distribution), { headers: {'Authorization': token} })
  },
  rtp: function (token, id, size, step, range) {
    return client.get('/chart/' + id + '/rtp?size=' + size + '&step=' + step + '&range=' + range, { headers: {'Authorization': token} })
  },
  totalNetWin: function (token, id, size, range) {
    return client.get('/chart/' + id + '/totalNetWin?size=' + size + '&range=' + range, { headers: {'Authorization': token} })
  },
  survivalRate: function (token, id, size) {
    return client.get('/chart/' + id + '/survivalRate?size=' + size, { headers: {'Authorization': token} })
  }
}

