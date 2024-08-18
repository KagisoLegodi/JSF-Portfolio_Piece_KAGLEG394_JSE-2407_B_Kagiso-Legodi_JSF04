<template>
  <div class="cart-container p-4 mx-auto max-w-screen-lg">
    <h2 class="text-2xl font-bold mb-4">Cart</h2>

    <!-- Display a message if the cart is empty -->
    <div v-if="cartItems.length === 0" class="text-center text-gray-500">
      Your cart is empty.
    </div>
  </div>
</template>
