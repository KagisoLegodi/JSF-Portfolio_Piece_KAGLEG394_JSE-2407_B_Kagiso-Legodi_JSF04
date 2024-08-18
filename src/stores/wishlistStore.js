import { defineStore } from "pinia";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
  }),
  actions: {
    addToWishlist(product) {
      if (!this.wishlist.find((item) => item.id === product.id)) {
        this.wishlist.push(product);
        this.updateLocalStorage();
      }
    },
    removeFromWishlist(productId) {
      this.wishlist = this.wishlist.filter((item) => item.id !== productId);
      this.updateLocalStorage();
    },
    isInWishlist(productId) {
      return this.wishlist.some((item) => item.id === productId);
    },
    updateLocalStorage() {
      localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
    },
  },
});
