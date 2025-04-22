import { type Unit } from "./unit";

export const FORCE_SCALES = [1, 2, 3, 4] as const;
export type ForceScale = (typeof FORCE_SCALES)[number];

export interface Force {
  id: string;
  name: string;
  warchest: number;
  scale: ForceScale;
  forces: Force[];
}

export interface ForceInput {
  name: string;
  warchest: number;
  scale: ForceScale;
  forces: Force[];
}

export interface ForceUpdate {
  name?: string;
  warchest?: number;
  scale?: ForceScale;
  forces?: Force[];
}

export const validateForceInput = (
  input: Partial<ForceInput>
): input is ForceInput => {
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

  if (!FORCE_SCALES.includes(input.scale as ForceScale)) {
    return false;
  }

  if (!Array.isArray(input.forces)) {
    return false;
  }

  return true;
};

export const createForce = (input: ForceInput): Force => {
  if (!validateForceInput(input)) {
    throw new Error("Invalid force input");
  }

  return {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    warchest: Math.floor(input.warchest),
    scale: input.scale,
    forces: input.forces || [],
  };
};

export const updateForce = (force: Force, updates: ForceUpdate): Force => {
  const updatedForce = { ...force };

  if (updates.name !== undefined) {
    if (typeof updates.name !== "string" || updates.name.trim().length === 0) {
      throw new Error("Invalid force name");
    }
    updatedForce.name = updates.name.trim();
  }

  if (updates.warchest !== undefined) {
    if (typeof updates.warchest !== "number" || updates.warchest < 0) {
      throw new Error("Invalid warchest value");
    }
    updatedForce.warchest = Math.floor(updates.warchest);
  }

  if (updates.scale !== undefined) {
    if (!FORCE_SCALES.includes(updates.scale)) {
      throw new Error("Invalid scale value");
    }
    updatedForce.scale = updates.scale;
  }

  if (updates.forces !== undefined) {
    if (!Array.isArray(updates.forces)) {
      throw new Error("Invalid forces array");
    }
    updatedForce.forces = updates.forces;
  }

  return updatedForce;
};
