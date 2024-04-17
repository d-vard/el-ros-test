import {createRouter, createWebHistory} from "vue-router";

import AllMuseums from "@/components/AllMuseums.vue";
import AddMuseum from "@/components/AddMuseum.vue";
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AllMuseums,
    },
    {
      path: '/add-museums',
      component: AddMuseum,
    }
  ]
})
