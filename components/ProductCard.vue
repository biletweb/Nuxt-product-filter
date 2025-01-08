<template>
  <div class="flex h-full flex-col rounded-lg border border-slate-300 bg-slate-100 p-4">
    <div class="mb-4 flex items-center justify-between">
      <span class="rounded-lg bg-rose-500 px-2 py-1 text-xs text-white">SALE</span>
      <Icon
        @click="toggleFavorite(product.id)"
        :name="isFavorite ? 'mingcute:heart-fill' : 'mingcute:heart-line'"
        class="text-yellow-500 hover:cursor-pointer"
        size="24px"
      />
    </div>
    <div class="mb-4">
      <NuxtImg src="/tv2.webp" width="210" height="120" />
    </div>
    <div class="mb-4 flex-grow">
      <span class="hover:cursor-pointer hover:text-sky-500">{{ product.name }}</span>
    </div>
    <div class="flex items-end justify-between">
      <div class="flex flex-col">
        <span v-if="product.sale_price" class="text-sm text-slate-400 line-through">{{ product.sale_price }} ₴</span>
        <span class="-mt-1 font-semibold">{{ product.price }} ₴</span>
      </div>
      <Icon
        @click="toggleCart(product.id)"
        :name="isInCart ? 'mingcute:shopping-cart-2-fill' : 'mingcute:shopping-cart-2-line'"
        class="text-green-500 hover:cursor-pointer"
        size="24px"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const isFavorite = ref(false)
const isInCart = ref(false)

const toggleFavorite = (productId) => {
  isFavorite.value = !isFavorite.value
  console.log('Favorite toggled for product ID: ', productId, isFavorite.value)
}

const toggleCart = (productId) => {
  isInCart.value = !isInCart.value
  console.log('Cart toggled for product ID: ', productId, isInCart.value)
}
</script>
