<template>
  <div class="rounded-lg border border-slate-300 bg-slate-100 p-4">
    <div class="mb-4 flex items-center justify-between">
      <span class="rounded-lg bg-rose-500 px-2 py-1 text-xs text-white">SALE</span>
      <Icon name="mingcute:heart-line" class="text-yellow-500 hover:cursor-pointer hover:text-yellow-600" size="24px" />
    </div>
    <div class="mb-4">
      <NuxtImg src="/tv2.webp" width="210" height="120" />
    </div>
    <div class="mb-4">
      {{ product.name }}
    </div>
    <div class="flex items-end justify-between">
      <div class="flex flex-col">
        <span class="text-sm text-slate-400 line-through">{{ product.price }} ₴</span>
        <span class="-mt-1 font-semibold">{{ product.price }} ₴</span>
      </div>
      <Icon name="mingcute:shopping-cart-2-line" class="text-green-500 hover:cursor-pointer hover:text-green-600" size="24px" />
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
</script>
