export interface Campaign {
  id: string;
  name: string;
  description: string;
  employer: string;
  unit: string;
  planet: string;
  contractType: "attack" | "defend" | "recon" | "pursuit" | "breakthrough";
  scale: 1 | 2 | 3 | 4;
  length: number;
  basePay: number;
  transportation: number;
  support: number;
  salvage: number;
  commandType: "independent" | "attached";
  warchest: number;
  battleIds: string[];
  createdAt: string;
  updatedAt: string;
}
