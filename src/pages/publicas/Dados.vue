<template>
  <div class="q-pa-md-xl">
    <div class="row q-py-md q-py-md-none">
      <div class="col-md-6 col-12 text-left"><h4 class="titulo-pagina q-ma-none q-mb-md-xl">Dados oficiais do município</h4></div>
      <div class="col-md-6 col-12 text-right"><h6 class="q-ma-none">Data da última atualização - {{ dataAtualizacao }}</h6></div>
    </div>
    <div class="row q-pb-xs">
      <div class="col-12 q-mb-md">
        <q-card>
          <q-card-section>
            <div class="row">
              <div class="col-md-3 col-12 col-sm-6 q-pr-sm-md q-pb-md q-pb-lg-none">
                <q-card class="bg-green-5 q-pb-md">
                  <q-card-section>
                    <div class="row">
                      <div class="col text-left">
                        <h6 class="q-ma-none titulo-card-contagem text-white">Casos recuperados</h6>
                      </div>
                    </div>
                  </q-card-section>
                  <div class="row numeros-principais">
                    <div class="col-12 text-right q-pr-md">
                      <div class="container">
                        <div class="col text-white"> {{ totais.recuperados }} </div>
                      </div>
                    </div>
                  </div>
                </q-card>
              </div>
              <div class="col-md-3 col-12 col-sm-6 q-pr-md-md q-pb-md q-pb-lg-none">
                <q-card class="bg-amber-7 q-pb-md">
                  <q-card-section>
                    <div class="row">
                      <div class="col text-left">
                        <h6 class="q-ma-none titulo-card-contagem text-white">Casos suspeitos</h6>
                      </div>
                    </div>
                  </q-card-section>
                  <div class="row numeros-principais">
                    <div class="col-12 text-right q-pr-md">
                      <div class="container">
                        <div class="col text-white">{{ totais.suspeitos }}</div>
                      </div>
                    </div>
                  </div>
                </q-card>
              </div>
              <div class="col-md-3 col-12 col-sm-6 q-pr-sm-md q-pb-md q-pb-lg-none">
                <q-card class="bg-deep-orange-6 q-pb-md">
                  <q-card-section>
                    <div class="row">
                      <div class="col text-left">
                        <h6 class="q-ma-none titulo-card-contagem text-white">Casos confirmados</h6>
                      </div>
                    </div>
                  </q-card-section>
                  <div class="row numeros-principais">
                    <div class="col-12 text-right q-pr-md">
                      <div class="container">
                        <div class="col text-white">{{ totais.confirmados }}</div>
                      </div>
                    </div>
                  </div>
                </q-card>
              </div>
              <div class="col-md-3 col-12 col-sm-6">
                <q-card class="bg-grey-9 q-pb-md">
                  <q-card-section>
                    <div class="row">
                      <div class="col-3 text-left">
                        <h6 class="q-ma-none titulo-card-contagem text-white">Óbitos</h6>
                      </div>
                      <div class="col-9 text-right">
 <p class="q-ma-none text-white">Letalidade: {{ ((totais.obitos / totais.suspeitos) * 100).toFixed(2)}} %</p>
                      </div>
                    </div>
                  </q-card-section>
                  <div class="row ">
                        <div class="col q-pr-md numeros-principais text-right text-white">{{ totais.obitos }}</div>
                  </div>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
          <q-expansion-item
        class="q-mb-md q-py-md shadow-1 header-expansion-item"
        color="white"
        header-class="bg-white"
        expand-separator
        icon="perm_identity"
        label="Dados por bairro/região"
      >
        <q-card>
          <q-card-section>
            <tabelaDadosBairro v-bind:dados="dadosPorBairro"></tabelaDadosBairro>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    <q-card>
      <q-card-section class="q-pa-none q-pa-md-md">
        <div class="row q-pb-lg">
          <div class="col-12 col-md-6 q-mb-lg q-mb-md-none q-pa-md-md">
            <q-card class="bg-grey-1 q-pb-md">
              <q-card-section>
                <div class="row">
                  <div class="col text-left">
                    <h6 class="q-ma-none">Casos novos de COVID-19 por data de notificação</h6>
                  </div>
                </div>
              </q-card-section>
                <highcharts :options="chartCasosDiaOptions"/>
              <q-card-section class="row badges">
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-6 q-mb-lg q-mb-md-none q-pa-md-md">
            <q-card class="bg-grey-1 q-pb-md">
              <q-card-section>
                <div class="row">
                  <div class="col text-left">
                    <h6 class="q-ma-none">Casos novos de COVID-19 por semana epidemológica</h6>
                  </div>
                </div>
              </q-card-section>
                <highcharts :options="chartCasosSemanaOptions"/>
              <q-card-section class="row badges">
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-6 q-mb-lg q-mb-md-none q-pa-md-md">
            <q-card class="bg-grey-1 q-pb-md">
              <q-card-section>
                <div class="row">
                  <div class="col text-left">
                    <h6 class="q-ma-none">Óbitos relacionados a COVID-19 por data de notificação</h6>
                  </div>
                </div>
              </q-card-section>
                <highcharts :options="chartObitosDiaOptions"/>
              <q-card-section class="row badges">
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-md-6 q-mb-lg q-mb-md-none q-pa-md-md">
            <q-card class="bg-grey-1 q-pb-md">
              <q-card-section>
                <div class="row">
                  <div class="col text-left">
                    <h6 class="q-ma-none">Óbitos relacionados a COVID-19 por semana epidemológica</h6>
                  </div>
                </div>
              </q-card-section>
                <highcharts :options="chartObitosSemanaOptions"/>
              <q-card-section class="row badges">
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 q-pa-md-md">
            <q-card class="bg-grey-1 q-pb-md">
              <q-card-section>
                <div class="row">
                  <div class="col text-left">
                    <h6 class="q-ma-none">Curva geral da situação dos casos de covid-19</h6>
                  </div>
                </div>
              </q-card-section>
                <highcharts :options="chartCurvaGeralOptions"/>
              <q-card-section class="row badges">
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
// import { Loading } from 'quasar'
// import Historico from './Historico'
import { date } from 'quasar'
import tabelaDadosBairro from './Graficos/tabelaDadosBairro'

export default {
  name: 'Dados',
  components: { tabelaDadosBairro },
  data () {
    return {
      dadosPorBairro: [],
      dadosEstatistica: {},
      dataAtualizacao: '',
      inicioPandemia: '',
      totais: {
        obitos: 0,
        confirmados: 0,
        suspeitos: 0,
        recuperados: 0
      },
      chartCasosDiaOptions: {
        chart: {
          backgroundColor: '#fafafa'
        },
        title: {
          text: ''
        },
        series: [{
          color: '#ff5722',
          name: 'Novos casos',
          data: [44, 77, 88] // sample data
        }],
        yAxis: {
          title: {
            text: 'Quantidade'
          }
        },
        xAxis: {
          categories: ['01/02', '02/02', '03/02']
        }
      },
      chartCasosSemanaOptions: {
        chart: {
          type: 'column',
          backgroundColor: '#fafafa'
        },
        title: {
          text: ''
        },
        series: [{
          color: '#ff5722',
          name: 'Novos casos',
          data: [44, 77, 88] // sample data
        }],
        yAxis: {
          title: {
            text: 'Quantidade'
          }
        },
        xAxis: {
          categories: ['01/02', '02/02', '03/02']
        }
      },
      chartObitosDiaOptions: {
        chart: {
          backgroundColor: '#fafafa'
        },
        title: {
          text: ''
        },
        series: [{
          color: '#424242',
          name: 'Novos casos',
          data: [44, 77, 88] // sample data
        }],
        yAxis: {
          title: {
            text: 'Quantidade'
          }
        },
        xAxis: {
          categories: ['01/02', '02/02', '03/02']
        }
      },
      chartObitosSemanaOptions: {
        chart: {
          type: 'column',
          backgroundColor: '#fafafa'
        },
        title: {
          text: ''
        },
        series: [{
          color: '#424242',
          name: 'Novos casos',
          data: [44, 77, 88] // sample data
        }],
        yAxis: {
          title: {
            text: 'Quantidade'
          }
        },
        xAxis: {
          categories: ['01/02', '02/02', '03/02']
        }
      },
      chartCurvaGeralOptions: {
        chart: {
          backgroundColor: '#fafafa'
        },
        title: {
          text: ''
        },
        series: [{
          color: '#424242',
          name: 'Óbitos',
          data: [0, 0, 3, 14, 22, 66, 91, 60, 42] // sample data
        },
        {
          color: '#ff5722',
          name: 'Confirmados',
          data: [2, 10, 46, 90, 115, 70, 213, 114] // sample data
        },
        {
          color: '#ffb300',
          name: 'Suspeitos',
          data: [5, 45, 200, 312, 421, 576, 567] // sample data
        },
        {
          color: '#66bb6a',
          name: 'Recuperados',
          data: [0, 0, 0, 4, 10, 40, 70, 200] // sample data
        }
        ],
        yAxis: {
          title: {
            text: 'Quantidade'
          }
        },
        xAxis: {
          categories: ['01/02', '02/02', '03/02']
        }
      }
    }
  },
  methods: {

    async obtemDadosPorBairro () {
      const response = await this.axios.get('/estatistica-bairro')
      response.data.forEach(dadosBairro => {
        this.totais.obitos += parseInt(dadosBairro.obitos)
        this.totais.suspeitos += parseInt(dadosBairro.suspeitos)
        this.totais.confirmados += parseInt(dadosBairro.confirmados)
        this.totais.recuperados += parseInt(dadosBairro.recuperados)
      })

      this.dadosPorBairro = response.data
    },

    async obtemDadosEstatistica () {
      this.dadosEstatisticaPorDia = {
        obitos: [],
        confirmados: [],
        suspeitos: [],
        recuperados: []
      }

      this.dadosEstatisticaPorSemana = {
        obitos: [],
        confirmados: [],
        suspeitos: [],
        recuperados: []
      }

      this.dadosEstatisticaGeral = []

      const response = await this.axios.get('/estatistica')

      this.dadosEstatisticaGeral = {
        datas: [],
        obitos: [],
        confirmados: [],
        suspeitos: [],
        recuperados: []
      }

      response.data.forEach(dado => {
        const dataContagem = date.formatDate(date.extractDate(dado.dataContagem.slice(0, 10), 'YYYY-MM-DD'), 'DD/MM/YYYY')
        this.dadosEstatisticaGeral.datas.push(dataContagem)
      })

      this.dadosEstatisticaGeral.datas = Array.from(new Set(this.dadosEstatisticaGeral.datas))
      this.dadosEstatisticaGeral.datas.forEach(() => {
        this.dadosEstatisticaGeral.obitos.push(0)
        this.dadosEstatisticaGeral.confirmados.push(0)
        this.dadosEstatisticaGeral.suspeitos.push(0)
        this.dadosEstatisticaGeral.recuperados.push(0)
      })

      this.dataAtualizacao = this.dadosEstatisticaGeral.datas[this.dadosEstatisticaGeral.datas.length - 1]

      let primeiraSemana = null
      response.data.forEach(dado => {
        const dataContagem = date.extractDate(dado.dataContagem.slice(0, 10), 'YYYY-MM-DD')
        const dataFormatada = date.formatDate(dataContagem, 'DD/MM/YYYY')
        const semanaDoAno = date.getWeekOfYear(dataContagem)

        // Ajustar as validações
        // ajustar o CSS pra deixar dinâmico (parte do cidadão)
        // montar esquema de deploy

        // traz a semana de contagem para a ordem, tornando a primeira semana com casos registrados a semana 1
        // define o dia de início da pandemia
        let semanaContagem = null
        if (primeiraSemana == null && dado.tipoContagem === 'confirmados') {
          const inicioPandemia = dataFormatada
          this.chartCasosSemanaOptions.title.text = `Semana 1: ${inicioPandemia}`
          this.chartObitosSemanaOptions.title.text = `Semana 1: ${inicioPandemia}`
          primeiraSemana = semanaDoAno
          semanaContagem = 1
        } else semanaContagem = semanaDoAno - primeiraSemana + 1

        const indexSemana = this.dadosEstatisticaPorSemana[dado.tipoContagem].findIndex(element => element.semana === semanaContagem)
        if (indexSemana === -1) {
          this.dadosEstatisticaPorSemana[dado.tipoContagem].push({ quant: dado.quantidade, semana: semanaContagem })
        } else {
          const item = this.dadosEstatisticaPorSemana[dado.tipoContagem][indexSemana]
          this.dadosEstatisticaPorSemana[dado.tipoContagem][indexSemana] = { quant: dado.quantidade + item.quant, semana: semanaContagem }
        }

        const indexDia = this.dadosEstatisticaPorDia[dado.tipoContagem].findIndex(element => element.dataFormatada === dataFormatada)
        if (indexDia === -1) {
          this.dadosEstatisticaPorDia[dado.tipoContagem].push({ quant: dado.quantidade, data: dataContagem, dataFormatada: dataFormatada, semana: date.getWeekOfYear(dataContagem) })
        } else {
          const item = this.dadosEstatisticaPorDia[dado.tipoContagem][indexDia]
          this.dadosEstatisticaPorDia[dado.tipoContagem][indexDia] = { quant: dado.quantidade + item.quant, data: dataContagem, dataFormatada: dataFormatada }
        }

        const indexData = this.dadosEstatisticaGeral.datas.findIndex(el => el === dataFormatada)
        // const valorDado = this.dadosEstatisticaGeral[dado.tipoContagem][indexData]
        this.dadosEstatisticaGeral[dado.tipoContagem][indexData] += dado.quantidade

        // const teste = this.dadosEstatisticaGeral.find(element => element.dataFormatada === dataFormatada)
        // if(teste === null)
        // this.dadosEstatisticaGeral[dataContagem] = {
        //   dataFormatada: date.formatDate(dataContagem, 'DD/MM/YYYY')
        // }
        // const contagem = {}
        // contagem.obitos = 0
        // contagem.confirmados = 0
        // contagem.suspeitas = 0
        // contagem.recuperados = 0
        // contagem[dado.tipoDado] = dado.quantidade

        // this.dadosEstatisticaGeral[dataContagem].obitos.push(contagem.obitos)
        // this.dadosEstatisticaGeral[dataContagem].obitos.push(contagem.confirmados)
        // this.dadosEstatisticaGeral[dataContagem].obitos.push(contagem.suspeitas)
        // this.dadosEstatisticaGeral[dataContagem].obitos.push(contagem.recuperados)
      })
      this.dadosEstatisticaGeral.obitos.forEach((dado, index) => {
        if (index > 0) this.dadosEstatisticaGeral.obitos[index] = dado + this.dadosEstatisticaGeral.obitos[index - 1]
      })

      this.dadosEstatisticaGeral.confirmados.forEach((dado, index) => {
        if (index > 0) this.dadosEstatisticaGeral.confirmados[index] = dado + this.dadosEstatisticaGeral.confirmados[index - 1]
      })

      this.dadosEstatisticaGeral.suspeitos.forEach((dado, index) => {
        if (index > 0) this.dadosEstatisticaGeral.suspeitos[index] = dado + this.dadosEstatisticaGeral.suspeitos[index - 1]
      })

      this.dadosEstatisticaGeral.recuperados.forEach((dado, index) => {
        if (index > 0) this.dadosEstatisticaGeral.recuperados[index] = dado + this.dadosEstatisticaGeral.recuperados[index - 1]
      })

      const diasCasosConfirmados = []
      const diasCasosObitos = []

      const quantidadesDiasCasosConfirmados = []
      const quantidadesDiasCasosObitos = []

      const semanasCasosConfirmados = []
      const semanasCasosObitos = []

      const quantidadesSemanasCasosConfirmados = []
      const quantidadesSemanasCasosObitos = []

      this.dadosEstatisticaPorDia.confirmados.forEach(dado => {
        diasCasosConfirmados.push(dado.dataFormatada.slice(0, 5))
        quantidadesDiasCasosConfirmados.push(dado.quant)
      })

      this.dadosEstatisticaPorDia.obitos.forEach(dado => {
        diasCasosObitos.push(dado.dataFormatada.slice(0, 5))
        quantidadesDiasCasosObitos.push(dado.quant)
      })

      this.dadosEstatisticaPorSemana.confirmados.forEach(dado => {
        semanasCasosConfirmados.push(dado.semana)
        quantidadesSemanasCasosConfirmados.push(dado.quant)
      })

      this.dadosEstatisticaPorSemana.obitos.forEach(dado => {
        semanasCasosObitos.push(dado.semana)
        quantidadesSemanasCasosObitos.push(dado.quant)
      })

      this.chartCasosDiaOptions.series[0].data = quantidadesDiasCasosConfirmados
      this.chartCasosDiaOptions.xAxis.categories = diasCasosConfirmados

      this.chartCasosSemanaOptions.series[0].data = quantidadesSemanasCasosConfirmados
      this.chartCasosSemanaOptions.xAxis.categories = semanasCasosConfirmados

      this.chartObitosSemanaOptions.series[0].data = quantidadesSemanasCasosObitos
      this.chartObitosSemanaOptions.xAxis.categories = semanasCasosObitos

      this.chartObitosDiaOptions.series[0].data = quantidadesDiasCasosObitos
      this.chartObitosDiaOptions.xAxis.categories = diasCasosObitos

      this.chartCurvaGeralOptions.series[0].data = this.dadosEstatisticaGeral.obitos
      this.chartCurvaGeralOptions.series[1].data = this.dadosEstatisticaGeral.confirmados
      this.chartCurvaGeralOptions.series[2].data = this.dadosEstatisticaGeral.suspeitos
      this.chartCurvaGeralOptions.series[3].data = this.dadosEstatisticaGeral.recuperados

      this.dadosEstatisticaPorDia = response.data
    },

    compare (a, b) {
      let comparison = 0
      if (a.contagemBusca > b.contagemBusca) {
        comparison = 1
      } else if (a.contagemBusca < b.contagemBusca) {
        comparison = -1
      }
      return comparison
    }
  },

  async mounted () {
    await this.obtemDadosPorBairro()
    await this.obtemDadosEstatistica()
  }
}
</script>

<style scope>
.q-field--outlined.q-field--readonly .q-field__control:before {
  border-style: solid;
}

.numeros-principais {
  font-size: 55px;
  line-height: 35px;
}

@media (max-width: 1400px){
  .numeros-principais {
  font-size: 35px;
  line-height: 25px;
  }

  .titulo-pagina {
    font-size: 28px
  }

  .titulo-card-contagem {
    font-size: 17px
  }
}

.header-expansion-item {
  background-color: white;
  font-size: 20px;
}

a {
  cursor: pointer;
}
a i:hover {
  color: orange !important;
}
</style>
