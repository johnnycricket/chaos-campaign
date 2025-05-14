import { defineStore } from "pinia";
import { ref, watch } from "vue";
import {
  type Unit,
  type UnitInput,
  type UnitUpdate,
  createUnit,
  updateUnit,
} from "@/types/unit";

const STORAGE_KEY = "chaos-campaign-units";

export const useUnitsStore = defineStore("units", () => {
  const units = ref<Unit[]>([]);

  // Load units from localStorage on store initialization
  const loadUnits = () => {
    const storedUnits = localStorage.getItem(STORAGE_KEY);
    if (storedUnits) {
      units.value = JSON.parse(storedUnits);
    }
  };

  // Save units to localStorage whenever they change
  watch(
    units,
    (newUnits) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUnits));
    },
    { deep: true }
  );

  // Initialize store by loading units
  loadUnits();

  const addUnit = (input: UnitInput) => {
    const newUnit = createUnit(input);
    units.value.push(newUnit);
    return newUnit;
  };

  const updateUnitById = (id: string, updates: UnitUpdate) => {
    const index = units.value.findIndex((unit) => unit.id === id);
    if (index === -1) return null;

    try {
      const updatedUnit = updateUnit(units.value[index], updates);
      units.value[index] = updatedUnit;
      return updatedUnit;
    } catch (error) {
      console.error("Failed to update unit:", error);
      return null;
    }
  };

  const deleteUnit = (id: string) => {
    const index = units.value.findIndex((unit) => unit.id === id);
    if (index === -1) return false;

    units.value.splice(index, 1);
    return true;
  };

  const getUnit = (id: string) => {
    return units.value.find((unit) => unit.id === id) ?? null;
  };

  return {
    units,
    addUnit,
    updateUnit: updateUnitById,
    deleteUnit,
    getUnit,
  };
});
