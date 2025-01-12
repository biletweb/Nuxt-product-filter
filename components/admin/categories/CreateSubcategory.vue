<template>
  <div class="rounded-lg border border-slate-300 bg-slate-100 p-4">
    <div class="flex items-center justify-between">
      <div class="text-xl font-bold">{{ $t('Create subcategory') }}</div>
      <div v-if="successResponse" class="rounded-lg border border-green-100 bg-green-50 p-1 text-xs text-green-500">
        {{ successResponse }}
      </div>
    </div>
    <form @submit.prevent="">
      <div class="grid grid-cols-2 gap-4">
        <!-- Поле для ввода категории -->
        <div class="relative">
          <label for="category" class="ms-1 text-sm">
            {{ $t('Select category') }}<sup class="text-red-500">*</sup>
          </label>
          <div class="absolute left-2.5 top-[33px] text-gray-400">
            <Icon name="mingcute:folder-open-line" size="24px" />
          </div>
          <input
            v-model="category"
            type="text"
            name="category"
            id="category"
            :placeholder="$t('Select category')"
            class="w-full rounded-lg border p-2 pl-10 focus:outline-none"
            :class="{
              'focus:border-sky-500': errorField !== 'category',
              'border-red-500': errorField === 'category'
            }"
            @input="filterCategories"
          />
          <!-- Ошибка валидации -->
          <p v-if="errorField === 'category'" class="ms-1 mt-1 text-xs text-red-500">{{ errorResponse }}</p>

          <!-- Список автодополнения -->
          <ul
            v-if="filteredCategories.length > 0"
            class="absolute z-10 mt-2 max-h-40 w-full overflow-y-auto rounded-lg border bg-white"
          >
            <li
              v-for="cat in filteredCategories"
              :key="cat.id"
              class="cursor-pointer px-4 py-2 hover:bg-sky-100"
              @click="selectCategory(cat.name)"
            >
              {{ cat.name }}
            </li>
          </ul>
        </div>

        <!-- Поле для ввода подкатегории -->
        <div v-if="category" class="relative">
          <label for="subcategory" class="ms-1 text-sm">{{ $t('Select subcategory') }}</label>
          <div class="absolute left-2.5 top-[33px] text-gray-400">
            <Icon name="mingcute:folder-open-line" size="24px" />
          </div>
          <input
            v-model="subcategory"
            type="text"
            name="subcategory"
            id="subcategory"
            :placeholder="$t('Select subcategory')"
            class="w-full rounded-lg border p-2 pl-10 focus:outline-none"
            :class="{
              'focus:border-sky-500': errorField !== 'subcategory',
              'border-red-500': errorField === 'subcategory'
            }"
          />
          <p v-if="errorField === 'subcategory'" class="ms-1 mt-1 text-xs text-red-500">{{ errorResponse }}</p>
        </div>

        <!-- Поле для ввода названия -->
        <div class="relative col-span-2">
          <div v-if="category" class="relative">
            <label for="name" class="ms-1 text-sm">{{ $t('Name') }}<sup class="text-red-500">*</sup></label>
            <div class="absolute left-2.5 top-[33px] text-gray-400">
              <Icon name="mingcute:folder-open-line" size="24px" />
            </div>
            <input
              v-model="name"
              type="text"
              name="name"
              id="name"
              :placeholder="$t('Name')"
              class="w-full rounded-lg border p-2 pl-10 focus:outline-none"
              :class="{
                'focus:border-sky-500': errorField !== 'name',
                'border-red-500': errorField === 'name'
              }"
            />
            <p v-if="errorField === 'name'" class="ms-1 mt-1 text-xs text-red-500">{{ errorResponse }}</p>
          </div>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <button type="submit" class="rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600" :disabled="loading">
          <Icon v-if="loading" name="svg-spinners:8-dots-rotate" size="24px" class="flex" />
          <span v-else>{{ $t('Create') }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const category = ref('')
const subcategory = ref('')
const name = ref('')
const loading = ref(false)
const successResponse = ref(null)
const errorResponse = ref(null)
const errorField = ref(null)
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
  { id: 10, name: 'Корпуса' },
])
const filteredCategories = ref([])

// Фильтрация категорий
const filterCategories = () => {
  if (category.value) {
    filteredCategories.value = categories.value.filter(cat =>
      cat.name.toLowerCase().includes(category.value.toLowerCase())
    )
  } else {
    filteredCategories.value = []
  }
}

// Выбор категории
const selectCategory = (name) => {
  category.value = name
  filteredCategories.value = [] // Очистка списка после выбора
}
</script>
