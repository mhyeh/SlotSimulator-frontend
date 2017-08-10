import axois from 'axios'

let config = {
  baseURL: 'https://slot.dacsc.club',
  timeout: 30000
}

let client = axois.create(config)

export default {
  login: function (account, password) {
    return client.post('/account', {account: account, password: password})
  },
  getAllProject: function (token) {
    return client.get('/project', { headers: {'Authorization': token} })
  },
  getProject: function (token, id) {
    return client.get('/project/' + id, { headers: {'Authorization': token} })
  },
  overall: function (token, id, size, distribution) {
    return client.get('/chart/' + id + '/overAll?size=' + size + '&distribution=' + JSON.stringify(distribution), { headers: {'Authorization': token} })
  },
  rtp: function (token, id, size, step, range) {
    return client.get('/chart/' + id + '/rtp?size=' + size + '&step=' + step + '&range=' + range, { headers: {'Authorization': token} })
  },
  totalNetWin: function (token, id, size, step, range) {
    return client.get('/chart/' + id + '/totalNetWin?size=' + size + '&step=' + step + '&range=' + range, { headers: {'Authorization': token} })
  }
}

