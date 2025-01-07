<template>
  {{ product.name }}
  <hr class="my-2" />
  <span>Цена: {{ product.price }}</span>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
