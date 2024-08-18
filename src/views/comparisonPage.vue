<template>
  <div>
    <button
      @click="clearComparison"
      class="bg-red-500 text-white px-4 py-2 rounded"
    >
      Clear Comparison List
    </button>

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
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center text-gray-500 mt-4">
      No items to compare.
    </div>

    <button
      @click="goBack"
      class="bg-blue-500 text-white px-4 py-2 rounded mt-4"
    >
      Go Back to Product List
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router"; // Import useRouter
import { useComparisonStore } from "../stores/comparisonStore";

export default {
  setup() {
    const comparisonStore = useComparisonStore();
    const comparisonItems = computed(() => comparisonStore.comparisonItems);
    const router = useRouter(); // Initialize the router

    const removeFromComparison = (productId) => {
      comparisonStore.removeFromComparison(productId);
    };

    const clearComparison = () => {
      comparisonStore.clearComparison();
    };

    const goBack = () => {
      router.push({ path: "/products" }); // Navigate back to product list
    };

    return {
      comparisonItems,
      removeFromComparison,
      clearComparison,
      goBack, // Return goBack method
    };
  },
};
</script>
