import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Login from '../views/Login.vue'

import Form from '../views/Form.vue'
import FormType from '../views/FormType.vue'
import EditClient from '../views/EditClient.vue'
import EditProduct from '../views/EditProduct.vue'
import Review from '../views/Review.vue'
import Mainpage from '../views/Mainpage.vue'
import register from '../views/Register.vue'
import customerprofile from '../views/CustomerProfile'
import trackpage from '../views/Trackpage.vue'
import reviseproduce from '../views/Reviseproduce.vue'
import upload from '../views/Upload.vue'
import edittrackpage from '../views/EditTrackpage.vue'
import editpersonal from '../views/EditPersonal.vue'


Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false, title: '登入頁' }
  },
  {
    path: '/form',
    name: 'Form',
    component: Form,
    meta: { requiresAuth: true, title: '表單' }
  },
  {
    path: '/formtype',
    name: 'FormType',
    component: FormType,
    meta: { requiresAuth: true, title: '表單' }
  },
  {
    path: '/editclient',
    name: 'EditClient',
    component: EditClient,
    meta: { requiresAuth: true, title: '編輯客戶' }
  },
  {
    path: '/editproduct',
    name: 'EditProduct',
    component: EditProduct,
    meta: { requiresAuth: true, title: '編輯產品' }
  },
  {
    path: '/review',
    name: 'Review',
    component: Review,
    meta: { requiresAuth: true, title: '預覽' }
  },
  {
    path: '/Mainpage',
    name: 'Mainpage',
    component: Mainpage,
    meta: { requiresAuth: true , title:"主頁面"}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: { requiresAuth: false, title: '註冊' }
  },
  {
    path: '/customerprofile',
    name: 'customerprofile',
    component: customerprofile,
    meta: { requiresAuth: true, title: '顧客' }
  },
  {
    path: '/trackpage',
    name: 'trackpage',
    component: trackpage,
    meta: { requiresAuth: true, title: '追蹤' }
  },
  {
    path: '/reviseproduce',
    name: 'reviseproduce',
    component: reviseproduce,
    meta: { requiresAuth: true, title: '追蹤' }
  },
  {
    path: '/upload',
    name: 'upload',
    component: upload,
    meta: { requiresAuth: true, title: '上傳' }
  },
  {
    path: '/edittrackpage',
    name: 'edittrackpage',
    component: edittrackpage,
    meta: { requiresAuth: true, title: '編輯追蹤' }
  },
  {
    path: '/editpersonal',
    name: 'editpersonal',
    component: editpersonal,
    meta: { requiresAuth: true, title: '個人及專案修改' }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {
  // 如果 router 轉跳的頁面需要驗證 requiresAuth: true
  // console.log('to=', to.fullPath, '| from=', from.fullPath);
  if (to.matched.some(record => {
    console.log(record.name, record.meta.requiresAuth, record.meta.title);
    document.title = to.meta.title;
    return record.meta.requiresAuth;
  })) {
    // 如果沒有 token 

    if (store.state.token === '') {
      // 轉跳到 login page
      next({ name: 'Login' });
    } else {
      next(); // 往下繼續執行
    }
  } else {
    next(); // 往下繼續執行
  }
});

