<template>
    <div class="p-4 max-w-2xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Your Wishlist</h1>
        <div v-if="wishlist.length ===0" class="text-center text-gray-500">
            <p>Your wishlist is empty. Start adding products you like!</p>
        </div>
    </div>
</template>