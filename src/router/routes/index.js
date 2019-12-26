
/**
 * 路由页面配置
 *
 * meta 标签配置
 * @param {String} title 网站标题
 * @param {String} requireAuth 是否需要登录
 *
 */

const home = () => import('@view/home')
// const about = () => import('@view/about')

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    meta: {
      title: 'Home',
      requireAuth: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: 'Home',
      requireAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@view/about'),
    meta: {
      title: 'about',
      requireAuth: false
    }
  }
]

export default routes
