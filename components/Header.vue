<template>
  <header class="rounded-b-lg bg-slate-300 p-4">
    <div class="flex items-center justify-between">
      <span class="text-3xl font-bold text-sky-500">Product Filter</span>
      <div>
        <nav>
          <ul class="flex items-center gap-4">
            <li>
              <!-- <NuxtLink to="/" class="text-sky-500 hover:text-sky-600" active-class="text-red-500">Home</NuxtLink> -->
              <NuxtLink to="/" class="text-sky-500 hover:text-sky-600">Home</NuxtLink>
            </li>
            <li>
              <!-- <NuxtLink to="/categories" class="text-sky-500 hover:text-sky-600" active-class="text-red-500">Categories</NuxtLink> -->
              <NuxtLink to="/categories" class="text-sky-500 hover:text-sky-600">Categories</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
