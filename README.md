# Vue.js Application README

## Overview

This project is a Vue.js application designed to facilitate product comparisons. Users can add products to a comparison list, view them side by side, and manage the list with features such as item limits and table formatting. The application also integrates user authentication for managing comparison lists.

## Features

- **Comparison Page**: Users can compare products side by side.
- **Item Limitation**: Restricts the number of items in the comparison list to maintain table usability.
- **Product Display**: Shows product titles, images, descriptions, prices, and ratings in a comparison table.
- **User Authentication**: Includes JWT-based login and maintains a comparison list for logged-in users.
- **Responsive Design**: The application is optimized for mobile devices with a scrollable comparison table.

## Prerequisites

- Node.js and npm
- Vue CLI (install with `npm install -g @vue/cli` if not already installed)
- Pinia for state management
- Tailwind CSS for styling

## Setup

### 1. Clone the Repository

git clone <https://github.com/your-repo/vue-comparison-app.git>
cd vue-comparison-app

### 2. Install Dependencies

npm install

### 3. Run the Application

bash
npm run serve

Open your browser and navigate to `http://localhost:8080`.

## File Structure

- `src/`
  - `components/`
    - `ComparisonPage.vue`: Manages and displays the comparison table.
    - `ProductList.vue`: Displays a list of products.
    - `ProductDetail.vue`: Shows detailed information about a single product.
  - `stores/`
    - `comparisonStore.js`: Manages the comparison list state using Pinia.
  - `router/index.js`: Configures routing for the application.
  - `App.vue`: Main application component.
  - `main.js`: Entry point for the Vue.js application.

## Comparison Page Component

### Template

Displays a table with product details and comparison actions.

<template>
  <div>
    <button @click="clearComparison" class="bg-red-500 text-white px-4 py-2 rounded">Clear Comparison List</button>
    <div v-if="comparisonItems.length" class="overflow-x-auto mt-4">
      <table class="min-w-full border-collapse">
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
          <tr>
            <td v-for="item in comparisonItems" :key="item.id" class="border p-2">
              <div>{{ item.title }}</div>
            </td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="item.id" class="border p-2">
              <img :src="item.image" alt="Product Image" class="w-24 h-auto mx-auto" />
            </td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="item.id" class="border p-2">
              <div>{{ item.description }}</div>
            </td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="item.id" class="border p-2">
              <div>${{ item.price.toFixed(2) }}</div>
            </td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="item.id" class="border p-2">
              <div>{{ item.rating.rate }} / 5</div>
            </td>
          </tr>
          <tr>
            <td v-for="item in comparisonItems" :key="item.id" class="border p-2 text-center">
              <button @click="removeFromComparison(item.id)" class="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center text-gray-500 mt-4">No items to compare.</div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useComparisonStore } from '../stores/comparisonStore';

export default {
  setup() {
    const comparisonStore = useComparisonStore();
    const maxComparisonItems = 4;

    const comparisonItems = computed(() => comparisonStore.comparisonItems.slice(0, maxComparisonItems));

    const removeFromComparison = (productId) => {
      comparisonStore.removeFromComparison(productId);
    };

    const clearComparison = () => {
      comparisonStore.clearComparison();
    };

    return {
      comparisonItems,
      removeFromComparison,
      clearComparison,
    };
  },
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
}

.table-container::-webkit-scrollbar {
  height: 8px;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #a0aec0; /* gray */
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background-color: #718096; /* darker gray */
}

table {
  min-width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: center;
  border: 1px solid #e2e8f0; /* light gray */
}

th {
  background-color: #edf2f7; /* light gray background */
  font-weight: bold;
}
</style>

## Store Setup

### Comparison Store (Pinia)

import { defineStore } from 'pinia';

export const useComparisonStore = defineStore('comparison', {
state: () => ({
comparisonItems: [],
}),
actions: {
addToComparison(item) {
if (this.comparisonItems.length < 4) {
this.comparisonItems.push(item);
} else {
alert('You can only compare up to 4 items.');
}
},
removeFromComparison(id) {
this.comparisonItems = this.comparisonItems.filter(item => item.id !== id);
},
clearComparison() {
this.comparisonItems = [];
},
},
});

## Authentication

### Login Component

Handles user login with JWT and provides password visibility toggle.

<template>
  <div>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username" required />
      <div>
        <input v-model="password" :type="passwordVisible ? 'text' : 'password'" placeholder="Password" required />
        <button type="button" @click="togglePasswordVisibility">
          {{ passwordVisible ? 'Hide' : 'Show' }}
        </button>
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useLoginStore } from '../stores/loginStore';

export default {
  setup() {
    const loginStore = useLoginStore();
    const username = ref('');
    const password = ref('');
    const passwordVisible = ref(false);
    const errorMessage = ref('');

    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value;
    };

    const login = async () => {
      try {
        await loginStore.login(username.value, password.value);
        // Redirect or other post-login actions
      } catch (error) {
        errorMessage.value = 'Login failed. Please check your credentials.';
      }
    };

    return {
      username,
      password,
      passwordVisible,
      errorMessage,
      togglePasswordVisibility,
      login,
    };
  },
};
</script>

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to enhance the application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
