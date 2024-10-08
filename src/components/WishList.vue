<template>
  <div class="p-4 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Your Wishlist</h1>
    <div v-if="wishlist.length === 0" class="text-center text-gray-500">
      <p>Your wishlist is empty. Start adding products you like!</p>
    </div>

    <div v-else class="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
      <div
        v-for="item in wishlist"
        :key="item.id"
        class="bg-white p-4 rounded-lg shadow-md"
      >
        <img
          :src="item.image"
          alt="Product Image"
          class="w-full h-40 object-contain rounded-t-lg"
        />
        <h2 class="text-xl font-semibold mt-2">{{ item.title }}</h2>
        <p class="text-gray-700 mt-1">{{ item.description }}</p>
        <p class="text-lg font-bold mt-2 text-green-500">
          ${{ item.price.toFixed(2) }}
        </p>

        <div class="flex mt-4 gap-2">
          <button
            @click="removeFromWishlist(item.id)"
            class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            <font-awesome-icon :icon="['fas', 'trash']" class="text-white" />
          </button>
          <button
            @click="addToCart(item)"
            class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            <font-awesome-icon
              :icon="['fas', 'shopping-cart']"
              class="text-white"
            />
          </button>
        </div>
      </div>
    </div>

    <button
      @click="clearWishlist"
      class="mt-6 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
    >
      Clear Wishlist
    </button>
    <button
      @click="goBack"
      class="mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
    >
      Go Back to Product List
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCartStore } from "../stores/cartStore";
import { useWishlistStore } from "../stores/wishlistStore";

export default {
  setup() {
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();
    const wishlist = ref([]);
    const router = useRouter();
    const route = useRoute();

    // Fetch wishlist from local storage or store
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

    const goBack = () => {
      router.push({ path: "/products", query: route.query });
    };

    onMounted(fetchWishlist);

    return {
      wishlist,
      removeFromWishlist,
      addToCart,
      clearWishlist,
      goBack,
    };
  },
};
</script>
