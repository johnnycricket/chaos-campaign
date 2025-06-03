<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForcesStore } from '@/stores/forces'
import ForceCard from '@/components/ForceCard.vue'
import ForceForm from '@/components/ForceForm.vue'
import type { Force, ForceInput, ForceUpdate } from '@/types/force'

const router = useRouter()
const forcesStore = useForcesStore()

const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const selectedForce = ref<Force | null>(null)
const newForce = ref<ForceInput>({
  name: '',
  warchest: 0,
  scale: 1,
  forces: []
})

const handleCreate = () => {
  forcesStore.addForce(newForce.value)
  showCreateDialog.value = false
  newForce.value = {
    name: '',
    warchest: 0,
    scale: 1,
    forces: []
  }
}

const handleEdit = () => {
  if (!selectedForce.value) return
  const updates: ForceUpdate = {
    name: selectedForce.value.name,
    warchest: selectedForce.value.warchest,
    scale: selectedForce.value.scale,
    forces: selectedForce.value.forces
  }
  forcesStore.updateForce(selectedForce.value.id, updates)
  showEditDialog.value = false
}

const handleDelete = (force: Force) => {
  if (!confirm(`Are you sure you want to delete ${force.name}?`)) return
  forcesStore.deleteForce(force.id)
}

const handleForceClick = (force: Force) => {
  router.push(`/forces/${force.id}`)
}

const handleAddForce = (forceId: string) => {
  selectedForce.value = forcesStore.getForce(forceId)
  if (!selectedForce.value) return
  
  newForce.value = {
    name: '',
    warchest: 0,
    scale: 1,
    forces: []
  }
  showCreateDialog.value = true
}

const handleEditForce = (forceId: string, force: Force) => {
  selectedForce.value = forcesStore.getForce(forceId)
  if (!selectedForce.value) return
  
  showEditDialog.value = true
}

const handleDeleteForce = (forceId: string, force: Force) => {
  if (!confirm(`Are you sure you want to delete ${force.name}?`)) return
  forcesStore.deleteForce(force.id)
}

const handleUpdateModelValue = (value: ForceInput) => {
  if (showCreateDialog.value) {
    newForce.value = value
  } else if (showEditDialog.value && selectedForce.value) {
    selectedForce.value = {
      ...selectedForce.value,
      ...value
    }
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Forces</h1>
      <button
        class="btn btn-primary"
        @click="showCreateDialog = true"
      >
        New Force
      </button>
    </div>

    <!-- Force List -->
    <div class="grid grid-cols-1 gap-6">
      <div
        v-for="force in forcesStore.forces"
        :key="force.id"
        class="cursor-pointer"
        @click="handleForceClick(force)"
      >
        <ForceCard
          :force="force"
          @edit="handleEdit"
          @delete="handleDelete"
          @add-force="handleAddForce"
          @edit-force="handleEditForce"
          @delete-force="handleDeleteForce"
        />
      </div>
    </div>

    <!-- Create Force Dialog -->
    <div
      v-if="showCreateDialog"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <ForceForm
        :model-value="newForce"
        @update:modelValue="handleUpdateModelValue"
        @submit="handleCreate"
        @cancel="showCreateDialog = false"
      />
    </div>

    <!-- Edit Force Dialog -->
    <div
      v-if="showEditDialog && selectedForce"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <ForceForm
        :model-value="selectedForce"
        @update:modelValue="handleUpdateModelValue"
        title="Edit Force"
        submit-button-text="Save Changes"
        @submit="handleEdit"
        @cancel="showEditDialog = false"
      />
    </div>
  </div>
</template>