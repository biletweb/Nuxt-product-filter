<template>
  <div class="grid grid-cols-5 gap-4">
    <div v-for="product in products" :key="product.id">
      <div class="rounded-lg bg-slate-300 p-4">
        {{ product.name }}
        <hr class="my-2" />
        <span>Цена: {{ product.price }}</span>
      </div>
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
