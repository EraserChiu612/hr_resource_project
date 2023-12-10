import layout from '@/layout'

export default {
  // 路由信息
  path: '/department',
  component: layout, // 一級路由
  children: [
    {
      path: '', // 二级路由為空,默認顯示1+2
      component: () => import('@/views/department'),
      name: 'department', //用來跳轉與標記路由
      meta: { title: '組織', icon: 'tree' }, //路由信息 (標題,圖標)
    },
  ],
}
