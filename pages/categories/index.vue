<template>
  <Head>
    <Title>Categories - NUXT 3</Title>
  </Head>

  <div class="my-4 text-3xl font-bold">Categories</div>
  <div v-if="status === 'pending'" class="flex justify-center">
    <Icon name="svg-spinners:8-dots-rotate" size="36px" class="text-sky-500" />
  </div>
  <CategoryList v-else-if="data" :categories="data.categories" />
</template>

<script setup>
const config = useRuntimeConfig()

const { data, error, status } = await useLazyFetch(config.public.backendUrl + `/categories`, {
  timeout: 5000
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage || 'Request aborted due to timeout',
    fatal: true
  })
}
</script>
