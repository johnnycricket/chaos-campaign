<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForcesStore } from '@/stores/forces'
import UnitForm from '@/components/UnitForm.vue'
import type { UnitInput } from '@/types/unit'

const route = useRoute()
const router = useRouter()
const forcesStore = useForcesStore()

const forceId = computed(() => route.params.forceId as string)
const unitId = computed(() => route.params.unitId as string | undefined)
const isEditing = computed(() => !!unitId.value)

const force = computed(() => forcesStore.getForce(forceId.value))
const unit = computed(() => {
  if (!unitId.value || !force.value) return null
  return force.value.units.find(u => u.id === unitId.value) || null
})

const formData = computed<Partial<UnitInput>>(() => {
  if (isEditing.value && unit.value) {
    return { ...unit.value }
  }
  return {
    name: '',
    type: 'mech',
    pointValue: 0,
    isSupport: false,
    supportCost: 0,
    currentArmor: 0,
    maxArmor: 0,
    currentStructure: 0,
    maxStructure: 0,
    pilotSkill: 0,
    repairCost: 0,
    status: 'operational',
    tonnage: 0
  }
})

onMounted(() => {
  if (!force.value) {
    router.push('/forces')
  }
})

const handleSubmit = async (data: UnitInput) => {
  if (!force.value) return

  if (isEditing.value && unit.value) {
    await forcesStore.updateUnit(unit.value.id, data)
  } else {
    await forcesStore.addUnitToForce(force.value.id, data)
  }

  router.push(`/forces/${force.value.id}`)
}

const handleCancel = () => {
  router.push(`/forces/${forceId.value}`)
}
</script>

<template>
  <div v-if="force" class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">
          {{ isEditing ? 'Edit Unit' : 'Add New Unit' }}
        </h1>
        <button
          class="btn btn-secondary"
          @click="handleCancel"
        >
          Cancel
        </button>
      </div>

      <UnitForm
        v-model="formData"
        :title="isEditing ? 'Edit Unit' : 'Add New Unit'"
        :submit-button-text="isEditing ? 'Save Changes' : 'Add Unit'"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template> 