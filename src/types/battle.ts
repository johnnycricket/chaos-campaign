export interface Battle {
  id: string;
  name: string;
  type: "attack" | "defend" | "recon" | "pursuit" | "breakthrough";
  location: string;
  date: string;
  description: string;
  result: "victory" | "defeat" | "draw" | "pre-battle" | "post-battle";
  warchestChange: number;
}
