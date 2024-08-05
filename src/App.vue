<template>
  <div id="app">
    <Header />
    <div class="container">
      <router-view :products="products" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import Header from './components/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header
  },
  setup() {
    const products = ref([]);

    onMounted(async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        products.value = await res.json();
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    });

    return {
      products
    };
  }
});
</script>

<style>
header {
  background-color: #f8f8f8;
  padding: 1em;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2em;
}
</style>
