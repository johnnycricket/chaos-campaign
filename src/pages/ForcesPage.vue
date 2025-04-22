<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ForceForm from '@/components/ForceForm.vue'
import ForceCard from '@/components/ForceCard.vue'
import { useForcesStore } from '@/stores/forces'
import { type Force, type ForceInput } from '@/types/force'

const router = useRouter()
const forcesStore = useForcesStore()
const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const selectedForce = ref<Force | null>(null)

const newForce = ref<ForceInput>({
  name: '',
  warchest: 0,
  scale: 1,
  units: []
})

const editForce = ref<ForceInput>({
  name: '',
  warchest: 0,
  scale: 1,
  units: []
})

const handleCreate = () => {
  forcesStore.addForce(newForce.value)
  newForce.value = {
    name: '',
    warchest: 0,
    scale: 1,
    units: []
  }
  showCreateDialog.value = false
}

const handleEdit = () => {
  if (selectedForce.value) {
    forcesStore.$patch((state) => {
      const index = state.forces.findIndex(f => f.id === selectedForce.value?.id)
      if (index !== -1) {
        state.forces[index] = { ...state.forces[index], ...editForce.value }
      }
    })
  }
  showEditDialog.value = false
  selectedForce.value = null
}

const handleDelete = (force: Force) => {
  if (!confirm(`Are you sure you want to delete ${force.name}?`)) return
  forcesStore.deleteForce(force.id)
}

const openEditDialog = (force: Force) => {
  selectedForce.value = force
  editForce.value = { ...force }
  showEditDialog.value = true
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
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ForceCard
        v-for="force in forcesStore.forces"
        :key="force.id"
        :force="force"
        @edit="openEditDialog"
        @delete="handleDelete"
      />
    </div>

    <!-- Create Force Dialog -->
    <div
      v-if="showCreateDialog"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <ForceForm
        v-model="newForce"
        @submit="handleCreate"
        @cancel="showCreateDialog = false"
      />
    </div>

    <!-- Edit Force Dialog -->
    <div
      v-if="showEditDialog"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <ForceForm
        v-model="editForce"
        title="Edit Force"
        submit-button-text="Save Changes"
        @submit="handleEdit"
        @cancel="showEditDialog = false"
      />
    </div>
  </div>
</template> 