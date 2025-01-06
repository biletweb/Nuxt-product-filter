<template>
  
  <div class="container mx-auto flex min-h-screen flex-col">
    <Header />
    <main class="my-4 flex-grow">
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
