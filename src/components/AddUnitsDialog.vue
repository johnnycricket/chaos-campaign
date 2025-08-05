<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUnitsStore } from '@/stores/units'
import { type Unit } from '@/types/unit'
import { type Formation, type FormationInput, createFormation } from '@/types/formation'

interface Props {
  forceId: string
  existingUnitIds: string[]
  existingFormations?: Formation[]
}

interface Emits {
  (e: 'submit', formations: Formation[], looseUnitIds: string[]): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const unitsStore = useUnitsStore()
const searchTerm = ref('')
const selectedUnits = ref<string[]>([])
const formations = ref<FormationInput[]>([])

// Initialize with existing formations if provided
if (props.existingFormations) {
  formations.value = props.existingFormations.map(f => ({
    name: f.name,
    type: f.type,
    unitIds: f.unitIds
  }))
  
  // Initialize selectedUnits with units from existing formations
  const existingFormationUnitIds = props.existingFormations.flatMap(f => f.unitIds)
  selectedUnits.value = [...existingFormationUnitIds]
}

// Available units (excluding already assigned ones)
const availableUnits = computed(() => {
  const existingFormationUnitIds = props.existingFormations?.flatMap(f => f.unitIds) || []
  return unitsStore.units.filter(unit => 
    !props.existingUnitIds.includes(unit.id) &&
    !existingFormationUnitIds.includes(unit.id) &&
    unit.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// Selected units data
const selectedUnitsData = computed(() => {
  return selectedUnits.value.map(id => unitsStore.getUnit(id)).filter(Boolean) as Unit[]
})

const addUnitToSelection = (unitId: string) => {
  if (!selectedUnits.value.includes(unitId)) {
    selectedUnits.value.push(unitId)
  }
}

const removeUnitFromSelection = (unitId: string) => {
  const index = selectedUnits.value.indexOf(unitId)
  if (index > -1) {
    selectedUnits.value.splice(index, 1)
  }
}

const addFormation = () => {
  formations.value.push({
    name: '',
    type: 'lance',
    unitIds: []
  })
}

const removeFormation = (index: number) => {
  formations.value.splice(index, 1)
}

const addUnitToFormation = (formationIndex: number, unitId: string) => {
  const formation = formations.value[formationIndex]
  if (!formation.unitIds.includes(unitId)) {
    formation.unitIds.push(unitId)
  }
}

const removeUnitFromFormation = (formationIndex: number, unitId: string) => {
  const formation = formations.value[formationIndex]
  const index = formation.unitIds.indexOf(unitId)
  if (index > -1) {
    formation.unitIds.splice(index, 1)
  }
}

const getFormationUnits = (formationIndex: number) => {
  const formation = formations.value[formationIndex]
  return formation.unitIds.map(id => unitsStore.getUnit(id)).filter(Boolean) as Unit[]
}

const getUnassignedUnits = () => {
  const assignedUnitIds = formations.value.flatMap(f => f.unitIds)
  return selectedUnitsData.value.filter(unit => !assignedUnitIds.includes(unit.id))
}

const handleSubmit = () => {
  // Get all selected unit IDs
  const allSelectedUnitIds = selectedUnits.value
  
  // Get formation units
  const formationUnitIds = formations.value.flatMap(f => f.unitIds)
  
  // Get units not assigned to formations (loose units)
  const looseUnitIds = allSelectedUnitIds.filter(id => !formationUnitIds.includes(id))
  
  // Validate formations
  const validFormations = formations.value
    .filter(f => f.name.trim() && f.unitIds.length > 0)
    .map(f => createFormation(f))
  
  emit('submit', validFormations, looseUnitIds)
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Add Units to Force</h2>
        <button
          @click="handleCancel"
          class="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <!-- Search and Unit Selection -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Available Units -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Available Units</h3>
          <div class="mb-4">
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search units..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="max-h-64 overflow-y-auto border border-gray-200 rounded-md">
            <div
              v-for="unit in availableUnits"
              :key="unit.id"
              class="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              @click="addUnitToSelection(unit.id)"
            >
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-medium">{{ unit.name }}</div>
                  <div class="text-sm text-gray-600">{{ unit.type }} - {{ unit.pointValue }} pts</div>
                </div>
                <button
                  class="text-blue-600 hover:text-blue-800"
                  @click.stop="addUnitToSelection(unit.id)"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Selected Units -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Selected Units</h3>
          <div class="max-h-64 overflow-y-auto border border-gray-200 rounded-md">
            <div
              v-for="unit in selectedUnitsData"
              :key="unit.id"
              class="p-3 border-b border-gray-100 hover:bg-gray-50"
            >
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-medium">{{ unit.name }}</div>
                  <div class="text-sm text-gray-600">{{ unit.type }} - {{ unit.pointValue }} pts</div>
                </div>
                <button
                  class="text-red-600 hover:text-red-800"
                  @click="removeUnitFromSelection(unit.id)"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Formations -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Formations</h3>
          <button
            @click="addFormation"
            class="btn btn-primary"
          >
            Add Formation
          </button>
        </div>

        <div v-if="formations.length === 0" class="text-gray-500 text-center py-8">
          No formations created yet. You can add units without formations or create formations to organize them.
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(formation, formationIndex) in formations"
            :key="formationIndex"
            class="border border-gray-200 rounded-md p-4"
          >
            <div class="flex justify-between items-center mb-4">
              <div class="flex space-x-4">
                <input
                  v-model="formation.name"
                  type="text"
                  placeholder="Formation name"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  v-model="formation.type"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="lance">Lance</option>
                  <option value="star">Star</option>
                  <option value="level-ii">Level II</option>
                </select>
              </div>
              <button
                @click="removeFormation(formationIndex)"
                class="text-red-600 hover:text-red-800"
              >
                Remove Formation
              </button>
            </div>

            <!-- Available Units for This Formation -->
            <div class="mb-4">
              <h4 class="font-medium mb-2">Available Units for This Formation</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <div
                  v-for="unit in getUnassignedUnits()"
                  :key="unit.id"
                  class="p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50"
                  @click="addUnitToFormation(formationIndex, unit.id)"
                >
                  <div class="text-sm font-medium">{{ unit.name }}</div>
                  <div class="text-xs text-gray-600">{{ unit.type }} - {{ unit.pointValue }} pts</div>
                </div>
              </div>
            </div>

            <!-- Formation Units -->
            <div>
              <h4 class="font-medium mb-2">Formation Units</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <div
                  v-for="unit in getFormationUnits(formationIndex)"
                  :key="unit.id"
                  class="p-2 border border-blue-200 bg-blue-50 rounded"
                >
                  <div class="flex justify-between items-center">
                    <div>
                      <div class="text-sm font-medium">{{ unit.name }}</div>
                      <div class="text-xs text-gray-600">{{ unit.type }} - {{ unit.pointValue }} pts</div>
                    </div>
                    <button
                      @click="removeUnitFromFormation(formationIndex, unit.id)"
                      class="text-red-600 hover:text-red-800 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loose Units (not assigned to formations) -->
        <div v-if="getUnassignedUnits().length > 0" class="mt-4 p-4 border border-orange-200 bg-orange-50 rounded-md">
          <h4 class="font-medium mb-2 text-orange-700">Units Not Assigned to Formations</h4>
          <p class="text-sm text-orange-600 mb-3">These units will be added to the force without being part of any formation.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div
              v-for="unit in getUnassignedUnits()"
              :key="unit.id"
              class="p-2 border border-orange-300 bg-orange-100 rounded"
            >
              <div class="text-sm font-medium">{{ unit.name }}</div>
              <div class="text-xs text-gray-600">{{ unit.type }} - {{ unit.pointValue }} pts</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-4 pt-4 border-t">
        <button
          @click="handleCancel"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Units
        </button>
      </div>
    </div>
  </div>
</template> 