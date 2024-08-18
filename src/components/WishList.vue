<template>
  <div class="p-4 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Your Wishlist</h1>

    <!-- Sorting and Filtering -->
    <div class="mb-4 flex justify-between items-center">
      <select
        v-model="sortOption"
        @change="sortWishlist"
        class="border rounded p-2"
      >
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>
      <input
        v-model="filterQuery"
        @input="filterWishlist"
        type="text"
        placeholder="Search..."
        class="border rounded p-2"
      />
    </div>

    <div v-if="wishlist.length === 0" class="text-center text-gray-500">
      <p>Your wishlist is empty. Start adding products you like!</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="item in filteredWishlist"
        :key="item.id"
        class="bg-white p-4 rounded-lg shadow-md"
      >
        <img
          :src="item.image"
          alt="Product Image"
          class="w-full h-40 object-contain rounded-t-lg"
        />
        <h2 class="text-xl font-semibold mt-2">{{ item.name }}</h2>
        <p class="text-gray-700 mt-1">{{ item.description }}</p>
        <p class="text-lg font-bold mt-2">{{ item.price.toFixed(2) }}</p>

        <div class="flex mt-4 gap-2">
          <button
            @click="removeFromWishlist(item.id)"
            class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            <font-awesome-icon :icon="['fas', 'trash']" />
          </button>
          <button
            @click="addToCart(item)"
            class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            <font-awesome-icon :icon="['fas', 'shopping-cart']" />
          </button>
          <router-link
            :to="`/product/${item.id}`"
            class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            View Details
          </router-link>
        </div>
      </div>
    </div>
    <button
      @click="clearWishlist"
      class="mt-6 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
    >
      Clear Wishlist
    </button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "../stores/cartStore";
import { useWishlistStore } from "../stores/wishlistStore";

export default {
  setup() {
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();

    const wishlist = ref([]);
    const filterQuery = ref("");
    const sortOption = ref("name");

    const fetchWishlist = () => {
      wishlist.value = JSON.parse(localStorage.getItem("wishlist")) || [];
    };

    const removeFromWishlist = (id) => {
      wishlist.value = wishlist.value.filter((item) => item.id !== id);
      localStorage.setItem("wishlist", JSON.stringify(wishlist.value));
      wishlistStore.removeItem(id);
    };

    const addToCart = (item) => {
      cartStore.addItem(item);
      removeFromWishlist(item.id);
    };

    const clearWishlist = () => {
      wishlist.value = [];
      localStorage.removeItem("wishlist");
      wishlistStore.clearWishlist();
    };

    const filteredWishlist = computed(() => {
      let filtered = wishlist.value.filter((item) =>
        item.name.toLowerCase().includes(filterQuery.value.toLowerCase())
      );
      if (sortOption.value === "price") {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else {
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
      return filtered;
    });

    const sortWishlist = () => {
      // Sorting is handled in computed property
    };

    const filterWishlist = () => {
      // Filtering is handled in computed property
    };

    onMounted(fetchWishlist);

    return {
      wishlist,
      removeFromWishlist,
      addToCart,
      clearWishlist,
      filteredWishlist,
      filterQuery,
      sortOption,
      sortWishlist,
      filterWishlist,
    };
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
