import { createRouter, createWebHistory } from 'vue-router';
import ProductList from './components/ProductList.vue';
import ProductDetail from './components/ProductDetail.vue';
import Login from './components/Login.vue';
import Cart from './components/Cart.vue';
import WishList from './components/WishList.vue';
import ComparisonPage from './views/comparisonPage.vue'; // Import the ComparisonPage component
import { useLoginStore } from './stores/loginStore';
import Home from './components/Home.vue';

const routes = [
  { path: '/', name: 'Home', component: Home},

  { path: '/products', name: 'ProductList', component: ProductList },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true, // Pass route params as props
  },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: WishList,
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: '/comparison',
    name: 'Comparison',
    component: ComparisonPage,
    meta: { requiresAuth: true },
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, _from, next) => {
  // Using a composable for loginStore
  const loginStore = useLoginStore();

  if (to.meta.requiresAuth && !loginStore.isAuthenticated) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }, // Redirect back after login
    });
  } else {
    next();
  }
});

export default router;
