<template>
  <div class="q-pa-lg">
    <h4 class="q-py-none q-mt-md q-mb-xl">{{ acao }} Usuario</h4>
    <div class="row q-pb-lg">
      <q-dialog v-model="mostraConfSenha">
        <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <h5 class="q-my-sm">Reconfigurar senha</h5>
            <div class="row q-py-lg">
              <div class="col-12">
                <q-input dense outlined color="blue" v-model="usuario.senha" type="password" label="Senha" />
              </div>
            </div>
            <div class="row q-py-sm">
              <div class="col-12">
                <q-input
                  dense
                  outlined
                  color="blue"
                  v-model="usuario.confSenha"
                  type="password"
                  label="Confirmar senha"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="bg-white text-white">
            <q-btn label="Salvar" color="blue" class="q-ma-sm q-px-sm" v-close-popup @click="reconfSenha"/>
        </q-card-actions>
        </q-card>
      </q-dialog>
      <div class="col-7 q-pr-md">
        <q-input dense outlined color="blue" :disable="acao == 'Editar'" v-model="usuario.nome" type="text" label="Nome Completo" />
      </div>
      <div class="col-3">
        <q-input
          dense
          :disable="acao == 'Editar'"
          outlined
          color="blue"
          v-model="usuario.usuario"
          type="text"
          label="Usuário de acesso"
        />
      </div>
    </div>
    <div v-if="acao == 'Adicionar'" class="row q-py-lg">
      <div class="col-3 q-pr-md">
        <q-input dense outlined color="blue" v-model="usuario.senha" type="password" label="Senha" />
      </div>
      <div class="col-3 q-px-nd">
        <q-input
          dense
          outlined
          color="blue"
          v-model="usuario.confSenha"
          type="password"
          label="Confirmar senha"
        />
      </div>
    </div>
    <div class="row q-py-lg">
      <div class="col-3 q-px-nd">
        <q-input
          dense
          outlined
          color="blue"
          v-model="usuario.departamento"
          type="text"
          label="Departamento"
        />
      </div>
      <div class="col-3 q-px-md">
        <q-select
        map-options
          dense
          outlined
          color="blue"
          v-model="usuario.nivelAcesso"
          :options="optNivelAcesso"
          label="Nível de Acesso"
        />
      </div>
    </div>
        <div class="row q-py-lg">
           <div class="col-8">
            <q-btn
            class="rounded-button"
                  outline
                  color="red"
                  @click="$router.push('/usuarios')"
                  label="Voltar"
            />
          </div>
          <div class="col-4 justify-right">
            <q-btn
              v-if="acao == 'Editar'"
              class="rounded-button"
              outline
              color="blue"
              @click="reconfSenhaModal"
              label="Reconfigurar senha"
            />
            <q-btn
              class="rounded-button q-ml-lg"
              color="blue"
              @click="salvar"
              label="Salvar"
            />
          </div>
        </div>
  </div>
</template>

<script>
// import { Loading } from 'quasar'
// import Historico from './Historico'

export default {
  name: 'UsuariosForm',
  components: {},
  data () {
    return {
      acao: 'Adicionar',
      usuario: {
        nome: '',
        senha: '',
        usuario: '',
        nivelAcesso: '',
        departamento: '',
        status: ''
      },
      mostraConfSenha: false,
      confSenha: {},
      optNivelAcesso: [
        {
          value: 'Administrador',
          label: 'Adminstrador'
        },
        {
          value: 'Operador de dados',
          label: 'Operador de dados'
        },
        {
          value: 'Operador de notícias',
          label: 'Operador de notícias'
        }
      ]
    }
  },
  methods: {
    async verificaAdicionarOuEditar () {
      if (this.$route.query.id != null && this.$route.query.id > 0) {
        this.acao = 'Editar'
        const response = await this.axios.get(`/admin/usuario/${this.$route.query.id}`)
        this.usuario = response.data
      }
    },
    reconfSenhaModal () {
      this.mostraConfSenha = true
    },
    async reconfSenha () {
      const response = await this.axios.patch(`/admin/usuario/senha/${this.$route.query.id}`, { senha: this.usuario.senha })
      response.status >= 200 && response.status < 300 ? this.alertSucesso() : this.alertErro()
    },
    async salvar () {
      this.usuario.nivelAcesso = this.usuario.nivelAcesso.value
      const id = this.$route.query.id != null && this.$route.query.id > 0 ? this.$route.query.id : ''
      const metodo = this.acao === 'Editar' ? 'put' : 'post'
      const response = await this.axios({
        method: metodo,
        url: `/admin/usuario/${id}`,
        data: this.usuario
      })
      response.status >= 200 && response.status < 300 ? this.alertSucesso() : this.alertErro()
    },
    async alertSucesso () {
      await this.$swal({
        title: 'Dados atualizados com sucesso',
        type: 'success'
      })
      this.$router.push('/usuarios')
    },
    async alertErro () {
      await this.$swal({
        title: 'Falha ao atualizar os dados!',
        type: 'error'
      })
    }
  },
  mounted () {
    this.verificaAdicionarOuEditar()
  }
}
</script>

<style scope>
a {
  cursor: pointer;
}
a i:hover {
  color: orange !important;
}
</style>
