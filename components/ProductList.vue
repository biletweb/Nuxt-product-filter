<template>
  <!-- <div v-if="!products.length" class="rounded-lg border border-slate-300 bg-slate-100 p-4 text-center uppercase">
    {{ $t('No products') }}
  </div> -->
  <div class="grid grid-cols-5 gap-4">
    <div v-for="product in products" :key="product.id">
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})
</script>
