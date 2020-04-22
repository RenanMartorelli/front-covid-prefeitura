<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-light-blue-8 text-white" height-hint="64">
      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          <span class="q-ml-sm">COVID Prefeitura</span>
        </q-toolbar-title>

        <q-space />

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" @click="logout" icon="exit_to_app">
            <q-tooltip>Sair</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notificações</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-white"
      :width="280"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item class="GNL__drawer-item" v-ripple v-for="link in links1" :key="link.text" clickable @click="changeRoute(link.route)">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm" />

          <div class="q-mt-md">
            <div class="flex flex-center q-gutter-xs">
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Privacy">Privacy</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Terms">Terms</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="About">About Google</a>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MenuAdmLayout',
  data () {
    return {
      leftDrawerOpen: false,
      search: '',
      showAdvanced: false,
      showDateOptions: false,
      exactPhrase: '',
      hasWords: '',
      excludeWords: '',
      byWebsite: '',
      byDate: 'Any time',
      links1: [
        { icon: 'pie_chart', text: 'Painel', route: 'painel' },
        { icon: 'input', text: 'Atualizar dados', route: 'estatisticas' },
        { icon: 'announcement', text: 'Notícias', route: 'noticias' },
        { icon: 'person', text: 'Gestão de Usuários', route: 'usuarios' },
        { icon: 'business', text: 'Gestão de Bairros', route: 'bairros' },
        { icon: 'history', text: 'Histórico', route: 'historico' }
      ]
    }
  },
  methods: {
    onClear () {
      this.exactPhrase = ''
      this.hasWords = ''
      this.excludeWords = ''
      this.byWebsite = ''
      this.byDate = 'Any time'
    },
    changeDate (option) {
      this.byDate = option
      this.showDateOptions = false
    },
    changeRoute (route) {
      this.$router.push(`/${route}`)
    },
    logout () {
      // remove auth_token do local storage
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="sass">
.GNL
  &__toolbar
    height: 64px
  &__toolbar-input
    width: 55%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      .q-icon
        color: #5f6368
    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>
