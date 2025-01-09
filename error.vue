<template>
  <div class="flex h-screen items-center justify-center">
    <div class="mx-auto w-6/12 rounded-lg border bg-slate-100 p-4 text-center">
      <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
      <p class="mt-7 text-6xl">Ooops.</p>
      <p class="mt-7 font-semibold text-rose-500">{{ error.message }}</p>
      <button class="my-7 rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600" @click="handleClearError">Go home</button>
    </div>
  </div>
</template>

<script setup>
defineProps(['error'])

const handleClearError = () => clearError({ redirect: '/' })
</script>
