<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const selectedUnit = ref<{ id: string; name: string; warchest: number; scale: number } | null>(null)

const newUnit = ref({
  name: '',
  warchest: 0,
  scale: 1
})

const editUnit = ref({
  name: '',
  warchest: 0,
  scale: 1
})

const handleCreate = () => {
  // TODO: Implement unit creation
  showCreateDialog.value = false
}

const handleEdit = () => {
  // TODO: Implement unit editing
  showEditDialog.value = false
  selectedUnit.value = null
}

const handleDelete = (unit: { id: string; name: string }) => {
  if (!confirm(`Are you sure you want to delete ${unit.name}?`)) return
  // TODO: Implement unit deletion
}

const openEditDialog = (unit: { id: string; name: string; warchest: number; scale: number }) => {
  selectedUnit.value = unit
  editUnit.value = {
    name: unit.name,
    warchest: unit.warchest,
    scale: unit.scale
  }
  showEditDialog.value = true
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
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="i in 3"
        :key="i"
        class="card hover:shadow-lg transition-shadow duration-200"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-xl font-semibold mb-2">Unit {{ i }}</h3>
            <p class="text-gray-600 dark:text-gray-300">
              A sample unit description that would be replaced with actual unit data.
            </p>
          </div>
          <div class="flex space-x-2">
            <button
              class="btn btn-secondary"
              @click="openEditDialog({ id: String(i), name: `Unit ${i}`, warchest: 1000, scale: 1 })"
            >
              Edit
            </button>
            <button
              class="btn btn-secondary"
              @click="handleDelete({ id: String(i), name: `Unit ${i}` })"
            >
              Delete
            </button>
          </div>
        </div>
        <div class="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Scale</h4>
            <p class="mt-1">1</p>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Warchest</h4>
            <p class="mt-1">1000</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Unit Dialog -->
    <div
      v-if="showCreateDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="card max-w-lg w-full">
        <h2 class="text-2xl font-semibold mb-6">New Unit</h2>
        <form @submit.prevent="handleCreate" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Unit Name</label>
            <input
              v-model="newUnit.name"
              type="text"
              class="input"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Scale</label>
              <select
                v-model="newUnit.scale"
                class="input"
                required
              >
                <option :value="1">1</option>
                <option :value="2">2</option>
                <option :value="3">3</option>
                <option :value="4">4</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Warchest</label>
              <input
                v-model="newUnit.warchest"
                type="number"
                class="input"
                required
                min="0"
              />
            </div>
          </div>

          <div class="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showCreateDialog = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
            >
              Create Unit
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Unit Dialog -->
    <div
      v-if="showEditDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="card max-w-lg w-full">
        <h2 class="text-2xl font-semibold mb-6">Edit Unit</h2>
        <form @submit.prevent="handleEdit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Unit Name</label>
            <input
              v-model="editUnit.name"
              type="text"
              class="input"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Scale</label>
              <select
                v-model="editUnit.scale"
                class="input"
                required
              >
                <option :value="1">1</option>
                <option :value="2">2</option>
                <option :value="3">3</option>
                <option :value="4">4</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Warchest</label>
              <input
                v-model="editUnit.warchest"
                type="number"
                class="input"
                required
                min="0"
              />
            </div>
          </div>

          <div class="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showEditDialog = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template> 