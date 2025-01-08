<template>
  <Head>
    <Title>Categories - NUXT 3</Title>
  </Head>
  <ErrorMessage v-if="error" :error="error.statusCode" />
  <div v-else>
    <div class="my-4 text-3xl font-bold">Categories</div>
    <div v-if="status === 'pending'" class="text-center">Loading...</div>
    <CategoryList v-else :categories="data.categories" />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

const { data, error, status } = await useLazyFetch(config.public.backendUrl + `/categories`, {
  timeout: 5000
})
</script>
