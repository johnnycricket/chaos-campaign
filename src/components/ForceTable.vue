<script setup lang="ts">
import { type Force } from '@/types/force'

interface Props {
  forces: Force[]
}

interface Emits {
  (e: 'edit', force: Force): void
  (e: 'delete', force: Force): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Name
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Warchest
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Scale
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Units
          </th>
          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        <tr v-for="force in forces" :key="force.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
            {{ force.name }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            {{ force.warchest }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            {{ force.scale }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            {{ force.units.length }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button
              class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
              @click="emit('edit', force)"
            >
              Edit
            </button>
            <button
              class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
              @click="emit('delete', force)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template> 