<template>
  <div class="mb-4 text-3xl font-bold">Categories</div>
  <div v-if="status === 'pending'" class="text-center">Loading...</div>
  <div v-else class="grid grid-cols-5 gap-4">
    <div v-for="category in data.categories" :key="category.id">
      <NuxtLink :to="`/categories/${category.id}`">
        <div class="card rounded-lg bg-slate-300 p-4 text-center">
          {{ category.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Categories'
})

const { data, status } = await useFetch('http://127.0.0.1:8000/api/categories')
// const { data, status } = await useLazyFetch('http://127.0.0.1:8000/api/categories')
</script>
