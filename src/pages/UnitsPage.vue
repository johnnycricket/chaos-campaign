<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UnitForm from '@/components/UnitForm.vue'
import UnitCard from '@/components/UnitCard.vue'
import ForceForm from '@/components/ForceForm.vue'
import { useUnitsStore } from '@/stores/units'
import { type UnitInput } from '@/types/force'
import { type ForceInput, createForce } from '@/types/unit'

const router = useRouter()
const unitsStore = useUnitsStore()
const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const showForceDialog = ref(false)
const selectedUnit = ref<{ id: string; name: string; warchest: number; scale: number } | null>(null)
const selectedForce = ref<any | null>(null)
const isEditingForce = ref(false)

const newUnit = ref<UnitInput>({
  name: '',
  warchest: 0,
  scale: 1,
  forces: []
})

const editUnit = ref<UnitInput>({
  name: '',
  warchest: 0,
  scale: 1,
  forces: []
})

const newForce = ref<ForceInput>({
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
  repairCost: 0
})

const handleCreate = () => {
  unitsStore.addUnit(newUnit.value)
  newUnit.value = {
    name: '',
    warchest: 0,
    scale: 1,
    forces: []
  }
  showCreateDialog.value = false
}

const handleEdit = () => {
  if (selectedUnit.value) {
    unitsStore.updateUnit(selectedUnit.value.id, editUnit.value)
  }
  showEditDialog.value = false
  selectedUnit.value = null
}

const handleDelete = (unit: { id: string; name: string }) => {
  if (!confirm(`Are you sure you want to delete ${unit.name}?`)) return
  unitsStore.deleteUnit(unit.id)
}

const openEditDialog = (unit: { id: string; name: string; warchest: number; scale: number }) => {
  selectedUnit.value = unit
  editUnit.value = {
    name: unit.name,
    warchest: unit.warchest,
    scale: unit.scale as 1 | 2 | 3 | 4,
    forces: unitsStore.getUnit(unit.id)?.forces || []
  }
  showEditDialog.value = true
}

const handleAddForce = (unitId: string) => {
  selectedUnit.value = unitsStore.getUnit(unitId) || null
  isEditingForce.value = false
  newForce.value = {
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
    repairCost: 0
  }
  showForceDialog.value = true
}

const handleEditForce = (unitId: string, force: any) => {
  selectedUnit.value = unitsStore.getUnit(unitId) || null
  selectedForce.value = force
  isEditingForce.value = true
  newForce.value = { ...force }
  showForceDialog.value = true
}

const handleDeleteForce = (unitId: string, force: any) => {
  if (!confirm(`Are you sure you want to delete ${force.name}?`)) return
  
  const unit = unitsStore.getUnit(unitId)
  if (!unit) return
  
  const updatedForces = unit.forces.filter(f => f.id !== force.id)
  unitsStore.updateUnit(unitId, { forces: updatedForces })
}

const handleForceSubmit = () => {
  if (!selectedUnit.value) return
  
  const unit = unitsStore.getUnit(selectedUnit.value.id)
  if (!unit) return
  
  if (isEditingForce.value && selectedForce.value) {
    // Update existing force
    const updatedForces = unit.forces.map(f => 
      f.id === selectedForce.value.id ? { ...f, ...newForce.value } : f
    )
    unitsStore.updateUnit(unit.id, { forces: updatedForces })
  } else {
    // Add new force
    const force = createForce(newForce.value)
    if (!unit.forces){
      unitsStore.updateUnit(unit.id, { 
        forces: [force] 
      })
    } else {
      unitsStore.updateUnit(unit.id, { 
        forces: [...unit.forces, force] 
      })
    }
  }
  
  showForceDialog.value = false
  selectedUnit.value = null
  selectedForce.value = null
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
      <UnitCard
        v-for="unit in unitsStore.units"
        :key="unit.id"
        :unit="unit"
        @edit="openEditDialog"
        @delete="handleDelete"
        @add-force="handleAddForce"
        @edit-force="handleEditForce"
        @delete-force="handleDeleteForce"
      />
    </div>

    <!-- Create Unit Dialog -->
    <div
      v-if="showCreateDialog"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <UnitForm
        v-model="newUnit"
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
        v-model="editUnit"
        title="Edit Unit"
        submit-button-text="Save Changes"
        @submit="handleEdit"
        @cancel="showEditDialog = false"
      />
    </div>

    <!-- Force Dialog -->
    <div
      v-if="showForceDialog"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <ForceForm
        v-model="newForce"
        :title="isEditingForce ? 'Edit Force' : 'New Force'"
        :submit-button-text="isEditingForce ? 'Save Changes' : 'Create Force'"
        @submit="handleForceSubmit"
        @cancel="showForceDialog = false"
      />
    </div>
  </div>
</template> 