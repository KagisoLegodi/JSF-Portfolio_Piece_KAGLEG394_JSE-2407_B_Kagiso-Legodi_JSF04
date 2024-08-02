<template>
  <div v-if="product" class="product-detail">
    <img :src="product.image" :alt="product.title" class="product-image" />
    <div class="product-info">
      <h2>{{ product.title }}</h2>
      <p>{{ product.description }}</p>
      <p class="price">${{ product.price }}</p>
      <p>Category: {{ product.category }}</p>
      <p>
        Ratings: {{ product.rating.rate }} (Based on {{ product.rating.count }} reviews)
      </p>
      <button @click="goBack" class="back-button">Go Back to Product List</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetail",
  data() {
    return {
      product: null,
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    this.product = await res.json();
  },
  methods: {
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style>
.product-detail {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 800px;
  margin: 2rem auto;
}

.product-image {
  flex: 1;
  max-width: 300px;
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-info {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.price {
  color: green;
  font-weight: bold;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 0.5rem;
}

.back-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
