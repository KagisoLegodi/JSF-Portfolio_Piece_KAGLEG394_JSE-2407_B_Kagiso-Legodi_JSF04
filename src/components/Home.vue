<template>
  <div class="home">
    <!-- Welcome Message -->
    <div class="text-center py-4">
      <h1 class="text-3xl font-bold mb-2 text-white">Welcome to Swifty!</h1>
      <p class="text-lg text-gray-">Explore our exclusive offers and latest products.</p>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-10">
      <p>Loading products...</p>
    </div>

    <!-- Error state -->
    <div v-if="error" class="text-center py-10">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <!-- Carousel of discounted products -->
    <Carousel v-else :items="discountedProducts" />

    <!-- Navigate to Product List Page Button -->
    <div class="text-center mt-8">
      <button
        @click="navigateToProductList"
        class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        View All Products
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import Carousel from "./Carousel.vue"; // Import your carousel component

export default {
  components: { Carousel },
  data() {
    return {
      allProducts: [], // Will be populated with fetched products
      discountedProducts: [], // Products with discounts applied
      loading: true, // Loading state
      error: null, // Error state
    };
  },
  setup() {
    const router = useRouter();

    const navigateToProductList = () => {
      router.push("/products");
    };

    return {
      navigateToProductList,
    };
  },
  async created() {
    await this.fetchProducts();
    this.applyRandomDiscounts();
  },
  methods: {
    async fetchProducts() {
      this.loading = true; // Start loading
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        this.allProducts = await response.json();
      } catch (error) {
        this.error = error.message; // Set error message
      } finally {
        this.loading = false; // End loading
      }
    },
    applyRandomDiscounts() {
      if (this.allProducts.length === 0) return;

      // Select 5 random products
      const selectedProducts = this.allProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

      // Apply random discounts
      this.discountedProducts = selectedProducts.map((product) => {
        const discountPercentage = Math.floor(Math.random() * 50) + 10; // 10% to 60%
        const discountedPrice = product.price * (1 - discountPercentage / 100);
        const saleEndDate = new Date();
        saleEndDate.setDate(
          saleEndDate.getDate() + Math.floor(Math.random() * 30)
        ); // Sale ends in 1-30 days

        return {
          ...product,
          discountPercentage,
          discountedPrice: discountedPrice.toFixed(2),
          saleEndDate: saleEndDate.toLocaleDateString(),
        };
      });
    },
  },
};
</script>

<style scoped>


/* Responsive styling for the carousel */
.home {
  max-width: 1200px;
  margin: auto;
  padding: 1rem;
}
</style>
