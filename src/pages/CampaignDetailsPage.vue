<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showNewBattleDialog = ref(false)

const newBattle = ref({
  name: '',
  type: '',
  location: '',
  date: '',
  description: '',
  result: '',
  warchestChange: 0
})

const handleCreateBattle = () => {
  // TODO: Implement battle creation
  showNewBattleDialog.value = false
}
</script>

<template>
  <div class="space-y-8">
    <!-- Campaign Header -->
    <div class="card">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-3xl font-bold mb-2">Campaign {{ route.params.id }}</h1>
          <p class="text-gray-600 dark:text-gray-300">
            A detailed campaign description that would be replaced with actual campaign data.
          </p>
        </div>
        <button
          class="btn btn-primary"
          @click="showNewBattleDialog = true"
        >
          New Battle
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Employer</h3>
          <p class="mt-1 text-lg">Sample Employer</p>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Unit</h3>
          <p class="mt-1 text-lg">Sample Unit</p>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Contract Type</h3>
          <p class="mt-1 text-lg">Attack</p>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Warchest</h3>
          <p class="mt-1 text-lg">1000</p>
        </div>
      </div>
    </div>

    <!-- Battle List -->
    <div class="card">
      <h2 class="text-2xl font-semibold mb-6">Battles</h2>
      <div class="space-y-4">
        <div
          v-for="i in 3"
          :key="i"
          class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-medium">Battle {{ i }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mt-1">
                A sample battle description that would be replaced with actual battle data.
              </p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500 dark:text-gray-400">Location: Sample Location</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Date: 3025-01-{{ i }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- New Battle Dialog -->
    <div
      v-if="showNewBattleDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="card max-w-2xl w-full">
        <h2 class="text-2xl font-semibold mb-6">New Battle</h2>
        <form @submit.prevent="handleCreateBattle" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Battle Name</label>
            <input
              v-model="newBattle.name"
              type="text"
              class="input"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Battle Type</label>
              <select
                v-model="newBattle.type"
                class="input"
                required
              >
                <option value="">Select Type</option>
                <option value="attack">Attack</option>
                <option value="defend">Defend</option>
                <option value="recon">Recon</option>
                <option value="pursuit">Pursuit</option>
                <option value="breakthrough">Breakthrough</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Location</label>
              <input
                v-model="newBattle.location"
                type="text"
                class="input"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Date</label>
            <input
              v-model="newBattle.date"
              type="date"
              class="input"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea
              v-model="newBattle.description"
              class="input"
              rows="3"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Result</label>
              <select
                v-model="newBattle.result"
                class="input"
                required
              >
                <option value="">Select Result</option>
                <option value="victory">Victory</option>
                <option value="defeat">Defeat</option>
                <option value="draw">Draw</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Warchest Change</label>
              <input
                v-model="newBattle.warchestChange"
                type="number"
                class="input"
                required
              />
            </div>
          </div>

          <div class="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showNewBattleDialog = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
            >
              Create Battle
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template> 