<template>
  <div class="my-4 rounded-lg bg-rose-500 p-4 text-center font-semibold uppercase text-white">
    Произошла ошибка при загрузке данных: {{ error }} {{ error.statusCode }}
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Number,
    required: true
  }
})
</script>
