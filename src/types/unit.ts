import { type Force } from "./force";

export const UNIT_SCALES = [1, 2, 3, 4] as const;
export type UnitScale = (typeof UNIT_SCALES)[number];

export interface Unit {
  id: string;
  name: string;
  warchest: number;
  scale: UnitScale;
  forces: Force[];
}

export interface UnitInput {
  name: string;
  warchest: number;
  scale: UnitScale;
  forces: Force[];
}

export interface UnitUpdate {
  name?: string;
  warchest?: number;
  scale?: UnitScale;
  forces?: Force[];
}

export const validateUnitInput = (
  input: Partial<UnitInput>
): input is UnitInput => {
  if (
    !input.name ||
    typeof input.name !== "string" ||
    input.name.trim().length === 0
  ) {
    return false;
  }

  if (typeof input.warchest !== "number" || input.warchest < 0) {
    return false;
  }

  if (!UNIT_SCALES.includes(input.scale as UnitScale)) {
    return false;
  }

  if (!Array.isArray(input.forces)) {
    return false;
  }

  return true;
};

export const createUnit = (input: UnitInput): Unit => {
  if (!validateUnitInput(input)) {
    throw new Error("Invalid unit input");
  }

  return {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    warchest: Math.floor(input.warchest),
    scale: input.scale,
    forces: input.forces || [],
  };
};

export const updateUnit = (unit: Unit, updates: UnitUpdate): Unit => {
  const updatedUnit = { ...unit };

  if (updates.name !== undefined) {
    if (typeof updates.name !== "string" || updates.name.trim().length === 0) {
      throw new Error("Invalid unit name");
    }
    updatedUnit.name = updates.name.trim();
  }

  if (updates.warchest !== undefined) {
    if (typeof updates.warchest !== "number" || updates.warchest < 0) {
      throw new Error("Invalid warchest value");
    }
    updatedUnit.warchest = Math.floor(updates.warchest);
  }

  if (updates.scale !== undefined) {
    if (!UNIT_SCALES.includes(updates.scale)) {
      throw new Error("Invalid scale value");
    }
    updatedUnit.scale = updates.scale;
  }

  if (updates.forces !== undefined) {
    if (!Array.isArray(updates.forces)) {
      throw new Error("Invalid forces array");
    }
    updatedUnit.forces = updates.forces;
  }

  return updatedUnit;
};
