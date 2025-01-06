<template>
  <div>
    <div class="mb-4 text-3xl font-bold">Category slug: {{ $route.params.slug }}</div>
  </div>
</template>

<script setup>
useHead({
  title: 'Category slug'
})
</script>
