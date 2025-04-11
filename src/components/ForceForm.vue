<script setup lang="ts">
import { type ForceInput, type ForceType } from '@/types/force'

interface Props {
  modelValue: ForceInput
  title?: string
  submitButtonText?: string
}

interface Emits {
  (e: 'update:modelValue', value: ForceInput): void
  (e: 'submit'): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  title: 'New Force',
  submitButtonText: 'Create Force'
})

const emit = defineEmits<Emits>()

const forceTypes: ForceType[] = ['mech', 'tank', 'infantry']

const handleSubmit = () => {
  emit('submit')
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">{{ title }}</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700">Force Name</label>
        <input
          :value="modelValue.name"
          @input="e => emit('update:modelValue', { ...modelValue, name: (e.target as HTMLInputElement).value })"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700">Type</label>
        <select
          :value="modelValue.type"
          @input="e => emit('update:modelValue', { ...modelValue, type: (e.target as HTMLSelectElement).value as ForceType })"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option
            v-for="type in forceTypes"
            :key="type"
            :value="type"
          >
            {{ type.charAt(0).toUpperCase() + type.slice(1) }}
          </option>
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Point Value</label>
          <input
            :value="modelValue.pointValue"
            @input="e => emit('update:modelValue', { ...modelValue, pointValue: Number((e.target as HTMLInputElement).value) })"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Pilot Skill</label>
          <input
            :value="modelValue.pilotSkill"
            @input="e => emit('update:modelValue', { ...modelValue, pilotSkill: Number((e.target as HTMLInputElement).value) })"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            max="6"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Current Armor</label>
          <input
            :value="modelValue.currentArmor"
            @input="e => emit('update:modelValue', { ...modelValue, currentArmor: Number((e.target as HTMLInputElement).value) })"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Max Armor</label>
          <input
            :value="modelValue.maxArmor"
            @input="e => emit('update:modelValue', { ...modelValue, maxArmor: Number((e.target as HTMLInputElement).value) })"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Current Structure</label>
          <input
            :value="modelValue.currentStructure"
            @input="e => emit('update:modelValue', { ...modelValue, currentStructure: Number((e.target as HTMLInputElement).value) })"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Max Structure</label>
          <input
            :value="modelValue.maxStructure"
            @input="e => emit('update:modelValue', { ...modelValue, maxStructure: Number((e.target as HTMLInputElement).value) })"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Support Cost</label>
          <input
            :value="modelValue.supportCost"
            @input="e => emit('update:modelValue', { ...modelValue, supportCost: Number((e.target as HTMLInputElement).value) })"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Repair Cost</label>
          <input
            :value="modelValue.repairCost"
            @input="e => emit('update:modelValue', { ...modelValue, repairCost: Number((e.target as HTMLInputElement).value) })"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
          />
        </div>
      </div>

      <div class="flex items-center mt-4">
        <input
          :checked="modelValue.isSupport"
          @change="e => emit('update:modelValue', { ...modelValue, isSupport: (e.target as HTMLInputElement).checked })"
          type="checkbox"
          class="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label class="text-sm font-medium text-gray-700">Is Support Unit</label>
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