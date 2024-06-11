import { createRouter, createWebHistory } from 'vue-router';
import PokemonHome from '../views/Home.vue';
import PokemonDetail from '../views/PokemonDetail.vue';

const routes = [
  { path: '/', name: 'Home', component: PokemonHome },
  { path: '/pokemon/:name', name: 'PokemonDetail', component: PokemonDetail, props: true }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
