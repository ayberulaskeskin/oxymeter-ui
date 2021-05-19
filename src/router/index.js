import Vue from 'vue'
import VueRouter from 'vue-router'
//import store from '../store'

Vue.use(VueRouter)

function lazyLoad(view) {
  return () => import(`../views/${view}.vue`)
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: lazyLoad('Login'),
    meta: {
      authorize: []
    }
  },
  {
    path: '/',
    name: 'Home',
    component: lazyLoad('Home'),
    meta: {
      authorize: []
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: lazyLoad('Register'),
    meta: {
      authorize: []
    }
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (authorize) {
    if (!currentUser) {
      if(to.path === '/register'){
        return next();
      } else{
        if(to.path !== '/login'){
          return next({ path: '/login', query: { returnUrl: to.path } })
        }
      }
    }
  }
  next()
})

export default router
