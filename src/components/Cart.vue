<template>
  <div class="cart-container p-4 mx-auto max-w-screen-lg">
    <h2 class="text-2xl font-bold mb-4">Cart</h2>

    <!-- Display a message if the cart is empty -->
    <div v-if="cartItems.length === 0" class="text-center text-gray-500">
      Your cart is empty.
    </div>

    <!-- Display the cart items if the cart is not empty -->
    <div v-else class="overflow-x-auto">
        <table class="min-w-full text-sm text-left rtl:text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-2 py-3 sm:px-4 sm:py-3">Product name</th>
              <th scope="col" class="px-2 py-3 sm:px-4 sm:py-3">Image</th>
              <th scope="col" class="px-2 py-3 sm:px-4 sm:py-3">Description</th>
              <th scope="col" class="px-2 py-3 sm:px-4 sm:py-3">Price</th>
              <th scope="col" class="px-2 py-3 sm:px-4 sm:py-3">Quantity</th>
              <th scope="col" class="px-2 py-3 sm:px-4 sm:py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-2 py-4 sm:px-4 sm:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ item.title }}
              </th>
              <td class="px-2 py-4 sm:px-4 sm:py-4">
                <img :src="item.image" :alt="item.title" class="w-20 h-auto"/>
              </td>
              <td class="px-2 py-4 sm:px-4 sm:py-4">{{ item.description }}</td>
              <td class="px-2 py-4 sm:px-4 sm:py-4">${{ item.price.toFixed(2) }}</td>
              <td class="px-2 py-4 sm:px-4 sm:py-4">
                <div class="flex items-center space-x-2">
                  <button @click="updateQuantity(item.id, item.quantity - 1)" class="bg-gray-300 text-black py-1 px-2 rounded-lg hover:bg-gray-400 transition-colors">
                    -
                  </button>
                  <span>{{ item.quantity }}</span>
                  <button @click="updateQuantity(item.id, item.quantity + 1)" class="bg-gray-300 text-black py-1 px-2 rounded-lg hover:bg-gray-400 transition-colors">
                    +
                  </button>
                </div>
              </td>
              <td class="px-2 py-4 sm:px-4 sm:py-4">
                <button @click="removeFromCart(item.id)" class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                  Remove
                </button>
                <button @click="addToComparison(item)" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors mt-2">
                  Compare
                </button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Display the cart summary -->
        <div class="mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
          <p>Total Items: {{ cartItemCount }}</p>
          <p class="text-lg font-bold mt-2">Total: ${{ cartTotal.toFixed(2) }}</p>
          <button @click="clearCart" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
            Clear Cart
          </button>
        </div>
      </div>
  </div>

   <!-- Go Back to Products Button -->
   <div class="mt-8 text-center">
        <button @click="goBackToProducts" class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
          Go Back to Products
        </button>
      </div>
</template>
