<template>
  <div class="rounded-lg border border-slate-300 bg-slate-100 p-4">
    <div class="mb-4 flex items-center justify-between">
      <div class="text-xl font-bold">{{ $t('Create subcategory') }}</div>
      <div v-if="successResponse" class="rounded-lg border border-green-100 bg-green-50 p-1 text-xs text-green-500">
        {{ successResponse }}
      </div>
    </div>
    <form @submit.prevent="">
      <div class="grid grid-cols-2 gap-4">
        <div class="relative">
          <label for="category" class="ms-1 text-sm"> {{ $t('Select category') }}<sup class="text-red-500">*</sup> </label>
          <div class="absolute left-2.5 top-[33px] text-gray-400">
            <Icon name="mingcute:folder-open-line" size="24px" />
          </div>
          <input
            v-model="categoryName"
            type="text"
            name="category"
            id="category"
            :placeholder="$t('Select category')"
            class="w-full rounded-lg border p-2 pl-10 focus:outline-none"
            :class="{
              'focus:border-sky-500': errorField !== 'category',
              'border-red-500': errorField === 'category'
            }"
            @input="handleInput"
          />
          <p v-if="errorField === 'category'" class="ms-1 mt-1 text-xs text-red-500">{{ errorResponse }}</p>
          <ul
            v-if="filteredCategories.length"
            class="absolute z-10 mt-2 max-h-40 w-full overflow-y-auto rounded-lg border bg-white"
          >
            <li
              v-for="cat in filteredCategories"
              :key="cat.id"
              class="cursor-pointer px-4 py-2 hover:bg-sky-100"
              @click="selectCategory(cat)"
            >
              {{ cat.name }}
            </li>
          </ul>
          <ul
            v-else-if="categoryName && !categoryId"
            class="absolute z-10 mt-2 max-h-40 w-full overflow-y-auto rounded-lg border bg-white"
          >
            <li class="px-4 py-2">Ничего не найдено</li>
          </ul>
        </div>
      </div>
    </form>
    <span v-if="categoryId">{{ categoryName }} ID: {{ categoryId }}</span>
  </div>
</template>

<script setup>
const categoryName = ref('')
const categoryId = ref('')
const successResponse = ref(null)
const errorResponse = ref(null)
const errorField = ref(null)
const filteredCategories = ref([])
const categories = ref([
  { id: 1, name: 'Телевизоры' },
  { id: 2, name: 'Приставки' },
  { id: 3, name: 'Холодильники' },
  { id: 4, name: 'Компьютеры' },
  { id: 5, name: 'Смартфоны' },
  { id: 6, name: 'Телефоны' },
  { id: 7, name: 'Мониторы' },
  { id: 8, name: 'Мышки' },
  { id: 9, name: 'Клавиатуры' },
  { id: 10, name: 'Корпуса' }
])

const handleInput = () => {
  categoryId.value = ''
  filterCategories()
}

const filterCategories = () => {
  if (categoryName.value) {
    filteredCategories.value = categories.value.filter((cat) => cat.name.toLowerCase().includes(categoryName.value.toLowerCase()))
  } else {
    filteredCategories.value = []
  }
}

const selectCategory = (category) => {
  categoryName.value = category.name
  categoryId.value = category.id
  filteredCategories.value = []
}
</script>
