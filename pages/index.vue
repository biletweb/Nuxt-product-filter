<template>
  <div>
    <div class="my-4 text-3xl font-bold">Hello Nuxt 3</div>
    <NuxtLink :to="switchLocalePath('en')">English</NuxtLink>
    <NuxtLink :to="switchLocalePath('ru')">Russian</NuxtLink>
  </div>
</template>

<script setup>
const switchLocalePath = useSwitchLocalePath()
</script>
