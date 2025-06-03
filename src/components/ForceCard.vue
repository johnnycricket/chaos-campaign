<script setup lang="ts">
import { type Force } from '@/types/force'
import ForceTable from '@/components/ForceTable.vue'

interface Props {
  force: Force
}

interface Emits {
  (e: 'edit', force: Force): void
  (e: 'delete', force: Force): void
  (e: 'add-force', forceId: string): void
  (e: 'edit-force', forceId: string, force: any): void
  (e: 'delete-force', forceId: string, force: any): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="card hover:shadow-lg transition-shadow duration-200">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-xl font-semibold mb-2">{{ force.name }}</h3>
        <p class="text-gray-600 dark:text-gray-300">
          A sample force description that would be replaced with actual force data.
        </p>
      </div>
      <div class="flex space-x-2">
        <button
          class="btn btn-secondary"
          @click="emit('edit', force)"
        >
          Edit
        </button>
        <button
          class="btn btn-secondary"
          @click="emit('delete', force)"
        >
          Delete
        </button>
      </div>
    </div>
    <div class="mt-4 grid grid-cols-2 gap-4">
      <div>
        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Scale</h4>
        <p class="mt-1">{{ force.scale }}</p>
      </div>
      <div>
        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Warchest</h4>
        <p class="mt-1">{{ force.warchest }}</p>
      </div>
    </div>

    <div class="mt-6">
      <div class="flex justify-between items-center mb-4">
        <h4 class="text-lg font-medium">Forces</h4>
        <button
          class="btn btn-primary"
          @click="emit('add-force', force.id)"
        >
          Add Force
        </button>
      </div>
      
      <ForceTable
        :forces="force"
        @edit="force => emit('edit-force', force.id, force)"
        @delete="force => emit('delete-force', force.id, force)"
      />
    </div>
  </div>
</template> 