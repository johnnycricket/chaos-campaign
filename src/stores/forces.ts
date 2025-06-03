import { defineStore } from "pinia";
import { ref, watch } from "vue";
import {
  type Force,
  type ForceInput,
  type ForceUpdate,
  createForce,
  updateForce,
} from "@/types/force";

const STORAGE_KEY = "chaos-campaign-forces";

export const useForcesStore = defineStore("forces", () => {
  const forces = ref<Force[]>([]);

  // Load forces from localStorage on store initialization
  const loadForces = () => {
    const storedForces = localStorage.getItem(STORAGE_KEY);
    if (storedForces) {
      forces.value = JSON.parse(storedForces);
    }
  };

  // Save forces to localStorage whenever they change
  watch(
    forces,
    (newForces) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newForces));
    },
    { deep: true }
  );

  // Initialize store by loading forces
  loadForces();

  const addForce = (input: ForceInput) => {
    const newForce = createForce(input);
    forces.value.push(newForce);
    return newForce;
  };

  const updateForceById = (id: string, updates: ForceUpdate) => {
    const index = forces.value.findIndex((force) => force.id === id);
    if (index === -1) return null;

    try {
      const updatedForce = updateForce(forces.value[index], updates);
      forces.value[index] = updatedForce;
      return updatedForce;
    } catch (error) {
      console.error("Failed to update force:", error);
      return null;
    }
  };

  const deleteForce = (id: string) => {
    const index = forces.value.findIndex((force) => force.id === id);
    if (index === -1) return false;

    forces.value.splice(index, 1);
    return true;
  };

  const getForce = (id: string) => {
    return forces.value.find((force) => force.id === id) ?? null;
  };

  return {
    forces,
    addForce,
    updateForce: updateForceById,
    deleteForce,
    getForce,
  };
});
