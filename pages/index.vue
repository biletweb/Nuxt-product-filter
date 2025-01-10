<template>
  <div>
    <div class="my-4 text-3xl font-bold dark:text-red-500">Hello Nuxt 3</div>

    <!-- <div>
      <select v-model="$colorMode.preference">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div> -->

    <div class="relative">
      <div>
        <client-only>
          <Icon
            @click="toggleUserRoleFilter"
            :name="colorMode.value === 'light' ? 'mingcute:sun-line' : 'mingcute:moon-line'"
            size="24px"
            class="cursor-pointer"
          />
        </client-only>
      </div>
      <div v-if="showUserRoleFilter" class="absolute start-4 top-6 z-10 mt-2 rounded-lg border border-slate-300 bg-slate-100">
        <div class="p-2">
          <button
            @click="setColorMode('system')"
            type="button"
            class="flex w-full cursor-pointer items-center rounded-lg px-4 py-2 text-sm hover:bg-slate-50"
          >
            <Icon @click="toggleUserRoleFilter" name="mingcute:computer-line" size="24px" class="me-1" />
            <span>System</span>
          </button>
          <button
            @click="setColorMode('light')"
            type="button"
            class="flex w-full cursor-pointer items-center rounded-lg px-4 py-2 text-sm hover:bg-slate-50"
          >
            <Icon @click="toggleUserRoleFilter" name="mingcute:sun-line" size="24px" class="me-1" />
            <span>Light</span>
          </button>
          <button
            @click="setColorMode('dark')"
            type="button"
            class="flex w-full cursor-pointer items-center rounded-lg px-4 py-2 text-sm hover:bg-slate-50"
          >
            <Icon @click="toggleUserRoleFilter" name="mingcute:moon-line" size="24px" class="me-1" />
            <span>Dark</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const showUserRoleFilter = ref(false)
const colorMode = useColorMode()

const toggleUserRoleFilter = () => {
  showUserRoleFilter.value = !showUserRoleFilter.value
}

const setColorMode = (mode) => {
  colorMode.preference = mode
  toggleUserRoleFilter()
}
</script>
