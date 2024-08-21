<template>
  <div>
    <!-- Clear Comparison List Button -->
    <button
      @click="clearComparison"
      class="bg-red-500 text-white px-4 py-2 rounded"
    >
      Clear Comparison List
    </button>

    <!-- Go Back to Product List Button -->
    <button
      @click="goBack"
      class="mt-4 bg-red-600 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
    >
      Go Back to Product List
    </button>

    <!-- Conditional Table Rendering -->
    <div v-if="comparisonItems.length">
      <table class="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th class="border p-2">Title</th>
            <th class="border p-2">Image</th>
            <th class="border p-2">Description</th>
            <th class="border p-2">Price</th>
            <th class="border p-2">Rating</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in comparisonItems" :key="item.id">
            <td class="border p-2">{{ item.title }}</td>
            <td class="border p-2">
              <img :src="item.image" alt="Product Image" class="w-24 h-auto" />
            </td>
            <td class="border p-2">{{ item.description }}</td>
            <td class="border p-2">${{ item.price.toFixed(2) }}</td>
            <td class="border p-2">{{ item.rating.rate }}</td>
            <td class="border p-2">
              <button
                @click="removeFromComparison(item.id)"
                class="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
              <button
                @click="addToCart(item)"
                class="bg-blue-500 text-white px-2 py-1 rounded mt-1"
              >
                Add to Cart
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center text-gray-500 mt-4">
      No items to compare.
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useComparisonStore } from "../stores/comparisonStore";
import { useCartStore } from "../stores/cartStore";

export default {
  setup() {
    const router = useRouter();
    const comparisonStore = useComparisonStore();
    const cartStore = useCartStore();

    const comparisonItems = computed(() => comparisonStore.comparisonItems);

    const removeFromComparison = (productId) => {
      comparisonStore.removeFromComparison(productId);
    };

    const clearComparison = () => {
      comparisonStore.clearComparison();
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

      console.log(`${product.title} added to cart!`);
    };

    const goBack = () => {
      console.log("Navigating to /products");
      router.push("/products").catch((err) => {
        console.error("Navigation error:", err);
      });
    };

    return {
      comparisonItems,
      removeFromComparison,
      clearComparison,
      addToCart,
      goBack,
    };
  },
};
</script>
