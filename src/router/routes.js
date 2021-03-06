
const routes = [
  {
    path: '/menu-adm',
    component: () => import('layouts/MenuAdmLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: '/usuarios', component: () => import('pages/usuarios/Usuarios.vue') },
      { path: '/usuarios/editar', component: () => import('pages/usuarios/UsuariosForm.vue') },
      { path: '/historico', component: () => import('pages/Historico.vue') },
      { path: '/bairros', component: () => import('pages/Bairros.vue') },
      { path: '/noticias', component: () => import('pages/Noticias.vue') },
      { path: '/estatisticas', component: () => import('pages/Estatisticas.vue') },
      { path: '/painel', component: () => import('pages/publicas/Dados.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('components/Login.vue')
  },
  {
    path: '/',
    component: () => import('layouts/Painel.vue'),
    children: [
      { path: '/comunicados', component: () => import('pages/publicas/Comunicados.vue') },
      { path: '/', component: () => import('pages/publicas/Dados.vue') }
    ]
  }

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
