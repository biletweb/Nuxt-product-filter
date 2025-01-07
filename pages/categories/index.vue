<template>
  <Head>
    <Title>Categories</Title>
  </Head>
  <div v-if="error">Произошла ошибка при загрузке данных: {{ error.message }}</div>
  <div v-else>
    <div class="my-4 text-3xl font-bold">Categories</div>
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
const config = useRuntimeConfig()

// const { data, status } = await useFetch(config.public.backendUrl + `/categories`)
const { data, error, status } = await useLazyFetch(config.public.backendUrl + `/categories`)
</script>
