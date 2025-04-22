<script setup lang="ts">
import { ref, watch } from 'vue';
import { type ForceInput, FORCE_SCALES } from '@/types/force';

interface Props {
  modelValue: Partial<ForceInput>;
  title?: string;
  submitButtonText?: string;
}

interface Emits {
  (e: 'update:modelValue', value: Partial<ForceInput>): void;
  (e: 'submit', value: ForceInput): void;
  (e: 'cancel'): void;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'New Force',
  submitButtonText: 'Create Force'
});

const emit = defineEmits<Emits>();

const formData = ref<Partial<ForceInput>>({
  name: '',
  warchest: 0,
  scale: 1,
  units: [],
  ...props.modelValue,
});

watch(
  () => props.modelValue,
  (newValue) => {
    formData.value = {
      ...formData.value,
      ...newValue,
    };
  },
  { deep: true }
);

watch(
  formData,
  (newValue) => {
    emit('update:modelValue', newValue);
  },
  { deep: true }
);

const handleSubmit = () => {
  if (validateFormData(formData.value)) {
    emit('submit', formData.value as ForceInput);
  }
};

const validateFormData = (data: Partial<ForceInput>): data is ForceInput => {
  return (
    typeof data.name === 'string' &&
    data.name.trim().length > 0 &&
    typeof data.warchest === 'number' &&
    data.warchest >= 0 &&
    typeof data.scale === 'number' &&
    data.scale >= 1 &&
    data.scale <= 4 &&
    Array.isArray(data.units)
  );
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">{{ title }}</h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Force Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="warchest" class="block text-sm font-medium text-gray-700">Warchest</label>
          <input
            id="warchest"
            v-model.number="formData.warchest"
            type="number"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="scale" class="block text-sm font-medium text-gray-700">Scale</label>
          <select
            id="scale"
            v-model.number="formData.scale"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option
              v-for="scale in FORCE_SCALES"
              :key="scale"
              :value="scale"
            >
              {{ scale }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
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