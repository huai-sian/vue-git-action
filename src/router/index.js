import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/forgetPsd',
    name: 'ForgetPsd',
    component: () => import('../views/ForgetPsd.vue')
  },
  {
    path: '/resetPsd',
    name: 'ResetPsd',
    component: () => import('../views/ResetPsd.vue')
  },
  {
    path: '/valid',
    name: 'Valid',
    component: () => import('../views/Valid.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'notifications',
        name: 'Notification',
        component: () => import('../views/Notification.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'courses',
        name: 'Courses',
        component: () => import('../views/Courses.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'edit_course',
        component: () => import('../views/EditCourse.vue'),
        children: [
          {
            path: 'basic',
            name: 'Edit1',
            component: () => import('../views/Edit1.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'syllabus',
            name: 'Edit2',
            component: () => import('../views/Edit2.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'pricing',
            name: 'Edit3',
            component: () => import('../views/Edit3.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'online',
            name: 'Edit4',
            component: () => import('../views/Edit4.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'basic/:id',
            name: 'Edit1',
            component: () => import('../views/Edit1.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'syllabus/:id',
            name: 'Edit2',
            component: () => import('../views/Edit2.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'pricing/:id',
            name: 'Edit3',
            component: () => import('../views/Edit3.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'online/:id',
            name: 'Edit4',
            component: () => import('../views/Edit4.vue'),
            meta: { requiresAuth: true }
          },
        ]
      },
    ]
  },
  {
    path: '/',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/all_courses',
        name: 'AllCourse',
        component: () => import('../views/AllCourse.vue'),
      },
      {
        path: '/course/:id',
        name: 'Course',
        component: () => import('../views/Course.vue'),
      },
      {
        path: '/course_main/:vid',
        name: 'Course_main',
        component: () => import('../views/Course_main.vue'),
      },
      {
        path: '/error',
        name: 'Error',
        component: () => import('../views/Error.vue'),
      },
      {
        path: '/checkout/:id',
        name: 'Checkout',
        component: () => import('../views/Checkout.vue'),
      },
      {
        path: '/testedit',
        name: 'Testedit',
        component: () => import('../views/testedit.vue'),
      },
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router;
