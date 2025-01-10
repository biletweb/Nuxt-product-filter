<template>
  <div>
    <div class="my-4 text-3xl font-bold dark:text-red-500">Hello Nuxt 3</div>

    <div>
      <select v-model="$colorMode.preference">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  </div>
</template>
