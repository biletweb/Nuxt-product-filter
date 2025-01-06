<template>
  <div>
    <span class="text-3xl text-sky-500">Category slug: {{ $route.params.slug }}</span>
  </div>
</template>

<script setup>
useHead({
  title: 'Category slug'
})
</script>
