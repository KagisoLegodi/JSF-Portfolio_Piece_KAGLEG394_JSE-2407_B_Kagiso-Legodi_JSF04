<template>
    <div class="p-4 max-w-2xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Your Wishlist</h1>
        <div v-if="wishlist.length ===0" class="text-center text-gray-500">
            <p>Your wishlist is empty. Start adding products you like!</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
            v-for="item in wishlist"
            :key="item.id"
            class="bg-white p-4 rounded-lg shadow-md"
            >
            <img
            :src="item.image"
            alt="Product Image"
            class="w-full h-40 object-contain rounded-t-lg"
            />

            </div>

            
        </div>
    </div>
</template>