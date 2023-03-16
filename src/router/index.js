import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

// createRouter 创建路由实例
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home    // 明细
    },
    {
      path: '/data',
      name: 'Data',
      component: () => import('../views/Data.vue')  // 统计
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('../views/User1.vue')  // 我的
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login1.vue')  // 登录
    },
    {
      path: '/detail',
      name: 'Detail',
      component: () => import('../views/Detail.vue') // 账单详情
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About1.vue')  // 我的-关于我们
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('../views/Account1.vue')  // 我的-账户设置
    },
    {
      path: '/components-demo',
      name: 'ComponentDemo',
      component: () => import('../views/ComponentsDemo.vue')
    }
  ]
})

export default router