import { createRouter, createWebHistory } from 'vue-router';
import ProductList from './components/ProductList.vue';
import ProductDetail from './components/ProductDetail.vue';
import Login from './components/Login.vue';
import Cart from './components/Cart.vue';
import WishList from './components/WishList.vue';
import ComparisonPage from './views/comparisonPage.vue'; // Import the ComparisonPage component
import { useLoginStore } from './stores/loginStore';

const routes = [
  { path: "/", component: ProductList },
  { path: "/product/:id", component: ProductDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
