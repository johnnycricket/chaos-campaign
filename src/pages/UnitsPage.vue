<script setup lang="ts">
import { ref } from 'vue'
import UnitForm from '@/components/UnitForm.vue'
import UnitTable from '@/components/UnitTable.vue'
import { useUnitsStore } from '@/stores/units'
import { type UnitInput, type UnitStatus, type Unit, type UnitType } from '@/types/unit'

const unitsStore = useUnitsStore()
const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const showUnitDialog = ref(false)
const selectedUnit = ref<Unit | null>(null)
const isEditingUnit = ref(false)

const editUnit = ref<UnitInput>({
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
  tonnage: 0
})

const newUnit = ref<UnitInput>({
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
  tonnage: 0
})

const handleCreate = (formData: UnitInput) => {
  unitsStore.addUnit(formData)
  
  showCreateDialog.value = false
}

const handleEdit = (formData: UnitInput) => {
  if (selectedUnit.value) {
    unitsStore.updateUnit(selectedUnit.value.id, formData)
  }
  showEditDialog.value = false
  selectedUnit.value = null
}

const handleDelete = (unit: { id: string; name: string }) => {
  if (!confirm(`Are you sure you want to delete ${unit.name}?`)) return
  unitsStore.deleteUnit(unit.id)
}

const openEditDialog = (
  unit: { 
    id: string, name: string, 
    type: UnitType,
    pointValue: number,
    isSupport: boolean,
    supportCost: number,
    currentArmor: number,
    maxArmor: number,
    currentStructure: number,
    maxStructure: number,
    pilotSkill: number,
    repairCost: number,
    status: UnitStatus,
    tonnage: number 
  }) => {
  selectedUnit.value = unit
  editUnit.value = {
    name: unit.name,
    type: unit.type,
    pointValue: unit.pointValue,
    isSupport: false,
    supportCost: unit.supportCost,
    currentArmor: unit.currentArmor,
    maxArmor: unit.maxArmor,
    currentStructure: unit.currentStructure,
    maxStructure: unit.maxStructure,
    pilotSkill: unit.pilotSkill,
    repairCost: unit.repairCost,
    status: unit.status,
    tonnage: unit.tonnage
  }
  showEditDialog.value = true
}

const handleAddUnit = (unitId: string) => {
  selectedUnit.value = unitsStore.getUnit(unitId) || null
  isEditingUnit.value = false
  newUnit.value = {
    name: '',
    type: 'mech' as UnitType,
    pointValue: 0,
    isSupport: false,
    status: 'operational' as UnitStatus,
    tonnage: 0,
    supportCost: 0,
    currentArmor: 0,
    maxArmor: 0,
    currentStructure: 0,
    maxStructure: 0,
    pilotSkill: 4,
    repairCost: 0
  }
  showUnitDialog.value = true
}

const handleEditUnit = (unitId: string, unit: any) => {
  selectedUnit.value = unitsStore.getUnit(unitId) || null
  isEditingUnit.value = true
  newUnit.value = { ...unit }
  showUnitDialog.value = true
}

const handleDeleteUnit = (unitId: string) => {
  const unit = unitsStore.getUnit(unitId)
  if (!unit) return
  
  if (!confirm(`Are you sure you want to delete ${unit.name}?`)) return
  
  unitsStore.updateUnit(unitId, unit)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Units</h1>
      <button
        class="btn btn-primary"
        @click="showCreateDialog = true"
      >
        New Unit
      </button>
    </div>

    <!-- Unit List -->
    <div class="grid grid-cols-1 gap-6">
      <UnitTable
        :units="unitsStore.units"
        @edit="openEditDialog"
        @delete="handleDelete"
        @add-unit="handleAddUnit"
        @edit-unit="handleEditUnit"
        @delete-unit="handleDeleteUnit"
      />
    </div>

    <!-- Create Unit Dialog -->
    <div
      v-if="showCreateDialog"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <UnitForm
        :model-value="newUnit"
        @submit="handleCreate"
        @cancel="showCreateDialog = false"
      />
    </div>

    <!-- Edit Unit Dialog -->
    <div
      v-if="showEditDialog"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <UnitForm
        :model-value="editUnit"
        title="Edit Unit" 
        submit-button-text="Save Changes"
        @submit="handleEdit"
        @cancel="showEditDialog = false"
      />
    </div>
  </div>
</template> 