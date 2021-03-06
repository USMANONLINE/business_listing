
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/Index.vue') },
      { path: 'sign-in', name: 'Signin', component: () => import('pages/login') },
      { path: 'business/:id', name: 'Business_View', component: () => import('pages/Business View') }
    ]
  },

  {
    path: '/dashboard',
    name: 'Admin Dashboard',
    component: () => import('layouts/Dashboard'),
    children: [{
      path: 'category',
      name: 'Category',
      component: () => import('pages/dashboard/category')
    }, {
      path: 'listing',
      name: 'listing',
      component: () => import('pages/dashboard/listing')
    }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
