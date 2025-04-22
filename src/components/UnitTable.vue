<script setup lang="ts">
import { ref } from 'vue';
import type { Unit } from "@/types/unit";
import UnitRepairInfo from '@/components/UnitRepairInfo.vue';

const selectedUnit = ref<Unit | null>(null);
const showRepairDialog = ref(false);

const props = defineProps<{
  units: Unit[];
  forceId: string;
}>();

const emit = defineEmits<{
  (e: "edit", unit: Unit): void;
  (e: "delete", unit: Unit): void;
  (e: "repair", unit: Unit): void;
}>();

const handleUnitClick = (unit: Unit) => {
  selectedUnit.value = unit;
  showRepairDialog.value = true;
};

const handleCloseDialog = () => {
  showRepairDialog.value = false;
  selectedUnit.value = null;
};
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Type
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Point Value
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Status
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Master Unit List
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="unit in units" :key="unit.id">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            <button
              class="text-blue-600 hover:text-blue-800 hover:underline"
              @click="handleUnitClick(unit)"
            >
              {{ unit.name }}
            </button>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ unit.type }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ unit.pointValue }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ unit.status }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <a
              v-if="unit.masterUnitListUrl"
              :href="unit.masterUnitListUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-800"
            >
              View
            </a>
            <span v-else class="text-gray-400">-</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <button
              @click="emit('edit', unit)"
              class="text-blue-600 hover:text-blue-800 mr-4"
            >
              Edit
            </button>
            <button
              @click="emit('delete', unit)"
              class="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <v-dialog
      v-model="showRepairDialog"
      max-width="500px"
      @click:outside="handleCloseDialog"
    >
      <v-card v-if="selectedUnit">
        <v-card-title class="text-h5">
          {{ selectedUnit.name }} - Repair Information
        </v-card-title>
        <v-card-text>
          <UnitRepairInfo :unit="selectedUnit" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            @click="handleCloseDialog"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template> 