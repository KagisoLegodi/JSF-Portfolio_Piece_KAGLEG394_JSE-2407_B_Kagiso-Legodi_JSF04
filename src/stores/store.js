import { defineStore } from "pinia";

export const useStore = defineStore("mainStore", {
  state: () => ({
    selectedCategory: "",
    sortOrder: "",
  }),
  actions: {
    updateCategory(category) {
      this.selectedCategory = category;
    },
    updateSortOrder(sortOrder) {
      this.sortOrder = sortOrder;
    },
  },
});
