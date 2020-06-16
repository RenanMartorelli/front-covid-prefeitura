<template>
  <q-layout class="bg-grey-1">
    <q-header elevated class="bg-grey-2 text-black" height-hint="61.59">
      <q-toolbar class="q-py-sm toolbar">
          <span class="titulo">COVID-MAUÁ</span>
        <q-space />

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
                    <div class="GL__toolbar-link q-ml-xs q-gutter-xl text-body1 text-weight-bold row items-center no-wrap">
          <span @click="selecionado = 'dados';  $router.push('/')" v-bind:class="{selecionado : selecionado == 'dados'}" class="text-dark link">
            Dados Oficiais
          </span>
          <span @click="selecionado = 'comunicados'; $router.push('/comunicados')" v-bind:class="{selecionado : selecionado == 'comunicados'}" class="text-dark link">
            Comunicados
          </span>
        </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="row q-pb-xs justify-center">
          <div class="col-11 col-md-10">
      <router-view />
          </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { fabGithub } from '@quasar/extras/fontawesome-v5'
const stringOptions = [
  'quasarframework/quasar',
  'quasarframework/quasar-awesome'
]
export default {
  name: 'Painel',
  data () {
    return {
      text: '',
      selecionado: 'dados',
      options: null,
      filteredOptions: []
    }
  },
  methods: {
    filter (val, update) {
      if (this.options === null) {
        // load data
        setTimeout(() => {
          this.options = stringOptions
          this.$refs.search.filter('')
        }, 2000)
        update()
        return
      }
      if (val === '') {
        update(() => {
          this.filteredOptions = this.options.map(op => ({ label: op }))
        })
        return
      }
      update(() => {
        this.filteredOptions = [
          {
            label: val,
            type: 'In this repository'
          },
          {
            label: val,
            type: 'All GitHub'
          },
          ...this.options
            .filter(op => op.toLowerCase().includes(val.toLowerCase()))
            .map(op => ({ label: op }))
        ]
      })
    }
  },
  created () {
    this.fabGithub = fabGithub
  }
}
</script>
<style>
</style>
<style lang="sass">

.link
  cursor: pointer

.selecionado
  color: #1976D2 !important

.toolbar
    max-width: 60%
    margin: auto

.titulo
    font-weight: 500
    font-size: 2em

@media screen and (max-width: 1023px)
  .toolbar
    max-width: 100%

  .titulo
    font-weight: 500
    font-size: 1.4em

.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden
    &:hover
      background: #0366d6
      .q-item__section--side
      .default-type
        visibility: visible
  &__toolbar-link
    a
      text-decoration: none
      &:hover
        opacity: 0.7
  &__menu-link:hover
    background: #0366d6
  &__menu-link-signed-in
  &__menu-link-status
    &:hover
      & > div
        background: white !important
  &__menu-link-status
    &:hover
  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>
