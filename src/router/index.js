import { createRouter, createWebHistory } from 'vue-router'
import SignOn from '../views/SignOn.vue'
import SignUp from '../views/SignUp.vue'
import Index from '../views/Index.vue'
import Cevent from '../views/Cevent.vue'
import Search from '../views/Search.vue'
import Sevent from '../views/Sevent.vue'
import Profile from '../views/Profile.vue'
import Modify from '../views/Modify.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signon',
      component: SignOn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/cevent',
      name: 'cevent',
      component: Cevent
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/sevent',
      name: 'sevent',
      component: Sevent
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/modify',
      name: 'modify',
      component: Modify
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
  ]
})

export default router
