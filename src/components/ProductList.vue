<template>
  <div>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4 text-center animate-bounce text-white">Swifty</h1>

      <div class="filters">
        <Filter
          :categories="categories"
          :initialCategory="selectedCategory"
          @update:category="handleCategoryChange"
        />
        <Sort :initialSort="sortOrder" @update:sort="handleSortChange" />
      </div>

      <div v-if="loading">
        <ProductSkeleton v-for="n in 3" :key="n" />
      </div>

      <div v-else class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="flex flex-col max-h-[130rem] max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden"
        >
          <img
            :src="product.image"
            :alt="product.title"
            class="object-contain h-48 mt-3"
          />
          <div class="flex-1 flex flex-col p-6">
            <header class="mb-2 flex-2">
              <h5
                class="text-lg line-clamp-2 font-extrabold leading-snug text-slate-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
              >
                {{ product.title }}
              </h5>
            </header>
            <div class="flex items-center mt-2.5 mb-5">
              <!-- Rating stars -->
              <div class="flex items-center space-x-1">
                <svg
                  v-for="star in 1"
                  :key="star"
                  class="w-4 h-4"
                  :class="{
                    'text-yellow-300': star <= Math.floor(product.rating.rate),
                    'text-gray-300': star > Math.floor(product.rating.rate),
                  }"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
              </div>
              <span
                class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"
              >
                {{ product.rating.rate }}
              </span>
              <span
                class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"
              ></span>
              <a
                href="#"
                class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
              >
                {{ product.rating.count }} reviews
              </a>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-3xl font-bold text-green-500 dark:text-white">
                ${{ product.price.toFixed(2) }}
              </span>
              <!-- Cart Icon (only shown when logged in) -->
              <button
                class="text-white bg-gray-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click.stop="addToCart(product)"
                :disabled="product.addedToCart"
              >
                <font-awesome-icon
                  :icon="['fas', 'shopping-cart']"
                  class="text-white"
                />
              </button>
              <!-- Wishlist Icon (only shown when logged in) -->
              <button
                class="text-white bg-gray-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                @click.stop="toggleWishlist(product)"
                :class="{ '': isInWishlist(product.id) }"
              >
                <font-awesome-icon :icon="['fas', 'star']" class="text-white" />
              </button>
              <!-- Product Info Button (navigates to details page) -->
              <button
                class="text-white bg-gray-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                @click="goToProductDetails(product.id)"
              >
                <font-awesome-icon
                  :icon="['fas', 'info-circle']"
                  class="text-white"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProductSkeleton from "./ProductSkeleton.vue";
import Filter from "./Filter.vue";
import Sort from "./Sort.vue";
import { filterProducts, fetchCategories } from "../productUtils";
import { useCartStore } from "../stores/cartStore";
import { useLoginStore } from "../stores/loginStore";
import { useWishlistStore } from "../stores/wishlistStore";

export default {
  name: "ProductList",
  components: {
    ProductSkeleton,
    Filter,
    Sort,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const loading = ref(true);
    const products = ref([]);
    const categories = ref([]);
    const selectedCategory = ref(route.query.category || "");
    const sortOrder = ref(route.query.sort || "default"); // Default to "default"
    const cartStore = useCartStore();
    const loginStore = useLoginStore();
    const wishlistStore = useWishlistStore();

    const isLoggedIn = computed(() => loginStore.isAuthenticated);

    const filteredProducts = computed(() => {
      return filterProducts(
        products.value,
        selectedCategory.value,
        sortOrder.value
      );
    });

    const fetchProducts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        products.value = data.map((product) => ({
          ...product,
          addedToCart: false,
        }));
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    const fetchCategoriesData = async () => {
      categories.value = await fetchCategories();
    };

    const handleCategoryChange = (newCategory) => {
      selectedCategory.value = newCategory;
      router.push({ query: { ...route.query, category: newCategory } });
    };

    const handleSortChange = (newSort) => {
      sortOrder.value = newSort;
      router.push({ query: { ...route.query, sort: newSort } });
    };

    const addToCart = (product) => {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        categories: product.categories,
        quantity: 1,
      };

      cartStore.addToCart(cartItem);

      product.addedToCart = true;

      setTimeout(() => {
        product.addedToCart = false;
      }, 1000);

      console.log(`${product.title} added to cart!`);
    };

    const toggleWishlist = (product) => {
      if (wishlistStore.isInWishlist(product.id)) {
        wishlistStore.removeFromWishlist(product.id);
      } else {
        wishlistStore.addToWishlist(product);
      }
    };

    const isInWishlist = (productId) => {
      return wishlistStore.isInWishlist(productId);
    };

    const goToProductDetails = (productId) => {
      router.push({ name: "ProductDetail", params: { id: productId } });
    };

    onMounted(() => {
      fetchProducts();
      fetchCategoriesData();
    });

    return {
      loading,
      products,
      categories,
      selectedCategory,
      sortOrder,
      filteredProducts,
      handleCategoryChange,
      handleSortChange,
      addToCart,
      isLoggedIn,
      toggleWishlist,
      isInWishlist,
      goToProductDetails,
    };
  },
};
</script>

<style>
.container {
  max-width: 1200px;
}

.filters {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}
.container {
  padding: 1rem;
  max-width: 1200px;
  margin: auto;
}
.grid {
  gap: 1rem;
}
</style>
