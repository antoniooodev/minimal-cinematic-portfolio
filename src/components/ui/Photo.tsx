import type { Photo as PhotoType } from "@/content/types";
import { asset } from "@/lib/format";

type Props = {
  photo: PhotoType;
  className?: string;
  /** Load immediately instead of when close to the viewport. */
  priority?: boolean;
};

/** A photo in the site's black-and-white film treatment. */
export function Photo({ photo, className, priority = false }: Props) {
  return (
    // Static export: images are served as they are, without optimisation.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(photo.src)}
      alt={photo.alt}
      className={`film ${className ?? ""}`}
      style={{ objectPosition: photo.position }}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
