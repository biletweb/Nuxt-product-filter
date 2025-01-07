<template>
  <div class="grid grid-cols-5 gap-4">
    <div v-for="category in categories" :key="category.id">
      <NuxtLink :to="`/categories/${category.slug}`">
        <div class="card rounded-lg bg-slate-300 p-4 text-center">
          {{ category.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
})
</script>
