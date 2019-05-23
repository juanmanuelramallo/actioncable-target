import axios from 'axios'

const signIn = (email, password) => (
  axios.post('/auth/sign_in', { email, password })
)

const cableTicket = () => (
  axios.post('/auth/cable')
)

const conversations = () => (
  axios.get('/conversations')
)

export { signIn, cableTicket, conversations }
