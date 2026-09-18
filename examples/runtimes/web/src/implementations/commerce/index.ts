import type { CatalogImplementation } from "../../scene";
import { ProductCard } from "./ProductCard";

export const commerceImplementation: CatalogImplementation = {
  catalog: {
    id: "commerce",
    version: 1,
  },
  items: {
    ProductCard,
  },
};
