<template>
  <div class="p-4 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Your Wishlist</h1>
    <div v-if="wishlist.length === 0" class="text-center text-gray-500">
      <p>Your wishlist is empty. Start adding products you like!</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <h2 class="text-xl font-semibold mt-2">{{ item.name }}</h2>
        <p class="text-gray-700 mt-1">{{ item.description }}</p>
        <p class="text-lg font-bold mt-2">{{ item.price.toFixed(2) }}</p>

        <div class="flex mt-4 gap-2">
          <button @click="removeFromWishlist(item.id)" class="bg-red-500 hover">
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
  </div>
  <button
    @click="clearWishlist"
    class="mt-6 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
  >
    Clear Wishlist
  </button>
</template>

<script>
import { ref, onMounted } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { fetchModule } from "vite";

//Wishlist store
const wishlistStore = useWishlistStore();
//Cart store
const cartStore = useCartStore();

const wishlist = ref([]);

const fetchWishlist = () => {
  wishlist.value = JSON.parse(localStorage.getItem("wishlist")) || [];
};

onMounted(fetchWishlist);
</script>
