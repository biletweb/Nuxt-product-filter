<template>
  <div class="rounded-lg border border-slate-300 bg-slate-100 p-4">
    <div class="flex items-center justify-between">
      <div class="text-xl font-bold">Create category</div>
      <div v-if="successResponse" class="rounded-lg border border-green-100 bg-green-50 p-1 text-xs text-green-500">
        {{ successResponse }}
      </div>
    </div>
    <form @submit.prevent="createCategory">
      <div class="grid grid-cols-2 gap-4">
        <div class="relative">
          <label for="name" class="text-sm">Name<sup class="text-red-500">*</sup></label>
          <div class="absolute left-2.5 top-[33px] text-gray-400">
            <Icon name="mingcute:folder-open-line" size="24px" />
          </div>
          <input
            v-model="data.category.name"
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
          <p v-if="errorField === 'name'" class="text-xs text-red-500">{{ errorResponse }}</p>
        </div>
        <div class="relative">
          <label for="name" class="text-sm">Slug</label>
          <div class="absolute left-2.5 top-[33px] text-gray-400">
            <Icon name="mingcute:copy-3-line" size="24px" />
          </div>
          <input
            v-model="data.category.slug"
            type="text"
            name="slug"
            id="slug"
            placeholder="Slug"
            class="w-full rounded-lg border p-2 pl-10 focus:outline-none"
            :class="{
              'focus:border-sky-500': errorField !== 'slug',
              'border-red-500': errorField === 'slug'
            }"
          />
          <p v-if="errorField === 'slug'" class="text-xs text-red-500">{{ errorResponse }}</p>
        </div>
        <div class="relative col-span-2">
          <label for="description" class="text-sm">Description SEO<sup class="text-red-500">*</sup></label>
          <div class="absolute left-2.5 top-[33px] text-gray-400">
            <Icon name="mingcute:information-line" size="24px" />
          </div>
          <textarea
            v-model="data.category.description"
            name="description"
            id="description"
            placeholder="Description"
            class="min-h-[42px] w-full rounded-lg border p-2 pl-10 focus:outline-none"
            :class="{
              'focus:border-sky-500': errorField !== 'description',
              'border-red-500': errorField === 'description'
            }"
            rows="2"
          />
          <p v-if="errorField === 'description'" class="text-xs text-red-500">{{ errorResponse }}</p>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <button type="submit" class="rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600" :disabled="loading">
          <Icon v-if="loading" name="svg-spinners:8-dots-rotate" size="24px" class="flex" />
          <span v-else>Create</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const data = reactive({
  category: {
    name: '',
    slug: '',
    description: ''
  }
})
const config = useRuntimeConfig()
const loading = ref(false)
const successResponse = ref(null)
const errorResponse = ref(null)
const errorField = ref(null)

const createCategory = async () => {
  loading.value = true
  errorField.value = null
  errorResponse.value = null
  successResponse.value = null
  try {
    const response = await $fetch(config.public.backendUrl + `/category/create`, {
      method: 'POST',
      body: {
        name: data.category.name,
        slug: data.category.slug,
        description: data.category.description
      },
      timeout: 5000
    })
    if (response.error) {
      errorResponse.value = response.error
      errorField.value = response.field
    } else {
      successResponse.value = response.message
      data.category.name = ''
      data.category.slug = ''
      data.category.description = ''
    }
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
