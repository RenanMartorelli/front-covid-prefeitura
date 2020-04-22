import router from '../router'
// adicionar arquivo
// import api from '../api'
import store from '../store'
import axios from 'axios'

window.store = store
// window.api = api
window.axios = axios
window.router = router

axios.defaults.baseURL = 'http://localhost:8000'
