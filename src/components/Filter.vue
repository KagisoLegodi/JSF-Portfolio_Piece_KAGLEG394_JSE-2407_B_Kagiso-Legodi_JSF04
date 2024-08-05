<template>
    <div class="filter">
      <select @change="handleCategoryChange" v-model="selectedCategory">
        <option value=''>All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
  </template>
  
  <script>
  import { ref, watch, onMounted } from 'vue';
  
  export default {
    name: 'Filter',
    props: {
      categories: Array,
      initialCategory: String
    },
    emits: ['update:category'],
    setup(props, { emit }) {
      const selectedCategory = ref(props.initialCategory || '');
  
      const handleCategoryChange = () => {
        emit('update:category', selectedCategory.value);
      };
  
      watch(selectedCategory, () => {
        handleCategoryChange();
      });
  
      return {
        selectedCategory,
        handleCategoryChange
      };
    }
  };
  </script>
  
  <style scoped>
  .filter {
    margin-right: 1rem;
  }
  </style>
  