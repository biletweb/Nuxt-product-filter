<template>
  <NuxtLinkLocale :to="`/categories/${category.slug}`">
    <div class="rounded-lg bg-slate-300 p-4 text-center">
      {{ category.name }}
    </div>
  </NuxtLinkLocale>
</template>

<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>
