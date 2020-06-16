<template>
  <q-dialog @hide="testeHide" v-model="mostraModalImportar">
    <q-card style="width: 1000px; max-width: 80vw;">
      <h4 class="q-mx-lg q-mb-none q-mt-md"></h4>
      <q-card-section>
        <div class="row">
          <h5 class="q-my-sm">Importar dados via planilha</h5>
        </div>
        <div class="row q-py-md">
          <div class="col-4 q-pr-xl">
            <q-btn
              class="full-width rounded-button q-mr-md q-mb-md"
              color="green"
              @click="downloadModelo"
              label="Baixar modelo da planilha de importação"
            />
          </div>
          <div class="col-4 q-pl-xl">
            <q-file filled bottom-slots v-model="arquivo" label="Selecionar arquivo" counter>
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click.stop="arquivo = null" class="cursor-pointer" />
              </template>

              <template v-slot:hint>
                Envie um arquivo .csv de acordo com o modelo fornecido.
              </template>
            </q-file>
          </div>
          <div class="col-4 q-px-md">
            <q-btn
              size='lg'
              class="rounded-button full-width  q-mr-md q-mb-md"
              color="blue"
              @click="enviaArquivo"
              label="Enviar arquivo"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
// import { Loading } from 'quasar'
// import Historico from './Historico'

export default {
  name: 'EstatisticasImportar',
  components: {
  },
  data () {
    return {
      arquivo: null,
      mostraModalImportar: true
    }
  },
  methods: {

    testeHide () {
      this.$emit('fechaModal')
    },

    async downloadModelo () {
      const response = await this.axios.get('/admin/download-modelo', { responseType: 'blob' }) // important
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'modelo-importacao.csv') // or any other extension
      document.body.appendChild(link)
      link.click()
    },
    async enviaArquivo () {
      const formData = new FormData()
      formData.append('dados-covid', this.arquivo)
      formData.append('idUsuario', 4)
      try {
        const response = await this.axios.post('/admin/import-dados', formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })

        this.mostraModalImportar = false
        this.alertSucesso(`Dados inseridos com sucesso! \n Número de linhas importadas: ${response.data.linhasImportadas}`)
      } catch (error) {
        this.mostraModalImportar = false
        const erro = error.response
        if (erro.status === 400) {
          let mensagem = ''
          const qtdErros = erro.data.length
          const max = qtdErros > 3 ? 3 : qtdErros
          for (let i = 1; i <= max; i++) {
            mensagem += `linha: ${erro.data[i - 1].linha} - ${erro.data[i - 1].erro} --- \n\n`
          }

          if (qtdErros > 3) mensagem += `e mais ${qtdErros - 3} erro(s).`

          this.alertErro(mensagem, 'Erros encontrados no formato da planilha:')
        } else if (erro.status > 300) {
          this.alertErro('', 'Erro ao importar dados')
        }
      }
    },

    async alertSucesso (mensagem) {
      await this.$swal({
        title: mensagem,
        type: 'success'
      })
    },
    async alertErro (mensagem, titulo) {
      await this.$swal({
        title: titulo,
        text: mensagem,
        width: '70%',
        type: 'error'
      })
    }
  },

  async mounted () {

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
