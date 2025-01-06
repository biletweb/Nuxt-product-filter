<template>
  <div v-if="error">Произошла ошибка при загрузке данных: {{ error.message }}</div>
  <div v-else>
    <div v-if="data" class="mb-4 text-3xl font-bold">{{ data.categoryName }}</div>
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
  </div>
</template>

<script setup>
useHead({
  title: 'Category slug'
})

const offset = ref(0)
const limit = 10
const categorySlug = useRoute().params.slug

// const { data, error, status } = await useFetch(`http://127.0.0.1:8000/api/categories/${categorySlug}/subcategories`, {
const { data, error, status } = await useLazyFetch(`http://127.0.0.1:8000/api/categories/${categorySlug}/subcategories`, {
  query: {
    offset: offset.value,
    limit: limit
  },
  headers: {
    Accept: 'application/json'
  },
  timeout: 5000
})
</script>
