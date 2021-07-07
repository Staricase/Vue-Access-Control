import Abstract from '../views/common/abstract.vue';

const supper_root = [{
  path: '/',
  name: '首页',
  component: (resolve) => require(['../views/index.vue'], resolve),
  children: [
    {
      path: '/accounts',
      name: '平台-管理员账号管理',
      meta: {
        name: '管理员账号管理'
      },
      component: (resolve) => require(['../views/accounts.vue'], resolve)
    }
  ]
}
];

const admin_route = [{
  path: '/',
  name: '首页',
  component: (resolve) => require(['../views/index.vue'], resolve),
  children: [
    {
      path: '/shop_users',
      name: '平台-店员账号管理',
      meta: {
        name: '店员账号管理'
      },
      component: (resolve) => require(['../views/shop-users.vue'], resolve)
    },
    {
      path: '/goods',
      name: '平台-商品管理',
      meta: {
        name: '商品管理',
      },
      component: (resolve) => require(['../views/goods-list.vue'], resolve)
    }
  ]
}];

export {
  supper_root,
  admin_route,
}

// export default [{
//   path: '/',
//   name: '首页',
//   component: (resolve) => require(['../views/index.vue'], resolve),
//   children: [{
//     path: '/roles',
//     name: '平台-角色管理',
//     meta: {
//       name: '角色管理'
//     },
//     component: (resolve) => require(['../views/roles.vue'], resolve)
//   }, {
//     path: '/accounts',
//     name: '平台-账号管理',
//     meta: {
//       name: '账号管理'
//     },
//     component: (resolve) => require(['../views/accounts.vue'], resolve)
//   }, {
//     path: '/goods',
//     name: '商品管理',
//     meta: {
//       icon: '&#xe62e;'
//     },
//     component: Abstract,
//     children: [{
//       path: 'list',
//       name: '商品信息',
//       meta: {

//       },
//       component: (resolve) => require(['../views/goods-list.vue'], resolve)
//     }]
//   }
//   ]
// }];