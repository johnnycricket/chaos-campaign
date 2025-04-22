<script setup lang="ts">
import { type UnitInput, UNIT_SCALES } from '@/types/force'

interface Props {
  modelValue: UnitInput
  title?: string
  submitButtonText?: string
}

interface Emits {
  (e: 'update:modelValue', value: UnitInput): void
  (e: 'submit'): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  title: 'New Unit',
  submitButtonText: 'Create Unit'
})

const emit = defineEmits<Emits>()

const handleSubmit = () => {
  emit('submit')
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">{{ title }}</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700">Unit Name</label>
        <input
          :value="modelValue.name"
          @input="e => emit('update:modelValue', { ...modelValue, name: (e.target as HTMLInputElement).value })"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Scale</label>
          <select
            :value="modelValue.scale"
            @input="e => emit('update:modelValue', { ...modelValue, scale: (e.target as HTMLSelectElement).value as unknown as 1 | 2 | 3 | 4 })"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option
              v-for="scale in UNIT_SCALES"
              :key="scale"
              :value="scale"
            >
              {{ scale }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Warchest</label>
          <input
            :value="modelValue.warchest"
            @input="e => emit('update:modelValue', { ...modelValue, warchest: Number((e.target as HTMLInputElement).value) })"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
          />
        </div>
      </div>

      <div class="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          @click="emit('cancel')"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {{ submitButtonText }}
        </button>
      </div>
    </form>
  </div>
</template> 