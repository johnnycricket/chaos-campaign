<script setup lang="ts">
import { ref, watch } from 'vue';
import { type UnitInput } from '@/types/unit';

interface Props {
  modelValue: Partial<UnitInput>;
  title?: string;
  submitButtonText?: string;
}

interface Emits {
  (e: 'update:modelValue', value: Partial<UnitInput>): void;
  (e: 'submit', value: UnitInput): void;
  (e: 'cancel'): void;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'New Unit',
  submitButtonText: 'Create Unit'
});

const emit = defineEmits<Emits>();

const formData = ref<Partial<UnitInput>>({
  name: '',
  type: 'mech',
  pointValue: 0,
  isSupport: false,
  supportCost: 0,
  currentArmor: 0,
  maxArmor: 0,
  currentStructure: 0,
  maxStructure: 0,
  pilotSkill: 4,
  repairCost: 0,
  status: 'operational',
  tonnage: 0,
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
    emit('submit', formData.value as UnitInput);
  }
};

const validateFormData = (data: Partial<UnitInput>): data is UnitInput => {
  return (
    typeof data.name === 'string' &&
    data.name.trim().length > 0 &&
    ['mech', 'tank', 'infantry'].includes(data.type as string) &&
    typeof data.pointValue === 'number' &&
    data.pointValue >= 0 &&
    typeof data.isSupport === 'boolean' &&
    typeof data.supportCost === 'number' &&
    data.supportCost >= 0 &&
    typeof data.currentArmor === 'number' &&
    data.currentArmor >= 0 &&
    typeof data.maxArmor === 'number' &&
    data.maxArmor >= 0 &&
    typeof data.currentStructure === 'number' &&
    data.currentStructure >= 0 &&
    typeof data.maxStructure === 'number' &&
    data.maxStructure >= 0 &&
    typeof data.pilotSkill === 'number' &&
    data.pilotSkill >= 0 &&
    data.pilotSkill <= 6 &&
    typeof data.repairCost === 'number' &&
    data.repairCost >= 0 &&
    ['operational', 'damaged', 'destroyed', 'repairing'].includes(data.status as string) &&
    typeof data.tonnage === 'number' &&
    data.tonnage >= 0
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
          <label for="name" class="block text-sm font-medium text-gray-700">Unit Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700">Unit Type</label>
          <select
            id="type"
            v-model="formData.type"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="mech">Mech</option>
            <option value="tank">Tank</option>
            <option value="infantry">Infantry</option>
          </select>
        </div>
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            v-model="formData.status"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="operational">Operational</option>
            <option value="damaged">Damaged</option>
            <option value="destroyed">Destroyed</option>
            <option value="repairing">Repairing</option>
          </select>
        </div>
      </div>

      <!-- Combat Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label for="tonnage" class="block text-sm font-medium text-gray-700">Tonnage</label>
          <input
            id="tonnage"
            v-model.number="formData.tonnage"
            type="number"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="pointValue" class="block text-sm font-medium text-gray-700">Point Value</label>
          <input
            id="pointValue"
            v-model.number="formData.pointValue"
            type="number"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="pilotSkill" class="block text-sm font-medium text-gray-700">Pilot Skill</label>
          <input
            id="pilotSkill"
            v-model.number="formData.pilotSkill"
            type="number"
            min="0"
            max="6"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="repairCost" class="block text-sm font-medium text-gray-700">Repair Cost</label>
          <input
            id="repairCost"
            v-model.number="formData.repairCost"
            type="number"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <!-- Armor and Structure -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label for="currentArmor" class="block text-sm font-medium text-gray-700">Current Armor</label>
          <input
            id="currentArmor"
            v-model.number="formData.currentArmor"
            type="number"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="maxArmor" class="block text-sm font-medium text-gray-700">Max Armor</label>
          <input
            id="maxArmor"
            v-model.number="formData.maxArmor"
            type="number"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="currentStructure" class="block text-sm font-medium text-gray-700">Current Structure</label>
          <input
            id="currentStructure"
            v-model.number="formData.currentStructure"
            type="number"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="maxStructure" class="block text-sm font-medium text-gray-700">Max Structure</label>
          <input
            id="maxStructure"
            v-model.number="formData.maxStructure"
            type="number"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <!-- Support Options -->
      <div class="space-y-4">
        <div class="flex items-center">
          <input
            id="isSupport"
            v-model="formData.isSupport"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="isSupport" class="ml-2 block text-sm text-gray-700">Is Support Unit</label>
        </div>

        <div v-if="formData.isSupport">
          <label for="supportCost" class="block text-sm font-medium text-gray-700">Support Cost</label>
          <input
            id="supportCost"
            v-model.number="formData.supportCost"
            type="number"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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