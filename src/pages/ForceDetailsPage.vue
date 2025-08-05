<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForcesStore } from '@/stores/forces'
import ForceCard from '@/components/ForceCard.vue'
import ForceForm from '@/components/ForceForm.vue'
import AddUnitsDialog from '@/components/AddUnitsDialog.vue'
import type { Force, ForceInput, ForceUpdate } from '@/types/force'
import type { Formation } from '@/types/formation'
import type { Unit } from '@/types/unit'

const route = useRoute()
const router = useRouter()
const forcesStore = useForcesStore()

const force = ref<Force | null>(null)
const showEditDialog = ref(false)
const showAddUnitsDialog = ref(false)
const editForce = ref<ForceInput>({
  name: '',
  warchest: 0,
  scale: 1,
  units: [],
  formations: []
})

onMounted(() => {
  const forceId = route.params.id as string
  const foundForce = forcesStore.getForce(forceId)
  if (!foundForce) {
    router.push('/forces')
    return
  }
  force.value = foundForce
  editForce.value = {
    name: foundForce.name,
    warchest: foundForce.warchest,
    scale: foundForce.scale,
    units: foundForce.units || [],
    formations: foundForce.formations || []
  }
})

const handleEdit = () => {
  if (!force.value) return
  const updates: ForceUpdate = {
    name: editForce.value.name,
    warchest: editForce.value.warchest,
    scale: editForce.value.scale,
    units: editForce.value.units
  }
  forcesStore.updateForce(force.value.id, updates)
  showEditDialog.value = false
}

const handleDelete = () => {
  if (!force.value) return
  if (!confirm(`Are you sure you want to delete ${force.value.name}?`)) return
  forcesStore.deleteForce(force.value.id)
  router.push('/forces')
}

const handleUpdateModelValue = (value: ForceInput) => {
  editForce.value = value
}

const handleAddUnits = () => {
  showAddUnitsDialog.value = true
}

const handleAddUnitsSubmit = async (formations: Formation[], looseUnitIds: string[]) => {
  if (!force.value) return
  
  // Get all unit IDs (from formations and loose units)
  const newUnitIds = [...formations.flatMap(f => f.unitIds), ...looseUnitIds]
  
  // Get the actual unit objects
  const { useUnitsStore } = await import('@/stores/units')
  const unitsStore = useUnitsStore()
  const newUnits = newUnitIds.map(id => unitsStore.getUnit(id)).filter(Boolean) as Unit[]
  
  // Update the force with new units and formations
  // For now, we'll replace all units and formations to avoid duplication
  // In the future, this could be made more sophisticated to merge properly
  const updates: ForceUpdate = {
    units: [...(force.value.units || []), ...newUnits],
    formations: [...(force.value.formations || []), ...formations]
  }
  
  const updatedForce = forcesStore.updateForce(force.value.id, updates)
  if (updatedForce) {
    force.value = updatedForce
  }
  showAddUnitsDialog.value = false
}

const handleAddUnitsCancel = () => {
  showAddUnitsDialog.value = false
}
</script>

<template>
  <div v-if="force" class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">{{ force.name }}</h1>
      <div class="flex space-x-4">
        <button
          class="btn btn-secondary"
          @click="showEditDialog = true"
        >
          Edit Force
        </button>
        <button
          class="btn btn-danger"
          @click="handleDelete"
        >
          Delete Force
        </button>
      </div>
    </div>

    <ForceCard
      :force="force"
      @edit="showEditDialog = true"
      @delete="handleDelete"
      @add-units="handleAddUnits"
    />

    <!-- Edit Force Dialog -->
    <div
      v-if="showEditDialog"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <ForceForm
        :model-value="editForce"
        @update:modelValue="handleUpdateModelValue"
        title="Edit Force"
        submit-button-text="Save Changes"
        @submit="handleEdit"
        @cancel="showEditDialog = false"
      />
    </div>

    <!-- Add Units Dialog -->
    <AddUnitsDialog
      v-if="showAddUnitsDialog && force"
      :force-id="force.id"
      :existing-unit-ids="force.units?.map(u => u.id) || []"
      :existing-formations="force.formations || []"
      @submit="handleAddUnitsSubmit"
      @cancel="handleAddUnitsCancel"
    />
  </div>
</template>