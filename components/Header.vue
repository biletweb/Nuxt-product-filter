<template>
  <header class="rounded-b-lg bg-slate-300 p-4">
    <div class="flex items-center justify-between">
      <span class="text-3xl font-bold text-sky-500">Product Filter</span>
      <div>
        <nav>
          <ul class="flex items-center gap-4">
            <li>
              <div class="text-sky-500 hover:text-sky-600">
                <LangSwitcher />
              </div>
            </li>
            <li>
              <!-- <NuxtLink to="/" class="text-sky-500 hover:text-sky-600" active-class="text-red-500">Home</NuxtLink> -->
              <NuxtLinkLocale to="/" class="text-sky-500 hover:text-sky-600">Home</NuxtLinkLocale>
            </li>
            <li>
              <!-- <NuxtLink to="/categories" class="text-sky-500 hover:text-sky-600" active-class="text-red-500">Categories</NuxtLink> -->
              <NuxtLinkLocale to="/categories" class="text-sky-500 hover:text-sky-600">Categories</NuxtLinkLocale>
            </li>
            <li>
              <!-- <NuxtLink to="/admin" class="text-sky-500 hover:text-sky-600" active-class="text-red-500">Admin</NuxtLink> -->
              <NuxtLinkLocale to="/admin" class="text-sky-500 hover:text-sky-600">Admin</NuxtLinkLocale>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
