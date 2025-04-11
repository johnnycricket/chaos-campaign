<script setup lang="ts">
import type { Campaign } from '@/types/campaign'

interface Props {
  modelValue: Omit<Campaign, 'id' | 'battleIds' | 'createdAt' | 'updatedAt'>
}

interface Emits {
  (e: 'update:modelValue', value: Props['modelValue']): void
  (e: 'submit'): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleSubmit = () => {
  emit('submit')
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">New Campaign</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700">Campaign Name</label>
        <input
          :value="modelValue.name"
          @input="e => emit('update:modelValue', { ...modelValue, name: (e.target as HTMLInputElement).value })"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700">Description</label>
        <textarea
          :value="modelValue.description"
          @input="e => emit('update:modelValue', { ...modelValue, description: (e.target as HTMLTextAreaElement).value })"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Employer</label>
          <input
            :value="modelValue.employer"
            @input="e => emit('update:modelValue', { ...modelValue, employer: (e.target as HTMLInputElement).value })"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Unit</label>
          <input
            :value="modelValue.unit"
            @input="e => emit('update:modelValue', { ...modelValue, unit: (e.target as HTMLInputElement).value })"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1 text-gray-700">Planet</label>
        <input
          :value="modelValue.planet"
          @input="e => emit('update:modelValue', { ...modelValue, planet: (e.target as HTMLInputElement).value })"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Contract Type</label>
          <select
            :value="modelValue.contractType"
            @input="e => emit('update:modelValue', { ...modelValue, contractType: (e.target as HTMLSelectElement).value as Campaign['contractType'] })"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Type</option>
            <option value="Raid">Raid</option>
            <option value="Expedition">Expedition</option>
            <option value="Pirate Hunt">Pirate Hunt</option>
            <option value="Garrison">Garrison</option>
            <option value="Invasion">Invasion</option>
            <option value="Retainer">Retainer</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Scale</label>
          <select
            :value="modelValue.scale"
            @input="e => emit('update:modelValue', { ...modelValue, scale: Number((e.target as HTMLSelectElement).value) as Campaign['scale'] })"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Length (months)</label>
          <input
            :value="modelValue.length"
            @input="e => emit('update:modelValue', { ...modelValue, length: Number((e.target as HTMLInputElement).value) })"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="1"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Base Pay (%)</label>
          <input
            :value="modelValue.basePay"
            @input="e => emit('update:modelValue', { ...modelValue, basePay: Number((e.target as HTMLInputElement).value) })"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            max="100"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Transportation (%)</label>
          <input
            :value="modelValue.transportation"
            @input="e => emit('update:modelValue', { ...modelValue, transportation: Number((e.target as HTMLInputElement).value) })"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            max="100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Support (%)</label>
          <input
            :value="modelValue.support"
            @input="e => emit('update:modelValue', { ...modelValue, support: Number((e.target as HTMLInputElement).value) })"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            max="100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Salvage (%)</label>
          <input
            :value="modelValue.salvage"
            @input="e => emit('update:modelValue', { ...modelValue, salvage: Number((e.target as HTMLInputElement).value) })"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            max="100"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Command Type</label>
          <select
            :value="modelValue.commandType"
            @input="e => emit('update:modelValue', { ...modelValue, commandType: (e.target as HTMLSelectElement).value as Campaign['commandType'] })"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Type</option>
            <option value="independent">Independent</option>
            <option value="liason">Liason</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700">Starting Warchest</label>
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
          Create Campaign
        </button>
      </div>
    </form>
  </div>
</template> 