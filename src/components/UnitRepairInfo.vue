<script setup lang="ts">
import { computed } from 'vue'
import type { Unit } from '@/types/unit'
import { 
  calculateRepairCost, 
  calculateArmorRepairCost, 
  calculateStructureRepairCost, 
  calculateStatusRepairCost,
  needsRepairs,
  getRepairDescription
} from '@/services/repairService'

interface Props {
  unit: Unit
}

const props = defineProps<Props>()

const totalRepairCost = computed(() => calculateRepairCost(props.unit))
const armorRepairCost = computed(() => calculateArmorRepairCost(props.unit))
const structureRepairCost = computed(() => calculateStructureRepairCost(props.unit))
const statusRepairCost = computed(() => calculateStatusRepairCost(props.unit))
const repairDescription = computed(() => getRepairDescription(props.unit))
const hasRepairs = computed(() => needsRepairs(props.unit))

const formatCost = (cost: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'C-Bills',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(cost)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-4">
    <h3 class="text-lg font-semibold mb-3">Repair Information</h3>
    
    <div v-if="!hasRepairs" class="text-green-600 font-medium">
      No repairs needed
    </div>
    
    <div v-else class="space-y-3">
      <div class="text-amber-600 font-medium">
        {{ repairDescription }}
      </div>
      
      <div class="grid grid-cols-2 gap-2 text-sm">
        <div class="font-medium">Armor Repair:</div>
        <div class="text-right">{{ formatCost(armorRepairCost) }}</div>
        
        <div class="font-medium">Structure Repair:</div>
        <div class="text-right">{{ formatCost(structureRepairCost) }}</div>
        
        <div class="font-medium">Status Repair:</div>
        <div class="text-right">{{ formatCost(statusRepairCost) }}</div>
        
        <div class="font-medium border-t pt-1">Total Repair Cost:</div>
        <div class="text-right font-bold border-t pt-1">{{ formatCost(totalRepairCost) }}</div>
      </div>
    </div>
  </div>
</template> 