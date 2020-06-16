<template>
  <div
    class="background"
    :style="{ backgroundImage: 'url(' + require('assets/covid-pref-banner-login.png') + ')' }"
  >
    <div class="row justify-center">
      <div class="col-md-4 col-10 q-my-md">
        <q-card class="my-card card-login">
          <q-card-section class="q-px-lg row justify-center">
            <div class="col-6 q-pt-xl justify-center">
              <q-img class="logo-principal" src="../assets/logo_lliege_4.png"></q-img>
            </div>
          </q-card-section>
          <q-card-section class="q-px-lg row justify-center">
            <h5 class="q-my-none">Prefeitura de LLIÉGE</h5>
            <h6 class="q-my-none text-center">Painel de acompanhamento de casos COVID-19.</h6>
          </q-card-section>
          <q-card-section class="q-pt-none q-pb-xl justify-center">
            <div class="row justify-center q-py-md">
              <div class="col-10">
                <q-input dense filled v-model="login.usuario" type="text" label="Usuário" />
              </div>
            </div>
            <div class="row justify-center q-py-md">
              <div class="col-10">
                <q-input dense filled v-model="login.senha" :type="isPwd ? 'password' : 'text'" label="Senha">
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row justify-center q-pt-md">
              <div class="col-5 q-pr-md">
                <q-btn
                  class="rounded-button full-width"
                  outline
                  color="primary"
                  @click="recSenha"
                  label="Recuperar conta"
                />
              </div>
              <div class="col-5">
                <q-btn
                  class="rounded-button full-width"
                  color="primary"
                  @click="logar"
                  label="Entrar"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
// import store from '../store'
export default {
  name: 'Login',
  data () {
    return {
      login: {
        usuario: '',
        senha: ''
      },
      isPwd: true
    }
  },
  methods: {
    async logar () {
      let response
      try {
        response = await this.axios.post('/login', this.login)
      } catch (e) {
        this.$swal({
          title: 'Falha ao relizar o login',
          text: 'Usuário ou senha incorretos',
          type: 'error'
        })
      }

      // eslint-disable-next-line no-undef
      this.$store.dispatch('logar', response.data)
      // eslint-disable-next-line no-undef
      this.$swal({
        title: 'Login realizado com sucesso',
        text: 'Você será redirecionado para o portal',
        type: 'success'
      }).then(() => {
        this.$router.push('/menu-adm')
      })
    },
    recSenha () {
      this.$swal({
        title: 'Digite o usuário',
        text: 'Uma mensagem será enviada para o administrador do sistema para que sua senha seja reconfigurada',
        input: 'text',
        inputPlaceholder: 'Digite o seu usuário'
      }).then(async usuario => {
        await this.axios.post('/usuario/requisitar-troca-senha', { usuario: usuario })
        this.$swal({
          type: 'info',
          text: 'O administrador do sistema foi informado, aguarde o contato deste.'
        })
      })

      // if (email) {
      //   this.$swal(`Entered email: ${email}`)
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
.background {
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
}

.card-login {
  border-radius: 20px;
}

.rounded-button {
  border-radius: 10px;
}
</style>
