import axios from 'axios'

export default {
  auth: {
    me: () => axios.get('/auth'),
    login: (data) => axios.post('/login', data)
  }
}
