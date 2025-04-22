<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForcesStore } from '@/stores/forces'
import { type Force } from '@/types/force'
import { type Unit } from '@/types/unit'
import UnitTable from '@/components/UnitTable.vue'
import UnitForm from '@/components/UnitForm.vue'

const route = useRoute()
const router = useRouter()
const forcesStore = useForcesStore()

const force = ref<Force | null>(null)
const isEditing = ref(false)
const isAddingUnit = ref(false)
const editingUnit = ref<Unit | null>(null)

onMounted(async () => {
  const forceId = route.params.id as string
  const foundForce = await forcesStore.getForce(forceId)
  if (foundForce) {
    force.value = foundForce
  } else {
    router.push('/forces')
  }
})

const handleEdit = () => {
  isEditing.value = true
}

const handleDelete = async () => {
  if (force.value && confirm('Are you sure you want to delete this force?')) {
    await forcesStore.deleteForce(force.value.id)
    router.push('/forces')
  }
}

const handleAddUnit = () => {
  editingUnit.value = null
  isAddingUnit.value = true
}

const handleEditUnit = (unit: Unit) => {
  editingUnit.value = unit
  isAddingUnit.value = true
}

const handleDeleteUnit = async (unit: Unit) => {
  if (force.value && confirm('Are you sure you want to delete this unit?')) {
    await forcesStore.removeUnitFromForce(force.value.id, unit.id)
    force.value = await forcesStore.getForce(force.value.id)
  }
}

const handleSaveUnit = async (unitData: Partial<Unit>) => {
  if (!force.value) return

  if (editingUnit.value) {
    await forcesStore.updateUnit(editingUnit.value.id, unitData)
  } else {
    await forcesStore.addUnitToForce(force.value.id, unitData)
  }

  force.value = await forcesStore.getForce(force.value.id)
  isAddingUnit.value = false
  editingUnit.value = null
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="force" class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">{{ force.name }}</h1>
        <div class="flex space-x-4">
          <button
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            @click="handleEdit"
          >
            Edit Force
          </button>
          <button
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            @click="handleDelete"
          >
            Delete Force
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Force Details</h2>
          <div class="space-y-4">
            <div>
              <span class="font-medium">Warchest:</span>
              <span class="ml-2">{{ force.warchest }}</span>
            </div>
            <div>
              <span class="font-medium">Scale:</span>
              <span class="ml-2">{{ force.scale }}</span>
            </div>
            <div>
              <span class="font-medium">Total Units:</span>
              <span class="ml-2">{{ force.units.length }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Units</h2>
            <button
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              @click="handleAddUnit"
            >
              Add Unit
            </button>
          </div>
          <UnitTable
            :units="force.units"
            @edit="handleEditUnit"
            @delete="handleDeleteUnit"
          />
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-500">Loading force details...</p>
    </div>

    <v-dialog v-model="isAddingUnit" max-width="600px">
      <v-card>
        <v-card-title>
          {{ editingUnit ? 'Edit Unit' : 'Add Unit' }}
        </v-card-title>
        <v-card-text>
          <UnitForm
            :model-value="editingUnit || {}"
            @save="handleSaveUnit"
            @cancel="isAddingUnit = false"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template> 