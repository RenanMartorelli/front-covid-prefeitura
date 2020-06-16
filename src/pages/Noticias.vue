<template>
  <div class="q-pa-lg">
    <h4 class="q-py-none q-mt-md q-mb-xl">Atualizar notícias e avisos</h4>
    <div class="row q-pb-xs">
      <div class="col-9 q-pr-xl">
        <q-expansion-item
          class="shadow-1 overflow-hidden"
          icon="add_circle_outline"
          label="Adicionar nova notícia ou aviso"
          header-class="bg-primary text-white"
          expand-icon-class="text-white"
          @click="editarModal(-1)"
        >
        </q-expansion-item>
      </div>
      <div class="col-3 q-px-sm">
        <q-input
          v-model="busca"
          debounce="1000"
          @input="buscaPorNome"
          outlined
          color="blue"
          placeholder="Busca"
        >
          <template v-slot:append>
              <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-pt-lg">
      <div class="col-12">
        <q-card>
          <q-card-section class="text-left">
            <span class="q-ma-xs">Visualizar:</span>
            <q-radio v-model="visualizacao" val="noticias" @input="buscaPorNome" label="Notícias" />
            <q-radio v-model="visualizacao" val="avisos" @input="buscaPorNome" label="Avisos" />
          </q-card-section>
          <div v-if="noticias.length == 0">
            <q-card-section class="text-center border-noticia">
              <h6 class=" q-my-md">Não há nenhum registro de {{ visualizacao.toLowerCase() }}</h6>
            </q-card-section>
          </div>
          <div v-if="noticias.length > 0">
          <div class="border-noticia q-py-md"  v-for="(noticia, index) in noticias" :key="index">
            <q-card-section class="text-left">
              <div class="row">
                <div class="col text-left">
                  <h6 class="q-ma-none">{{ noticia.titulo }}</h6>
                </div>
                <div class="col text-right">
                  <span>Postado em {{ noticia.createdAt }} - Atualizado em {{ noticia.updatedAt }}</span>
                </div>
              </div>
              <div style="word-wrap: break-word" v-html="noticia.texto"></div>
              <div class="row justify-right">
                <div class="col-12 text-right">
                  <q-btn
                    class="rounded-button q-mr-md"
                    outline
                    color="red-5"
                    @click="excluir(noticia.id)"
                    label="Remover"
                  />
                  <q-btn
                    class="rounded-button q-mr-md"
                    outline
                    color="blue"
                    @click="editarModal(index)"
                    label="Editar"
                  />
                </div>
              </div>
            </q-card-section>
          </div>
          </div>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="mostraEditarModal">
      <q-card style="width: 1000px; max-width: 80vw;">
        <h4 class="q-mx-lg q-mb-none q-mt-md">{{ this.acao }} conteúdo</h4>
        <q-card-section>
          <div class="row q-py-md">
            <div class="col-3">
              <span class="q-ma-xs">Tipo:</span>
              <q-radio v-model="noticia.tipo" val="noticias" label="Notícia" />
              <q-radio v-model="noticia.tipo" val="avisos" label="Aviso" />
            </div>
          </div>
          <q-input
            class="q-py-md"
            dense
            outlined
            color="blue"
            v-model="noticia.titulo"
            type="text"
            label="Título"
          />
          <q-editor v-model="noticia.texto" min-height="10rem" />
        </q-card-section>
        <div class="row justify-right">
          <div class="col-12 text-right">
            <q-btn
              :disabled="noticia.texto == '' || noticia.titulo == '' || noticia.tipo == ''"
              class="rounded-button q-mr-md q-mb-md"
              color="blue"
              @click="salvar"
               v-close-popup
              label="Salvar"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// import { Loading } from 'quasar'
// import Historico from './Historico'
import { date } from 'quasar'

export default {
  name: 'UsuariosForm',
  components: {},
  data () {
    return {
      mostraEditarModal: false,
      visualizacao: 'noticias',
      noticias: [],
      noticiasDados: [],
      noticia: {
        id: '',
        titulo: '',
        texto: '',
        tipo: ''
      },
      acao: 'Adicionar',
      busca: ''
    }
  },
  methods: {
    compare (a, b) {
      let comparison = 0
      if (a.contagemBusca > b.contagemBusca) {
        comparison = 1
      } else if (a.contagemBusca < b.contagemBusca) {
        comparison = -1
      }
      return comparison
    },

    buscaPorNome () {
      this.noticias = this.noticiasDados.filter(noticia => {
        return noticia.tipo === this.visualizacao
      })

      this.noticias.forEach((noticia, index) => {
        noticia.contagemBusca = 0
        noticia.contagemBusca += ((noticia.titulo.toUpperCase().match(new RegExp(this.busca.toUpperCase(), 'g')) || []).length * 5)
        noticia.contagemBusca += (noticia.texto.toUpperCase().match(new RegExp(this.busca.toUpperCase(), 'g')) || []).length
      })

      this.noticias = this.noticias.filter(noticia => {
        return noticia.contagemBusca > 0
      })
      this.noticias.sort(this.compare).reverse()
    },

    async verificaAdicionarOuEditar () {
      if (this.$route.query.id != null && this.$route.query.id > 0) {
        this.acao = 'Editar'
        const response = await this.axios.get(
          `/admin/usuario/${this.$route.query.id}`
        )
        this.usuario = response.data
        this.usuario.nivelAcesso = parseInt(this.usuario.nivelAcesso)
        // TODO Pega dados da pessoa da API
      }
    },

    editarModal (index) {
      this.noticia.titulo = ''
      this.noticia.tipo = ''
      this.noticia.texto = ''
      this.noticia.id = ''
      this.acao = 'Adicionar'
      if (index !== -1) {
        this.noticia.id = this.noticias[index].id
        this.noticia.titulo = this.noticias[index].titulo
        this.noticia.texto = this.noticias[index].texto
        this.noticia.tipo = this.noticias[index].tipo
        this.acao = 'Editar'
      }
      this.mostraEditarModal = true
    },

    async salvar () {
      const id = this.noticia.id
      const metodo = this.acao === 'Editar' ? 'put' : 'post'
      const response = await this.axios({
        method: metodo,
        url: `/admin/mensagem/${id}`,
        data: this.noticia
      })
      response.status >= 200 && response.status < 300 ? this.alertSucesso('Conteúdo inserido com sucesso') : this.alertErro('Falha ao inserir conteúdo!')
      this.obterNoticias()
    },

    async obterNoticias () {
      const response = await this.axios.get('/mensagem')
      response.data.forEach(noticia => {
        noticia.updatedAt = date.formatDate(noticia.updatedAt, 'DD/MM/YYYY')
        noticia.createdAt = date.formatDate(noticia.createdAt, 'DD/MM/YYYY')
      })

      // noticiasDados é o array de dados inalterado, noticias é o array de exibição, que é manipulado com filtros
      this.noticiasDados = response.data
      this.noticias = this.noticiasDados.filter(noticia => {
        return noticia.tipo === this.visualizacao
      })
    },

    async excluir (id) {
      const resposta = await this.$swal({
        title: 'Deletar conteúdo?',
        text: 'Não é possível reverter esta ação.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#3085d6'
      })
      if (!resposta) return ''

      const response = await this.axios.delete(`/admin/mensagem/${id}`)
      response.status >= 200 && response.status < 300 ? this.alertSucesso('Conteúdo removido com sucesso') : this.alertErro('Falha ao remover conteúdo')
      this.obterNoticias()
    },

    async alertSucesso (mensagem) {
      await this.$swal({
        title: mensagem,
        type: 'success'
      })
    },

    async alertErro (mensagem) {
      await this.$swal({
        title: mensagem,
        type: 'error'
      })
    }
  },
  mounted () {
    this.obterNoticias()
  }
}
</script>

<style scope>
.border-noticia {
  border-top: 1px solid #c8c8c8;
}
.q-field--outlined.q-field--readonly .q-field__control:before {
  border-style: solid;
}

a {
  cursor: pointer;
  text-decoration: none;
  color: #222;
}
a i:hover {
  color: orange !important;
}
</style>
