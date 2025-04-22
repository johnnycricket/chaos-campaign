<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForcesStore } from '@/stores/forces'
import UnitTable from '@/components/UnitTable.vue'
import type { Unit } from '@/types/unit'

const route = useRoute()
const router = useRouter()
const forcesStore = useForcesStore()

const forceId = ref(() => route.params.forceId as string)
const force = computed(() => forcesStore.getForce(forceId.value))

// Redirect if force not found
if (!force.value) {
  console.log('Force ID:', forceId.value)
  console.log('Force not found')
  router.push('/forces')
}

const handleDelete = async () => {
  if (force.value && confirm('Are you sure you want to delete this force?')) {
    await forcesStore.deleteForce(force.value.id)
    router.push('/forces')
  }
}

const handleEditUnit = (unit: Unit) => {
  router.push(`/forces/${forceId.value}/units/${unit.id}/edit`)
}

const handleDeleteUnit = (unit: Unit) => {
  if (confirm(`Are you sure you want to delete ${unit.name}?`)) {
    forcesStore.removeUnitFromForce(forceId.value, unit.id)
  }
}
</script>

<template>
  <div v-if="force" class="space-y-8">
    <!-- Force Header -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-3xl font-bold mb-2">{{ force.name }}</h1>
        </div>
        <div class="flex space-x-4">
          <button
            class="btn btn-primary"
            @click="router.push(`/forces/${force.id}/edit`)"
          >
            Edit Force
          </button>
          <button
            class="btn btn-danger"
            @click="handleDelete"
          >
            Delete Force
          </button>
          <button
            class="btn btn-secondary"
            @click="router.push('/forces')"
          >
            Back to Forces
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500">Warchest</h3>
          <p class="mt-1 text-lg">{{ force.warchest }}</p>
        </div>
        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500">Scale</h3>
          <p class="mt-1 text-lg">{{ force.scale }}</p>
        </div>
        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500">Total Units</h3>
          <p class="mt-1 text-lg">{{ force.units.length }}</p>
        </div>
      </div>
    </div>

    <!-- Units Table -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">Units</h2>
        <button
          class="btn btn-primary"
          @click="router.push(`/forces/${force.id}/units/new`)"
        >
          Add Unit
        </button>
      </div>
      <UnitTable 
        :units="force.units"
        :force-id="force.id"
        @edit="handleEditUnit"
        @delete="handleDeleteUnit"
      />
    </div>
  </div>
</template> 