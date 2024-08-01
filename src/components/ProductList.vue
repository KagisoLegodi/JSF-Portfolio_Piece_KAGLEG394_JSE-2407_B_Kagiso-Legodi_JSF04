<template>
    <div>
      <ul>
        <li v-for="product in products" :key="product.id">
          <router-link :to="'/product/' + product.id">{{ product.title }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductList',
    props: {
      products: Array
    }
  }
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  