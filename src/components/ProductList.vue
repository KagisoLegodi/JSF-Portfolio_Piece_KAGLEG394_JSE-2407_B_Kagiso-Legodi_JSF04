<template>
  <div>
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

    <div class="product-list">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <router-link :to="'/product/' + product.id">
          <img :src="product.image" :alt="product.title" class="product-image" />
          <h3 class="title">{{ product.title }}</h3>
          <p class="price">${{ product.price }}</p>
          <p>Category: {{ product.category }}</p>
          <p>Ratings: {{ product.rating.rate }}</p>
          <p>Reviews: {{ product.rating.count }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  props: {
    products: Array
  },
  data() {
    return {
      categories: [],
      selectedCategory: '',
      sortOrder: '',
      filteredProducts: []
    };
  },
  methods: {
    async fetchCategories() {
      const res = await fetch('https://fakestoreapi.com/products/categories');
      this.categories = await res.json();
    },
    handleCategoryChange(event) {
      this.selectedCategory = event.target.value;
      this.filterProducts();
    },
    handleSortChange(event) {
      this.sortOrder = event.target.value;
      this.filterProducts();
    },
    filterProducts() {
      this.filteredProducts = this.products
        .filter(product => this.selectedCategory ? product.category === this.selectedCategory : true)
        .sort((a, b) => {
          if (this.sortOrder === 'low-to-high') return a.price - b.price;
          if (this.sortOrder === 'high-to-low') return b.price - a.price;
          return 0;
        });
    }
  },
  watch: {
    products: {
      immediate: true,
      handler(newProducts) {
        this.filterProducts();
      }
    }
  },
  mounted() {
    this.fetchCategories();
  }
}
</script>

<style>
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
