import { defineStore } from 'pinia';

export const useComparisonStore = defineStore('comparison', {
  state: () => ({
    items: [], // Comparison items
  }),
  getters: {
    comparisonItems: (state) => state.items,
  },
  actions: {
    addToComparison(product) {
      const existingItem = this.items.find((item) => item.id === product.id);
      if (!existingItem) {
        this.items.push(product); // Add new product to comparison list
      }
    },
    removeFromComparison(productId) {
      const index = this.items.findIndex((item) => item.id === productId);
      if (index !== -1) {
        this.items.splice(index, 1); // Remove product from comparison list
      }
    },
    clearComparison() {
      this.items = []; // Clear the comparison list
    },
  },
});
