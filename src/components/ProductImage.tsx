import { CSSProperties } from "react";

export type ProductImageItem = {
  base: string;
  /** Raster-Fallback-Format: "jpg" oder "png" */
  ext: "jpg" | "png";
  alt: string;
};

type Props = {
  item: ProductImageItem;
  sizes?: string;
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Optimiertes Produktbild mit WebP + Raster-Fallback.
 * Erwartet bereits vorgenerierte Varianten unter:
 *   /products/sommerfrische/{base}-{480|768|1200}.{webp|jpg|png}
 */
export const ProductImage = ({ item, sizes = "100vw", eager = false, className, style }: Props) => {
  const base = `/products/sommerfrische/${item.base}`;
  const webpSrcSet = [480, 768, 1200].map((w) => `${base}-${w}.webp ${w}w`).join(", ");
  const rasterSrcSet = [480, 768, 1200].map((w) => `${base}-${w}.${item.ext} ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={`${base}-1200.${item.ext}`}
        srcSet={rasterSrcSet}
        sizes={sizes}
        alt={item.alt}
        loading={eager ? "eager" : "lazy"}
        // @ts-expect-error – React typings hinken hinterher
        fetchpriority={eager ? "high" : "auto"}
        decoding="async"
        className={className}
        style={style}
      />
    </picture>
  );
};

export const sommerfrischeImages: ProductImageItem[] = [
  {
    base: "sommerfrische_3",
    ext: "png",
    alt: "Eckdaten: A++ Kühlen, A+ Heizen, 39 dbA Silent-Modus, 518×340×646 mm Innengerät, 42 kg",
  },
  {
    base: "sommerfrische_5",
    ext: "jpg",
    alt: "Sommerfrische Klimagerät im Wohnraum mit Außenmodul am Fenster",
  },
  {
    base: "sommerfrische_1",
    ext: "jpg",
    alt: "Sommerfrische Klimagerät im Wohnzimmer-Setup",
  },
  {
    base: "sommerfrische_2",
    ext: "jpg",
    alt: "Sommerfrische Klimagerät im Einsatz am Arbeitsplatz",
  },
  {
    base: "sommerfrische_4",
    ext: "jpg",
    alt: "Außenmodul am Fenster befestigt",
  },
];

export default ProductImage;
