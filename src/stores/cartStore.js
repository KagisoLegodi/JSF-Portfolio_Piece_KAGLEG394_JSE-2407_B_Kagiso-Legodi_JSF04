import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [], // Cart items
  }),
  getters: {
    cartItems: (state) => state.items, // Retrieve cart items
    cartItemCount: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0), // Total quantity in cart
    cartTotal: (state) =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ), // Total price in cart
  },
  actions: {
    addToCart(product) {
      const existingItem = this.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++; // Increase quantity if product exists
      } else {
        this.items.push({ ...product, quantity: 1 }); // Add new product to cart
      }
      console.log("Added to cart:", product); // Log the product for debugging
    },
    removeFromCart(productId) {
      const index = this.items.findIndex((item) => item.id === productId);
      if (index !== -1) {
        this.items.splice(index, 1); // Remove product from cart
      }
    },
    updateCartItemQuantity({ productId, quantity }) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity; // Update product quantity
      }
    },
    clearCart() {
      this.items = []; // Clear the cart
    },
  },
});
