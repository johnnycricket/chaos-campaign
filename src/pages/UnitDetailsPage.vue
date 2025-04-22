<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForcesStore } from '@/stores/forces'
import UnitRepairInfo from '@/components/UnitRepairInfo.vue'
import type { Unit } from '@/types/unit'

const route = useRoute()
const router = useRouter()
const forcesStore = useForcesStore()

const forceId = computed(() => route.params.forceId as string)
const unitId = computed(() => route.params.unitId as string)

console.log('Route params:', { forceId: forceId.value, unitId: unitId.value })

const force = computed(() => {
  const foundForce = forcesStore.getForce(forceId.value)
  console.log('Found force:', foundForce)
  return foundForce
})

const unit = computed<Unit | null>(() => {
  if (!unitId.value || !force.value) {
    console.log('No unit found:', { unitId: unitId.value, force: force.value })
    return null
  }
  const foundUnit = force.value.units.find(u => u.id === unitId.value)
  console.log('Found unit:', foundUnit)
  return foundUnit || null
})

onMounted(() => {
  console.log('Component mounted')
  if (!force.value || !unit.value) {
    console.log('Redirecting to forces page - no force or unit found')
    router.push('/forces')
  }
})

const handleEdit = () => {
  router.push(`/forces/${forceId.value}/units/${unitId.value}/edit`)
}

const handleDelete = async () => {
  if (force.value && unit.value && confirm('Are you sure you want to delete this unit?')) {
    await forcesStore.removeUnitFromForce(force.value.id, unit.value.id)
    router.push(`/forces/${force.value.id}`)
  }
}

const handleBack = () => {
  router.push(`/forces/${forceId.value}`)
}
</script>

<template>
  <div v-if="force && unit" class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">{{ unit.name }}</h1>
        <div class="flex space-x-4">
          <button
            class="btn btn-primary"
            @click="handleEdit"
          >
            Edit Unit
          </button>
          <button
            class="btn btn-danger"
            @click="handleDelete"
          >
            Delete Unit
          </button>
          <button
            class="btn btn-secondary"
            @click="handleBack"
          >
            Back to Force
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Unit Details -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-semibold mb-4">Unit Details</h2>
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-2">
              <div class="font-medium">Type:</div>
              <div>{{ unit.type }}</div>
              
              <div class="font-medium">Status:</div>
              <div>{{ unit.status }}</div>
              
              <div class="font-medium">Point Value:</div>
              <div>{{ unit.pointValue }}</div>
              
              <div class="font-medium">Tonnage:</div>
              <div>{{ unit.tonnage }}</div>
              
              <div class="font-medium">Pilot Skill:</div>
              <div>{{ unit.pilotSkill }}</div>
              
              <div class="font-medium">Support Unit:</div>
              <div>{{ unit.isSupport ? 'Yes' : 'No' }}</div>
              
              <div class="font-medium">Support Cost:</div>
              <div>{{ unit.supportCost }}</div>
            </div>

            <div class="mt-4">
              <h3 class="font-medium mb-2">Armor</h3>
              <div class="grid grid-cols-2 gap-2">
                <div class="font-medium">Current:</div>
                <div>{{ unit.currentArmor }}</div>
                
                <div class="font-medium">Maximum:</div>
                <div>{{ unit.maxArmor }}</div>
              </div>
            </div>

            <div class="mt-4">
              <h3 class="font-medium mb-2">Structure</h3>
              <div class="grid grid-cols-2 gap-2">
                <div class="font-medium">Current:</div>
                <div>{{ unit.currentStructure }}</div>
                
                <div class="font-medium">Maximum:</div>
                <div>{{ unit.maxStructure }}</div>
              </div>
            </div>

            <div v-if="unit.masterUnitListUrl" class="mt-4">
              <h3 class="font-medium mb-2">Master Unit List</h3>
              <a
                :href="unit.masterUnitListUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:text-blue-800"
              >
                View on Master Unit List
              </a>
            </div>
          </div>
        </div>

        <!-- Repair Information -->
        <UnitRepairInfo :unit="unit" />
      </div>
    </div>
  </div>
  <div v-else class="container mx-auto px-4 py-8">
    <div class="text-center">
      <p class="text-gray-500">Loading unit details...</p>
    </div>
  </div>
</template> 