<template>
    <q-table
        :data="dados"
        :columns="columns"
        row-key="name"
    />
</template>

<script>
export default {
  name: 'tabelaDadosBairro',
  data () {
    return {
      columns: [
        { name: 'nomeBairro', align: 'left', label: 'Nome do bairro/região', field: 'nomeBairro', sortable: true },
        { name: 'recuperados', align: 'left', label: 'Recuperados', field: 'recuperados', sortable: true },
        { name: 'suspeitos', align: 'left', label: 'Suspeitos', field: 'suspeitos', sortable: true },
        { name: 'confirmados', align: 'left', label: 'Confirmados', field: 'confirmados', sortable: true },
        { name: 'obitos', align: 'left', label: 'Óbitos', field: 'obitos', sortable: true }
      ]
    }
  },
  props: {
    dados: Array
  },
  methods: {

  },
  mounted () {

  }
}
</script>
