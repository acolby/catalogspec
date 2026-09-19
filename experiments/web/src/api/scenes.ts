import launchHero from "../../scenes/launch-hero.json";
import productWaitlist from "../../scenes/product-waitlist.json";
import type { SceneSnapshot } from "../shared/types";

const scenes = {
  "launch-hero": launchHero as SceneSnapshot,
  "product-waitlist": productWaitlist as SceneSnapshot,
};

export const sceneIds = Object.keys(scenes);

export async function fetchScene(id: string | null | undefined): Promise<SceneSnapshot> {
  const sceneId = id && id in scenes ? id : "launch-hero";
  return scenes[sceneId as keyof typeof scenes];
}
