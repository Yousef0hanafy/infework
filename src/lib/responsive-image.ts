import variants from "./project-image-variants.json";

// Existing approved files only: uploaded/external URLs retain their original behavior.
export function responsiveImage(src: string | null | undefined, sizes: string) {
  if (!src || !Object.hasOwn(variants, src)) return {};
  const image = variants[src as keyof typeof variants];
  return {
    srcSet: `${image.small} ${image.smallWidth}w, ${src} ${image.width}w`,
    sizes,
    width: image.width,
    height: image.height,
  };
}

// Source widths include the 16:9 photograph's cover crop in a 16:10 frame.
export const catalogueImageSizes =
  "(min-width: 1400px) 466px, (min-width: 1024px) calc(37.038vw - 53.334px), (min-width: 768px) calc(55.556vw - 62.223px), calc(111.112vw - 53.334px)";

// Case-study images extend to 124% of the frame height for the existing parallax.
export const detailHeroImageSizes =
  "(min-width: 1400px) 1161px, (min-width: 1024px) calc(124vw - 575.36px), (min-width: 768px) calc(124vw - 99.2px), calc(124vw - 59.52px)";
export const detailGalleryImageSizes =
  "(min-width: 1400px) 754px, (min-width: 1024px) calc(82.667vw - 403.414px), (min-width: 768px) calc(82.667vw - 85.974px), (min-width: 640px) calc(82.667vw - 59.521px), calc(165.334vw - 79.361px)";
