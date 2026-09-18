import type { InstanceRuntimeContext } from "../../scene";

function asNumber(value: unknown, fallback: number): number {
  return typeof value === "number" ? value : fallback;
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function ProductCard(context: InstanceRuntimeContext) {
  const { instance, emitEvent, requestAction, renderSlot } = context;
  const props = instance.props ?? {};
  const state = instance.state ?? {};

  const sku = asString(props.sku, "unknown-sku");
  const name = asString(props.name, "Unnamed product");
  const description = asString(props.description);
  const price = asNumber(props.price, 0);
  const currency = asString(props.currency, "USD");
  const imageUrl = asString(props.imageUrl);
  const quantity = asNumber(state.quantity, 1);
  const detailsOpen = state.detailsOpen === true;

  const formattedPrice = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  }).format(price);

  return (
    <article class="product-card" onClick={() => emitEvent("selected", { sku })}>
      {imageUrl ? <img class="product-card__image" src={imageUrl} alt="" /> : null}
      <div class="product-card__body">
        <div class="product-card__header">
          <div>
            <p class="product-card__eyebrow">{sku}</p>
            <h2>{name}</h2>
          </div>
          <div class="product-card__badge">{renderSlot("badge")}</div>
        </div>

        {description ? <p class="product-card__description">{description}</p> : null}
        {detailsOpen ? <p class="product-card__details">Details are expanded for this scene item instance.</p> : null}

        <div class="product-card__meta">
          <strong>{formattedPrice}</strong>
          <span>Qty {quantity}</span>
        </div>

        <div class="product-card__actions">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              requestAction("addToCart", { sku, quantity });
            }}
          >
            Add to cart
          </button>
          <button
            type="button"
            class="secondary"
            onClick={(event) => {
              event.stopPropagation();
              requestAction("toggleDetails", {});
            }}
          >
            Toggle details
          </button>
        </div>

        <footer>{renderSlot("footer")}</footer>
      </div>
    </article>
  );
}
