<template>
  <div class="q-pa-none q-pa-md-lg">
    <h4 class="q-py-none q-mt-md q-mb-xl">Atualizar notícias e avisos</h4>
    <div class="row q-pb-xs">
      <div class="col-12 col-md-6 q-px-md-sm q-pb-md q-pb-md-none">
        <q-input
          v-model="busca"
          debounce="1000"
          @input="buscaPorNome"
          outlined
          color="blue"
          placeholder="Busca por palavras"
        >
          <template v-slot:append>
              <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="col-6 col-md-3 q-pr-md q-pr-md-none q-pl-md-md">
        <q-input v-model="dataPesquisaInicial" class="no-dashed" readonly outlined color="blue" mask="XX/XX/XXXX" label="Data inicial">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="dataPesquisaInicial" mask="DD/MM/YYYY" @input="() => $refs.qDateProxy.hide()" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
       <div class="col-6 col-md-3 q-pl-md-md">
        <q-input v-model="dataPesquisaFinal" class="no-dashed" readonly outlined color="blue" mask="XX/XX/XXXX" label="Data final">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="dataPesquisaFinal" mask="DD/MM/YYYY" @input="() => $refs.qDateProxy.hide()" />
              </q-popup-proxy>
            </q-icon>
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
            <q-radio v-model="visualizacao" val="todos" @input="buscaPorNome" label="Ambos" />
          </q-card-section>
          <div v-if="noticias.length == 0">
            <q-card-section class="text-center border-noticia">
              <h6 class=" q-my-md">Não há nenhum registro.</h6>
            </q-card-section>
          </div>
          <div v-if="noticias.length > 0">
          <div class="border-noticia q-py-md"  v-for="(noticia, index) in noticias" :key="index">
            <q-card-section class="text-left">
              <div class="row">
                <div class="col-12 col-md-6 text-left">
                  <h6 class="q-ma-none">{{ noticia.titulo }}</h6>
                </div>
                <div class="col-12 col-md-6 q-pb-lg q-pb-md-none text-right">
                  <span>Postado em {{ noticia.createdAt }} - Atualizado em {{ noticia.updatedAt }}</span>
                </div>
              </div>
              <div style="word-wrap: break-word" v-html="noticia.texto"></div>
            </q-card-section>
          </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
// import { Loading } from 'quasar'
// import Historico from './Historico'
import { date } from 'quasar'

export default {
  name: 'Comunicados',
  components: {},
  data () {
    return {
      dataPesquisaInicial: null,
      dataPesquisaFinal: null,
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

    async buscaPorNome () {
      const visualizacoes = this.visualizacao === 'todos' ? ['noticias', 'avisos'] : [this.visualizacao]
      this.noticias = this.noticiasDados.filter(noticia => {
        return visualizacoes.includes(noticia.tipo)
      })

      await this.filtroDatas()

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

    async filtroDatas () {
      // se ambos os campos estiverem preenchidos, filtra as datas entre eles
      if (this.dataPesquisaInicial != null && this.dataPesquisaFinal != null) {
        const dataIni = date.extractDate(this.dataPesquisaInicial, 'DD/MM/YYYY')
        const dataFin = date.extractDate(this.dataPesquisaFinal, 'DD/MM/YYYY')

        this.noticias = this.noticias.filter(noticia => {
          const dataNoticia = date.extractDate(noticia.createdAt, 'DD/MM/YYYY')
          return date.isBetweenDates(dataNoticia, dataIni, dataFin)
        })

      // se apenas o filtro de data inicial estiver preenchido, filtra datas após ele.
      } else if (this.dataPesquisaInicial != null) {
        const dataIni = date.extractDate(this.dataPesquisaInicial, 'DD/MM/YYYY')
        const dataFin = date.addToDate(new Date(), { days: 1 })

        this.noticias = this.noticias.filter(noticia => {
          const dataNoticia = date.extractDate(noticia.createdAt, 'DD/MM/YYYY')
          return date.isBetweenDates(dataNoticia, dataIni, dataFin)
        })

      // se apenas o filtro de data final estiver preenchido, filtra datas antes dele.
      } else if (this.dataPesquisaFinal != null) {
        const dataIni = new Date(1999, 1, 1)
        const dataFin = date.extractDate(this.dataPesquisaFinal, 'DD/MM/YYYY')

        this.noticias = this.noticias.filter(noticia => {
          const dataNoticia = date.extractDate(noticia.createdAt, 'DD/MM/YYYY')
          return date.isBetweenDates(dataNoticia, dataIni, dataFin)
        })
      }
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
