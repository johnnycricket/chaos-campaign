<script setup lang="ts">
import { ref, watch } from "vue";
import type { UnitInput, UnitType, UnitStatus } from "@/types/unit";

const props = defineProps<{
  modelValue: Partial<UnitInput>;
  title?: string;
  submitButtonText?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Partial<UnitInput>): void;
  (e: "submit", value: UnitInput): void;
  (e: "cancel"): void;
}>();

const formData = ref<Partial<UnitInput>>({ ...props.modelValue });

const unitTypes: UnitType[] = ["mech", "tank", "infantry"];
const unitStatuses: UnitStatus[] = ["operational", "damaged", "destroyed", "repairing"];

watch(
  () => props.modelValue,
  (newValue) => {
    formData.value = { ...newValue };
  }
);

const handleSubmit = () => {
  if (validateForm()) {
    emit("submit", formData.value as UnitInput);
  }
};

const validateForm = (): boolean => {
  if (!formData.value.name?.trim()) {
    return false;
  }
  if (!formData.value.type) {
    return false;
  }
  if (typeof formData.value.pointValue !== "number" || formData.value.pointValue < 0) {
    return false;
  }
  if (typeof formData.value.isSupport !== "boolean") {
    return false;
  }
  if (typeof formData.value.supportCost !== "number" || formData.value.supportCost < 0) {
    return false;
  }
  if (typeof formData.value.currentArmor !== "number" || formData.value.currentArmor < 0) {
    return false;
  }
  if (typeof formData.value.maxArmor !== "number" || formData.value.maxArmor < 0 || formData.value.maxArmor < formData.value.currentArmor) {
    return false;
  }
  if (typeof formData.value.currentStructure !== "number" || formData.value.currentStructure < 0) {
    return false;
  }
  if (typeof formData.value.maxStructure !== "number" || formData.value.maxStructure < 0 || formData.value.maxStructure < formData.value.currentStructure) {
    return false;
  }
  if (typeof formData.value.pilotSkill !== "number" || formData.value.pilotSkill < 0 || formData.value.pilotSkill > 6) {
    return false;
  }
  if (typeof formData.value.repairCost !== "number" || formData.value.repairCost < 0) {
    return false;
  }
  if (!formData.value.status) {
    return false;
  }
  if (typeof formData.value.tonnage !== "number" || formData.value.tonnage < 0) {
    return false;
  }
  if (formData.value.masterUnitListUrl !== undefined && 
      (typeof formData.value.masterUnitListUrl !== "string" || 
       !formData.value.masterUnitListUrl.startsWith("https://masterunitlist.info"))) {
    return false;
  }
  return true;
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">
      {{ title || "Add New Unit" }}
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">
          Unit Name
        </label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label for="type" class="block text-sm font-medium text-gray-700">
          Unit Type
        </label>
        <select
          id="type"
          v-model="formData.type"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option v-for="type in unitTypes" :key="type" :value="type">
            {{ type.charAt(0).toUpperCase() + type.slice(1) }}
          </option>
        </select>
      </div>

      <div>
        <label for="pointValue" class="block text-sm font-medium text-gray-700">
          Point Value
        </label>
        <input
          id="pointValue"
          v-model.number="formData.pointValue"
          type="number"
          min="0"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div class="flex items-center">
        <input
          id="isSupport"
          v-model="formData.isSupport"
          type="checkbox"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label for="isSupport" class="ml-2 block text-sm text-gray-700">
          Support Unit
        </label>
      </div>

      <div>
        <label for="supportCost" class="block text-sm font-medium text-gray-700">
          Support Cost
        </label>
        <input
          id="supportCost"
          v-model.number="formData.supportCost"
          type="number"
          min="0"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label for="currentArmor" class="block text-sm font-medium text-gray-700">
          Current Armor
        </label>
        <input
          id="currentArmor"
          v-model.number="formData.currentArmor"
          type="number"
          min="0"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label for="maxArmor" class="block text-sm font-medium text-gray-700">
          Max Armor
        </label>
        <input
          id="maxArmor"
          v-model.number="formData.maxArmor"
          type="number"
          min="0"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label for="currentStructure" class="block text-sm font-medium text-gray-700">
          Current Structure
        </label>
        <input
          id="currentStructure"
          v-model.number="formData.currentStructure"
          type="number"
          min="0"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label for="maxStructure" class="block text-sm font-medium text-gray-700">
          Max Structure
        </label>
        <input
          id="maxStructure"
          v-model.number="formData.maxStructure"
          type="number"
          min="0"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label for="pilotSkill" class="block text-sm font-medium text-gray-700">
          Pilot Skill
        </label>
        <input
          id="pilotSkill"
          v-model.number="formData.pilotSkill"
          type="number"
          min="0"
          max="6"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label for="repairCost" class="block text-sm font-medium text-gray-700">
          Repair Cost
        </label>
        <input
          id="repairCost"
          v-model.number="formData.repairCost"
          type="number"
          min="0"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label for="status" class="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          v-model="formData.status"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option v-for="status in unitStatuses" :key="status" :value="status">
            {{ status.charAt(0).toUpperCase() + status.slice(1) }}
          </option>
        </select>
      </div>

      <div>
        <label for="tonnage" class="block text-sm font-medium text-gray-700">
          Tonnage
        </label>
        <input
          id="tonnage"
          v-model.number="formData.tonnage"
          type="number"
          min="0"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label for="masterUnitListUrl" class="block text-sm font-medium text-gray-700">
          Master Unit List URL
        </label>
        <input
          id="masterUnitListUrl"
          v-model="formData.masterUnitListUrl"
          type="url"
          placeholder="https://masterunitlist.info/..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p class="mt-1 text-sm text-gray-500">
          Optional: Link to the unit's page on the BattleTech Master Unit List
        </p>
      </div>

      <div class="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          @click="emit('cancel')"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {{ submitButtonText || "Add Unit" }}
        </button>
      </div>
    </form>
  </div>
</template> 