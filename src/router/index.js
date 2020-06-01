import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/Register')
  },
  {
    path: '/menuHeader',
    name: 'menuHeader',
    component: () => import('../components/MenuHeader')
  },
  {
    path: '/personalCenter',
    name: 'personalCenter',
    component: () => import('../views/PersonalCenter')
  },
  {
    path: '/blogDetail',
    name: 'blogDetail',
    component: () => import('../components/Blog/BlogDetail')
  },
  {
    path: '/updateBlog',
    name: 'updateBlog',
    component: () => import('../components/Blog/UpdateBlog')
  },
  {
    path: '/blogArea',
    name: 'blogArea',
    component: () => import('../views/BlogArea')
  },
  {
    path: '/setPwd',
    name: 'setPwd',
    component: () => import('../components/SetPwd.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
