<template>
    <div class="relative overflow-hidden">
      <div class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth" ref="carouselItems">
        <div v-for="item in items" :key="item.id" class="flex-none w-full max-w-sm px-2 py-4 snap-center">
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <img :src="item.image" :alt="item.title" class="w-full h-48 object-contain" />
            <div class="p-4">
              <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
              <p class="flex justify-between items-center mb-2">
                <span class="text-gray-500 line-through">{{ formatPrice(item.price) }}</span>
                <span class="text-red-600 font-bold">{{ formatPrice(item.discountedPrice) }}</span>
              </p>
              <p class="text-red-600 font-semibold mb-2">Save {{ item.discountPercentage }}%</p>
              <p class="text-gray-500 text-sm">Sale ends on: {{ item.saleEndDate }}</p>
              <router-link :to="{ name: 'ProductDetail', params: { id: item.id } }">
                <button class="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">View Details</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      items: Array
    },
    data() {
      return {
        intervalId: null // Store the interval ID for clearing later
      };
    },
    methods: {
      formatPrice(price) {
        return `$${price}`;
      },
      scrollLeft() {
        this.$refs.carouselItems.scrollBy({ left: -300, behavior: 'smooth' });
      },
      scrollRight() {
        this.$refs.carouselItems.scrollBy({ left: 300, behavior: 'smooth' });
      },
      startAutoScroll() {
        this.intervalId = setInterval(() => {
          this.scrollRight();
        }, 3000); // Change 3000 to the desired interval in milliseconds
      },
      stopAutoScroll() {
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
      }
    },
    mounted() {
      this.startAutoScroll();
    },
    beforeDestroy() {
      this.stopAutoScroll();
    }
  };
  </script>
  
  
  