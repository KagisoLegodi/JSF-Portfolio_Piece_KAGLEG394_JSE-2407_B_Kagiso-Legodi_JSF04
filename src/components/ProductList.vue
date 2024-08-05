<template>
  <div>
    <header-component />
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Products</h1>
      <div class="filters">
        <select @change="handleCategoryChange">
          <option value=''>All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>

        <select @change="handleSortChange">
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
import HeaderComponent from './Header.vue';
import ProductSkeleton from './ProductSkeleton.vue';
import { filterProducts, fetchCategories } from '../productUtils';

export default {
  name: 'ProductList',
  components: {
    
    ProductSkeleton,
  },
  data() {
    return {
      loading: true,
      products: [],
      categories: [],
      selectedCategory: '',
      sortOrder: '',
      filteredProducts: []
    };
  },
  mounted() {
    this.initializeData();
  },
  methods: {
    async initializeData() {
      await this.fetchCategories();
      await this.fetchProducts();
    },
    async fetchProducts() {
      try {
        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        this.products = data;
        this.updateFilteredProducts(); // Update filteredProducts after fetching
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async fetchCategories() {
      this.categories = await fetchCategories();
    },
    handleCategoryChange(event) {
      this.selectedCategory = event.target.value;
      this.updateFilteredProducts();
    },
    handleSortChange(event) {
      this.sortOrder = event.target.value;
      this.updateFilteredProducts();
    },
    updateFilteredProducts() {
      this.filteredProducts = filterProducts(this.products, this.selectedCategory, this.sortOrder);
    }
  },
  watch: {
    products: {
      immediate: true,
      handler(newProducts) {
        this.updateFilteredProducts();
      }
    }
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
