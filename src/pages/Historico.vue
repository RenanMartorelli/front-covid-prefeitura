<template>
  <div class="q-pa-lg">
    <!-- <q-dialog v-model="showHist" full-width>
      <Historico></Historico>
    </q-dialog> -->
    <h4 class="q-py-none q-my-md">Histórico de inserção de Dados</h4>
    <q-table
      :data="data"
      :columns="columns"
      row-key="inscricao"
      :filter="filter"
      :pagination.sync="pagination"
      no-data-label="Nenhum registro encontrado"
      no-results-label="Nenhum registro encontrado"
      rows-per-page-label="Total por página:"
      loading-label="Carregando dados"
      class="no-shadow"
    >

      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Pesquisar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nomeBairro" :props="props">{{ props.row.bairro.nome}}</q-td>

          <q-td key="nomeUsuario" :props="props">{{ props.row.usuario.nome }}</q-td>

          <q-td key="quantidade" :props="props">{{ props.row.quantidade }}</q-td>

          <q-td key="tipoContagem" :props="props">{{ props.row.tipoContagem }}</q-td>

          <q-td key="dataContagem" :props="props">{{props.row.dataContagem }}</q-td>

          <q-td key="acoes" :props="props">
            <a @click="excluir(props.row.id)">
             <q-icon name="delete" />
            </a>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'Historico',
  components: {
    // Historico
  },
  data () {
    return {
      filter: '',
      pagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 10
      },
      columns: [
        { name: 'nomeBairro', align: 'center', label: 'Bairro', field: 'bairro', sortable: true },
        { name: 'nomeUsuario', label: 'Usuário', field: 'usuario', sortable: true },
        { name: 'quantidade', label: 'Quant.', field: 'quant', sortable: true },
        { name: 'tipoContagem', label: 'Tipo', field: 'tipoDado', sortable: true },
        { name: 'dataContagem', label: 'Data referente', field: 'dataDado', sortable: true },
        { name: 'acoes', label: 'Ações', field: 'acoes', align: 'center' }
      ],
      data: [],
      showHist: false
    }
  },
  methods: {
    retornaStringData (data) {
      var ano = data.split('-')[0]
      var mes = data.split('-')[1]
      var dia = data.split('-')[2]

      return dia + '/' + mes + '/' + ano
    },

    async excluir (id) {
      const resposta = await this.$swal({
        title: 'Deletar registro ?',
        text: 'Não é possível reverter esta ação.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#3085d6'
      })
      if (!resposta) return ''

      const response = await this.axios.delete(`/admin/estatistica/${id}`)
      response.status >= 200 && response.status < 300 ? this.alertSucesso('Registro removido com sucesso') : this.alertErro('Falha ao remover registro')
    },

    async alertSucesso (mensagem) {
      await this.$swal({
        title: mensagem,
        type: 'success'
      })
      await this.getDados()
    },
    async alertErro (mensagem) {
      await this.$swal({
        title: mensagem,
        type: 'error'
      })
    },

    // editarCand (cpf, candidato) {
    //   this.$router.push(
    //     `/ci/sistsocial/meucantinho-adm/cadastro?cod=${btoa(
    //       cpf
    //     )}&nome=${candidato}`
    //   )
    // },

    // visualizarCand (cpf, candidato) {
    //   this.$router.push(
    //     `/ci/sistsocial/meucantinho-adm/visualizar-cadastro?cod=${btoa(
    //       cpf
    //     )}&nome=${candidato}&flg=1`
    //   )
    // },

    // excluirPgm (id) {
    //   const thisVue = this
    //   this.$swal({
    //     title: 'Atenção!',
    //     text: 'Deseja realmente apagar o candidato?',
    //     type: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'Sim',
    //     cancelButtonText: 'Não'
    //   }).then(function () {
    //     Loading.show()
    //     api
    //       .enviarRequisicao(
    //         'delete',
    //         '/api/sistsocial/meu-cantinho/pgm-habit/' +
    //           id +
    //           '?usuario_resp=' +
    //           localStorage.getItem('usuarioResp')
    //       )
    //       .then(response => {
    //         Loading.hide()
    //         thisVue
    //           .$swal('', 'O candidato foi removido com sucesso', 'success')
    //           .then(function () {
    //             location.reload()
    //           })
    //       })
    //       .catch(function (error) {
    //         Loading.hide()
    //         thisVue.$swal('', 'Nao foi possível remover o candidato.', 'error')
    //         console.log(error)
    //       })
    //   })
    // },
    // abrirComp (id) {
    //   const thisVue = this
    //   Loading.show()
    //   delete axios.defaults.headers.common.Authorization
    //   axios({
    //     url:
    //       window.urlSistSocial +
    //       '/ci/sist_social/api/MeuCantinho/downloadPdf?id=' +
    //       id,
    //     method: 'GET',
    //     responseType: 'blob'
    //   })
    //     .then(response => {
    //       Loading.hide()
    //       this.$swal(
    //         '',
    //         'O comprovante será exibido em uma nova aba do navegador.',
    //         'success'
    //       ).then(function () {
    //         const url = window.URL.createObjectURL(new Blob([response.data]))
    //         window.open(url)
    //       })
    //     })
    //     .catch(function (error) {
    //       Loading.hide()
    //       thisVue.$swal(
    //         'Atenção!',
    //         'Não foi possível baixar o comprovante.',
    //         'info'
    //       )
    //     })
    // },

    // modalHistorico () {
    //   this.showHist = true
    // },

    // guardaUsuario () {
    //   if (this.$route.query.usuario_resp != null) {
    //     localStorage.setItem('usuarioResp', this.$route.query.usuario_resp)
    //   } else {
    //     this.$router.push('/ci/sistsocial/meucantinho/login')
    //   }
    // },

    // verificaToken () {
    //   if (this.$route.query.token != null) {
    //     api
    //       .enviarRequisicao(
    //         'post',
    //         'api/sistsocial/meu-cantinho/valida-prefeitura',
    //         { token: this.$route.query.token }
    //       )
    //       .then(() => {
    //         localStorage.setItem('token', this.$route.query.token)
    //       })
    //       .catch(() => {
    //         this.$router.push('/ci/sistsocial/meucantinho/login')
    //       })
    //   } else {
    //     this.$router.push('/ci/sistsocial/meucantinho/login')
    //   }
    // }
    async getDados () {
      const response = await this.axios.get('/estatistica')
      response.data.forEach(element => {
        element.dataContagem = date.formatDate(element.dataContagem, 'DD/MM/YYYY')
      })
      this.data = response.data
    }
  },
  mounted () {
    this.getDados()

    // this.verificaToken()
    // this.guardaUsuario()

    // api
    //   .enviarRequisicao(
    //     'get',
    //     'api/sistsocial/meu-cantinho/pgm-habit?filters=with(pessoa)'
    //   )
    //   .then(response => {
    //     response.data.dados.forEach(el => {
    //       this.data.push({
    //         inscricao: el.id,
    //         dtInsc:
    //           el.data_inscricao != null
    //             ? this.retornaStringData(el.data_inscricao)
    //             : '',
    //         candidato: el.pessoa.nom_pessoa,
    //         nis: el.pessoa.num_nis_pes,
    //         cpf: el.pessoa.num_cpf_pes,
    //         status: el.status
    //       })
    //     })
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }
}
</script>

<style scope>
a i {
  font-size: 25px !important;
  cursor: pointer !important;
}
a i:hover {
  color: orange !important;
}

</style>
