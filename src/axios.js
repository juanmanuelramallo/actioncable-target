import axios from 'axios'

const configureAxios = () => {
  axios.defaults.baseURL = 'https://jm-target-mvd.herokuapp.com'
  axios.defaults.headers.common['access-token'] = window.sessionStorage.getItem('access-token')
  axios.defaults.headers.common['client'] = window.sessionStorage.getItem('client')
  axios.defaults.headers.common['uid'] = window.sessionStorage.getItem('uid')
  axios.defaults.headers.post['Content-Type'] = 'application/json'

  axios.interceptors.response.use((response) => {
    window.sessionStorage.setItem('access-token', response.headers['access-token'])
    window.sessionStorage.setItem('client', response.headers['client'])
    window.sessionStorage.setItem('uid', response.headers['uid'])
    return response;
  }, function (error) {
    return Promise.reject(error)
  })
}

export default configureAxios;
