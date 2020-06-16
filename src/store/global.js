import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const global = {
  state: {
    accessToken: null,
    logado: false,
    usuarioAtual: null
  },

  actions: {

    rotasAdicionadas (context, dados) {
      context.commit('configuraRota', dados)
    },

    deslogar (context) {
      context.commit('deslogar')
    },

    logar (context, dadosLogin) {
      console.log(dadosLogin)
      context.commit('logar', dadosLogin)
    }
  },

  mutations: {
    deslogar (estado) {
      console.log('deslogar dentro do global.js')
      estado.accessToken = null
      estado.usuarioAtual = null
      estado.logado = false
      window.axios.defaults.headers.common.Authorization = 'Bearer '
    },

    logar (estado, dadosLogin) {
      estado.accessToken = dadosLogin.token
      estado.usuarioAtual = dadosLogin.user
      estado.logado = true
      window.axios.defaults.headers.common.Authorization = `Bearer ${dadosLogin.token}`
    }
  },

  getters: {

  }
}
