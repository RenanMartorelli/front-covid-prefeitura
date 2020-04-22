<template>
  <div class="q-pa-lg">
    <!-- <q-dialog v-model="showHist" full-width>
      <Historico></Historico>
    </q-dialog> -->
    <h4 class="q-py-none q-my-md">Gestão de Bairros/Regiões</h4>
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
      <template v-slot:top-left>
        <q-btn @click="cadastrarNovo" label="Novo Bairro" icon="add" color="blue"></q-btn>
        <!-- <q-btn @click="modalHistorico" class="q-ml-md" label="Visualizar Histórico" color="blue"></q-btn> -->
      </template>

      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Pesquisar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id}}</q-td>

          <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>

          <q-td key="acoes" :props="props">
            <a @click="editar(props.row.id)">
              <q-icon name="create" />
            </a>
            <a @click="excluir(props.row.id, props.row.nome)">
             <q-icon name="delete" />
            </a>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
// import { Loading } from 'quasar'
// import Historico from './Historico'

export default {
  name: 'Bairros',
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
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true
        },
        {
          name: 'nome',
          align: 'center',
          label: 'Nome do Bairro',
          field: 'nome',
          sortable: true
        },
        { name: 'acoes', label: 'Ações', field: 'acoes', align: 'center' }
      ],
      data: [],
      nome: '',
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

    async cadastrarNovo () {
      const nomeBairro = await this.$swal({
        title: 'Registrar bairro',
        text: 'Digite o nome do bairro a ser registrado',
        input: 'text',
        inputPlaceholder: 'Digite o seu usuário'
      })
      const response = await this.axios.post('/admin/bairro', { nome: nomeBairro })
      response.status >= 200 && response.status < 300
        ? this.alertSucesso('Bairro atualizado com sucesso')
        : this.alertErro('Falha ao atualizar bairro')
    },

    async editar (id) {
      const nomeBairro = await this.$swal({
        title: 'Editar bairro',
        text: 'Digite o novo nome do bairo',
        input: 'text',
        inputPlaceholder: 'Digite o seu usuário'
      })
      const response = await this.axios.put(`/admin/bairro/${id}`, { nome: nomeBairro })
      response.status >= 200 && response.status < 300
        ? this.alertSucesso('Bairro atualizado com sucesso')
        : this.alertErro('Falha ao atualizar bairro')
    },
    async excluir (id, nomeBairro) {
      const resposta = await this.$swal({
        title: `Deletar o bairro "${nomeBairro}" ?`,
        text: 'Não é possível reverter esta ação.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#3085d6'
      })
      if (!resposta) return ''

      const response = await this.axios.delete(`/admin/bairro/${id}`)
      response.status >= 200 && response.status < 300 ? this.alertSucesso('Bairro removido com sucesso') : this.alertErro('Falha ao remover bairro')
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
      const response = await this.axios.get('/admin/bairro')
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
