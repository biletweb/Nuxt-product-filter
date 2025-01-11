<template>
  <div class="rounded-lg border border-slate-300 bg-slate-100 p-4">
    <div class="text-xl font-bold">Create category</div>
    <form @submit.prevent="createCategory">
      <div class="relative my-4">
        <label for="name" class="text-sm">Name<sup class="text-red-500">*</sup></label>
        <div class="absolute left-2.5 top-[33px] text-gray-400">
          <Icon name="mingcute:folder-open-line" size="24px" />
        </div>
        <input
          v-model="name"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          class="w-full rounded-lg border p-2 pl-10 focus:outline-none"
          :class="{
            'focus:border-sky-500': errorField !== 'name',
            'border-red-500': errorField === 'name'
          }"
        />
        <p class="text-xs text-red-500">{{ errorResponse }}</p>
      </div>
      <div class="flex justify-end">
        <button type="submit" class="rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600" :disabled="loading">
          <Icon v-if="loading" name="svg-spinners:8-dots-rotate" size="24px" class="flex" />
          <span v-else>Create</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const errorField = ref(null)
const name = ref('')
const loading = ref(false)
const config = useRuntimeConfig()
const successResponse = ref(null)
const errorResponse = ref(null)

const createCategory = async () => {
  if (!name.value) {
    errorResponse.value = 'Название категории не может быть пустым.'
    return
  }
  loading.value = true
  errorField.value = null
  errorResponse.value = null
  successResponse.value = null
  try {
    const response = await $fetch(config.public.backendUrl + `/category/create`, {
      method: 'POST',
      body: {
        name: name.value
      },
      timeout: 5000
    })
    if (response.error) {
      errorResponse.value = response.error
    }
    successResponse.value = response.message
    name.value = ''
  } catch (error) {
    throw createError({
      statusCode: error.statusCode,
      statusMessage: error.response?._data?.name || error.statusMessage || 'Request aborted due to timeout',
      fatal: true
    })
  } finally {
    loading.value = false
  }
}
</script>
