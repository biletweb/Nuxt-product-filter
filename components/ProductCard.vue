<template>
  <div class="rounded-lg bg-slate-300 p-4">
    {{ product.name }}
    <hr class="my-2" />
    <span>Цена: {{ product.price }}</span>
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