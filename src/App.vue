<template>
  <div id="app">
    <Header />
    <div class="container">
      <router-view :products="products" />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      products: []
    };
  },
  async mounted() {
    const res = await fetch('https://fakestoreapi.com/products');
    this.products = await res.json();
  }
}
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
