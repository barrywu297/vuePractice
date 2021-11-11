import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

export const customPlayerRoutes: RouteConfig = {
  path: '/customPlayers',
  component: Layout,
  meta: {
    title: 'customPlayerMgt', // i18n信息需要额外处理
    icon: 'peoples'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/customPlayers/list.vue'),
      meta: {
        title: 'customPlayerList',
        icon: 'players'
      }
    },
    {
      path: 'create',
      component: () => import('@/views/customPlayer/create.vue'),
      meta: {
        title: 'createCustomPlayer',
        icon: 'edit'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/customPlayer/edit.vue'),
      meta: {
        title: 'editCustomPlayer',
        hidden: true, // 不需要导航菜单
        noCache: true, // tags页签中应该多个，不应该缓存
        activeMenu: '/customPlayer/list' // 左侧导航菜单相关激活url
      }
    }
  ]
}
