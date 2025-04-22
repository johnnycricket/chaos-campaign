import type { Unit, UnitStatus } from "@/types/unit";

/**
 * Calculates the repair cost for a unit based on its current status and damage
 * @param unit The unit to calculate repair costs for
 * @returns The total repair cost in C-Bills
 */
export const calculateRepairCost = (unit: Unit): number => {
  // Base cost is always the unit's tonnage
  const baseCost = unit.tonnage;

  // If the unit is operational, no repairs needed
  if (unit.status === "operational") {
    return 0;
  }

  // Calculate armor repair cost
  const armorRepairCost = calculateArmorRepairCost(unit);

  // Calculate structure repair cost
  const structureRepairCost = calculateStructureRepairCost(unit);

  // Calculate status-based repair cost
  const statusRepairCost = calculateStatusRepairCost(unit);

  // Total repair cost is the sum of all repair costs
  return armorRepairCost + structureRepairCost + statusRepairCost;
};

/**
 * Calculates the cost to repair armor damage
 * @param unit The unit to calculate armor repair costs for
 * @returns The armor repair cost in C-Bills
 */
export const calculateArmorRepairCost = (unit: Unit): number => {
  // If armor is at max, no repair needed
  if (unit.currentArmor >= unit.maxArmor) {
    return 0;
  }

  // Calculate the amount of armor that needs repair
  const armorDamage = unit.maxArmor - unit.currentArmor;

  // Repair cost is tonnage x 2 per point of armor
  return unit.tonnage * 2 * armorDamage;
};

/**
 * Calculates the cost to repair structure damage
 * @param unit The unit to calculate structure repair costs for
 * @returns The structure repair cost in C-Bills
 */
export const calculateStructureRepairCost = (unit: Unit): number => {
  // If structure is at max, no repair needed
  if (unit.currentStructure >= unit.maxStructure) {
    return 0;
  }

  // Calculate the amount of structure that needs repair
  const structureDamage = unit.maxStructure - unit.currentStructure;

  // Repair cost is tonnage x 2 per point of structure
  return unit.tonnage * 2 * structureDamage;
};

/**
 * Calculates the cost to repair based on unit status
 * @param unit The unit to calculate status-based repair costs for
 * @returns The status-based repair cost in C-Bills
 */
export const calculateStatusRepairCost = (unit: Unit): number => {
  const baseCost = unit.tonnage;

  switch (unit.status) {
    case "damaged":
      // Damaged units need tonnage x 2 for repairs
      return baseCost * 2;
    case "crippled":
      // Crippled units need tonnage x 3 for repairs
      return baseCost * 3;
    case "destroyed":
      // Destroyed units need tonnage x 5 for repairs
      return baseCost * 5;
    case "repairing":
      // Units already being repaired don't need additional status repair cost
      return 0;
    case "operational":
      // Operational units don't need repairs
      return 0;
    default:
      return 0;
  }
};

/**
 * Determines if a unit needs repairs
 * @param unit The unit to check
 * @returns True if the unit needs repairs, false otherwise
 */
export const needsRepairs = (unit: Unit): boolean => {
  return (
    unit.status !== "operational" ||
    unit.currentArmor < unit.maxArmor ||
    unit.currentStructure < unit.maxStructure
  );
};

/**
 * Gets a human-readable description of the repairs needed
 * @param unit The unit to describe repairs for
 * @returns A string describing the repairs needed
 */
export const getRepairDescription = (unit: Unit): string => {
  if (!needsRepairs(unit)) {
    return "No repairs needed";
  }

  const parts: string[] = [];

  if (unit.currentArmor < unit.maxArmor) {
    const armorDamage = unit.maxArmor - unit.currentArmor;
    parts.push(`${armorDamage} points of armor damage`);
  }

  if (unit.currentStructure < unit.maxStructure) {
    const structureDamage = unit.maxStructure - unit.currentStructure;
    parts.push(`${structureDamage} points of structure damage`);
  }

  if (unit.status !== "operational" && unit.status !== "repairing") {
    parts.push(`Unit is ${unit.status}`);
  }

  return parts.join(", ");
};
