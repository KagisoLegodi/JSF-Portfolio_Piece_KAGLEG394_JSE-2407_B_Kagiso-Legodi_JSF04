<template>
    <div v-if="product">
      <div class="modal">
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductDetail',
    data() {
      return {
        product: null
      };
    },
    async mounted() {
      const id = this.$route.params.id;
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      this.product = await res.json();
    }
  }
  </script>
  
  <style>
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2em;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  