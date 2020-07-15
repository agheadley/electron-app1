import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Master',
      component: require('./views/Master').default
    },
    {
      path: '/block',
      name: 'Block',
      component: require('./views/Block').default
    },
    {
      path: '/staff',
      name: 'Staff',
      component: require('./views/Staff').default
    },
    {
      path: '/room',
      name: 'Room',
      component: require('./views/Room').default
    },
    {
      path: '/settings',
      name: 'Settings',
      component: require('./views/Settings').default
    },
  ]
})