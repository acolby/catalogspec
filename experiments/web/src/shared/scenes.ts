import launchHero from "../../scenes/launch-hero.json";
import productWaitlist from "../../scenes/product-waitlist.json";
import type { SceneSnapshot } from "./types";

export const scenes: Record<string, SceneSnapshot> = {
  "launch-hero": launchHero as SceneSnapshot,
  "product-waitlist": productWaitlist as SceneSnapshot,
};

export function getScene(id: string | null | undefined): SceneSnapshot {
  if (id && scenes[id]) return scenes[id];
  return scenes["launch-hero"];
}
