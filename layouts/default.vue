<template>
  <NuxtLoadingIndicator :height="5" color="#00dc82" :duration="3000" />
  <div class="container mx-auto flex min-h-screen flex-col">
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style>
body {
  background-color: rgb(226 232 240);
}
</style>
