<template>
  <div class="q-pa-lg">
    <h4 class="q-px-none q-mt-md q-mb-xl">Atualizar dados de estatística</h4>
      <div class="row q-pb-xs">
        <div class="col-12 q-pa-md">
          <q-card >
            <q-card-section>
              <div class="row">
                 <div class="col text-left">
                  <h6 class="q-ma-none">Adicionar Novo Registro</h6>
              </div>
              <div class="col text-right q-pa-sm">
                 <q-btn
                    class="rounded-button"
                    color="blue"
                    @click="salvar"
                    label="Salvar"/>
              </div>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-2 q-pr-md">
                  <q-input
                    dense
                    outlined
                    color="blue"
                    v-model="estatistica.quantidade"
                    type="number"
                    label="Quantidade"
                  />
                </div>
                <div class="col-3  q-pr-md">
                  <q-select
                    map-options
                    dense
                    outlined
                    color="blue"
                    v-model="estatistica.idBairro"
                    :options="optBairros"
                    label="Região/Bairro"
                  />
                </div>
                <div class="col-2 q-pr-md">
                <q-input v-model="estatistica.dataContagem" class="no-dashed" readonly outlined dense color="blue" mask="XX/XX/XXXX" label="Data">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="estatistica.dataContagem" mask="DD/MM/YYYY" @input="() => $refs.qDateProxy.hide()" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                </div>
                 <div class="col-5">
                  <div class="q-gutter-sm">
                    <span>Tipo:</span>
                    <q-radio v-model="estatistica.tipoContagem" val="obitos" label="Óbitos" />
                    <q-radio v-model="estatistica.tipoContagem" val="confirmados" label="Confirmados" />
                    <q-radio v-model="estatistica.tipoContagem" val="suspeitos" label="Suspeitos" />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
        <q-card >
              <div class="row q-pl-lg q-pt-md">
                <div class="col-3">
                  <q-input
          v-model="busca"
          debounce="1000"
          @input="buscaPorNome"
          outlined
          color="blue"
          placeholder="Busca por nome"
        >
                  <template v-slot:append>
              <q-icon name="search" />
          </template>
        </q-input>
                </div>
              </div>
            <q-card-section>
    <div class="row q-pb-lg">
      <div class="col-6 q-pa-md" v-for="(estatisticaBairro, index) in estatisticaBairros" :key="index">
        <q-card class="bg-grey-1 q-pb-md">
          <q-card-section>
            <div class="row">
            <div class="col text-left">
              <h6 class="q-ma-none">{{ estatisticaBairro.nomeBairro }}</h6>
            </div>
            <div class="col text-right">
              <span>{{ estatisticaBairro.atualizadoEm }}</span>
            </div>
            </div>
          </q-card-section>
           <div class="row badges">
            <div class="col-4 text-center">
              <div class="container">
                  <div class="col">
                    <q-badge color="grey-4" text-color="black">
                      {{ estatisticaBairro.obitos }}
                    </q-badge>
                  </div>
                  <div class="col q-pt-sm">
                    <span>Óbitos</span>
                  </div>
              </div>
            </div>
            <div class="col-4 text-center">
              <div class="container">
                  <div class="col">
                    <q-badge color="grey-4" text-color="black">
                      {{ estatisticaBairro.confirmados }}
                    </q-badge>
                  </div>
                  <div class="col q-pt-sm">
                    <span>Confirmados</span>
                  </div>
              </div>
            </div>
            <div class="col-4 text-center">
              <div class="container">
                  <div class="col">
                    <q-badge color="grey-4" text-color="black">
                      {{ estatisticaBairro.suspeitos }}
                    </q-badge>
                  </div>
                  <div class="col q-pt-sm">
                    <span>Suspeitas</span>
                  </div>
              </div>
            </div>
            </div>
        </q-card>
      </div>
    </div>
      </q-card-section>
    </q-card >
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
      estatistica: {
        quantidade: 0,
        tipoContagem: '',
        dataContagem: date.formatDate(Date.now(), 'DD/MM/YYYY'),
        idBairro: '',
        idUsuario: ''
      },
      estatisticaBairros: [],
      estatisticaBairrosDados: [],
      optBairros: []
    }
  },
  methods: {
    async salvar () {
      this.estatistica.idUsuario = 9 // TO-DO: Ajustar para pegar o usuário da sessão.
      this.estatistica.idBairro = this.estatistica.idBairro.value
      console.log(this.estatistica)
      const response = await this.axios.post('/admin/estatistica', this.estatistica)
      response.status >= 200 && response.status < 300 ? this.alertSucesso() : this.alertErro()
      await this.obtemDadosBairro()
    },
    async alertSucesso () {
      await this.$swal({
        title: 'Dados inseridos com sucesso',
        type: 'success'
      })
    },
    async alertErro () {
      await this.$swal({
        title: 'Falha ao inserir dados!',
        type: 'error'
      })
    },

    async obtemBairros () {
      const response = await this.axios.get('/admin/bairro')
      response.data.forEach(bairro => {
        this.optBairros.push({
          value: bairro.id,
          label: bairro.nome
        })
      })
    },

    async obtemDadosBairro () {
      const response = await this.axios.get('/admin/estatistica-bairro')
      response.data.forEach(dadosBairro => {
        dadosBairro.atualizadoEm = date.formatDate(dadosBairro.atualizadoEm, 'DD/MM/YYYY')
        dadosBairro.atualizadoEm = dadosBairro.atualizadoEm === '31/12/1999' ? 'Nenhum dado registrado' : 'Última atualização: ' + dadosBairro.atualizadoEm
      })
      this.estatisticaBairros = response.data
      this.estatisticaBairrosDados = response.data
    },

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
      this.estatisticaBairros = this.estatisticaBairrosDados
      this.estatisticaBairros.forEach((estatistica, index) => {
        estatistica.contagemBusca = 0
        estatistica.contagemBusca += ((estatistica.nomeBairro.toUpperCase().match(new RegExp(this.busca.toUpperCase(), 'g')) || []).length)
      })

      this.estatisticaBairros = this.estatisticaBairros.filter(estatistica => {
        return estatistica.contagemBusca > 0
      })
      this.estatisticaBairros.sort(this.compare).reverse()
    }
  },

  async mounted () {
    await this.obtemBairros()
    await this.obtemDadosBairro()
  }
}
</script>

<style scope>

.q-field--outlined.q-field--readonly .q-field__control:before {
    border-style: solid;
}

.badges .q-badge {
  font-size: 35px;
  line-height: 35px;
}
a {
  cursor: pointer;
}
a i:hover {
  color: orange !important;
}
</style>
