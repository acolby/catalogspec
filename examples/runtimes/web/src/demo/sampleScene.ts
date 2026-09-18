import type { SceneSnapshot } from "../scene";

export const sampleScene: SceneSnapshot = {
  version: 1,
  id: "demo-commerce-scene",
  catalog: {
    id: "commerce",
    version: 1,
  },
  theme: "light",
  state: {
    market: "US",
    isLoggedIn: false,
  },
  root: {
    id: "featured-product",
    item: "ProductCard",
    props: {
      sku: "sku_trail_jacket",
      name: "Trail Jacket",
      description: "Water-resistant shell for changing weather.",
      price: 128,
      currency: "USD",
    },
    state: {
      quantity: 1,
      detailsOpen: false,
    },
    slots: {},
  },
};

export const alternateScene: SceneSnapshot = {
  ...sampleScene,
  id: "demo-commerce-scene-alt",
  theme: "dark",
  root: {
    ...sampleScene.root,
    id: "featured-product-alt",
    props: {
      sku: "sku_field_pack",
      name: "Field Pack",
      description: "Compact day pack for short hikes and daily carry.",
      price: 84,
      currency: "USD",
    },
    state: {
      quantity: 2,
      detailsOpen: true,
    },
  },
};
