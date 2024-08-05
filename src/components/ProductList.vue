<template>
  <div>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Products</h1>
      <div class="filters">
        <select @change="handleCategoryChange" v-model="selectedCategory">
          <option value=''>All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>

        <select @change="handleSortChange" v-model="sortOrder">
          <option value=''>Default</option>
          <option value='low-to-high'>Price: Low to High</option>
          <option value='high-to-low'>Price: High to Low</option>
        </select>
      </div>

      <div v-if="loading">
        <product-skeleton v-for="n in 3" :key="n" />
      </div>

      <div v-else class="product-list">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <router-link :to="'/product/' + product.id">
            <img :src="product.image" :alt="product.title" class="product-image" />
            <h3 class="title">{{ product.title }}</h3>
            <p class="price">${{ product.price }}</p>
            <p>{{ product.category }}</p>
            <p>Ratings: {{ product.rating.rate }}</p>
            <p>Reviews: {{ product.rating.count }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductSkeleton from './ProductSkeleton.vue';
import { filterProducts, fetchCategories } from '../productUtils';

export default {
  name: 'ProductList',
  components: {
    ProductSkeleton
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const loading = ref(true);
    const products = ref([]);
    const categories = ref([]);
    const selectedCategory = ref(route.query.category || '');
    const sortOrder = ref(route.query.sort || '');

    const filteredProducts = computed(() => {
      return filterProducts(products.value, selectedCategory.value, sortOrder.value);
    });

    const fetchProducts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        products.value = data;
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    const fetchCategoriesData = async () => {
      categories.value = await fetchCategories();
    };

    const handleCategoryChange = () => {
      router.push({ query: { ...route.query, category: selectedCategory.value } });
    };

    const handleSortChange = () => {
      router.push({ query: { ...route.query, sort: sortOrder.value } });
    };

    onMounted(async () => {
      await fetchCategoriesData();
      await fetchProducts();
    });

    watch(() => route.query, (newQuery) => {
      selectedCategory.value = newQuery.category || '';
      sortOrder.value = newQuery.sort || '';
    }, { immediate: true });

    return {
      loading,
      products,
      categories,
      selectedCategory,
      sortOrder,
      filteredProducts,
      handleCategoryChange,
      handleSortChange
    };
  }
};
</script>

<style>
.container {
  max-width: 1200px;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.product-card {
  border: 1px solid #090808;
  padding: 1rem;
  border-radius: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.product-image {
  width: 150px;
  height: auto;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.price {
  color: green;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 1em;
}
</style>
