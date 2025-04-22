<script setup lang="ts">
import { type Unit } from '@/types/force'
import ForceTable from '@/components/ForceTable.vue'

interface Props {
  unit: Unit
}

interface Emits {
  (e: 'edit', unit: Unit): void
  (e: 'delete', unit: { id: string; name: string }): void
  (e: 'add-force', unitId: string): void
  (e: 'edit-force', unitId: string, force: any): void
  (e: 'delete-force', unitId: string, force: any): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="card hover:shadow-lg transition-shadow duration-200">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-xl font-semibold mb-2">{{ unit.name }}</h3>
        <p class="text-gray-600 dark:text-gray-300">
          A sample unit description that would be replaced with actual unit data.
        </p>
      </div>
      <div class="flex space-x-2">
        <button
          class="btn btn-secondary"
          @click="emit('edit', unit)"
        >
          Edit
        </button>
        <button
          class="btn btn-secondary"
          @click="emit('delete', { id: unit.id, name: unit.name })"
        >
          Delete
        </button>
      </div>
    </div>
    <div class="mt-4 grid grid-cols-2 gap-4">
      <div>
        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Scale</h4>
        <p class="mt-1">{{ unit.scale }}</p>
      </div>
      <div>
        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Warchest</h4>
        <p class="mt-1">{{ unit.warchest }}</p>
      </div>
    </div>

    <div class="mt-6">
      <div class="flex justify-between items-center mb-4">
        <h4 class="text-lg font-medium">Forces</h4>
        <button
          class="btn btn-primary"
          @click="emit('add-force', unit.id)"
        >
          Add Force
        </button>
      </div>
      
      <ForceTable
        :forces="unit.forces"
        @edit="force => emit('edit-force', unit.id, force)"
        @delete="force => emit('delete-force', unit.id, force)"
      />
    </div>
  </div>
</template> 