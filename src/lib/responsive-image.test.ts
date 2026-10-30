import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Window } from "happy-dom";
import { describe, expect, it } from "vitest";
import ParallaxImage from "../components/infeworks/ParallaxImage";
import variants from "./project-image-variants.json";
import {
  catalogueImageSizes,
  detailGalleryImageSizes,
  detailHeroImageSizes,
  responsiveImage,
} from "./responsive-image";

function webpDimensions(path: string) {
  const bytes = readFileSync(resolve("public", path.slice(1)));
  expect(bytes.toString("ascii", 0, 4)).toBe("RIFF");
  expect(bytes.toString("ascii", 8, 12)).toBe("WEBP");
  for (let offset = 12; offset < bytes.length;) {
    const chunk = bytes.toString("ascii", offset, offset + 4);
    const size = bytes.readUInt32LE(offset + 4);
    const data = offset + 8;
    if (chunk === "VP8X") {
      return [bytes.readUIntLE(data + 4, 3) + 1, bytes.readUIntLE(data + 7, 3) + 1];
    }
    if (chunk === "VP8 ") {
      expect(bytes.subarray(data + 3, data + 6)).toEqual(Buffer.from([0x9d, 0x01, 0x2a]));
      return [bytes.readUInt16LE(data + 6) & 0x3fff, bytes.readUInt16LE(data + 8) & 0x3fff];
    }
    if (chunk === "VP8L") {
      expect(bytes[data]).toBe(0x2f);
      const bits = bytes.readUInt32LE(data + 1);
      return [(bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1];
    }
    offset = data + size + (size % 2);
  }
  throw new Error(`No image dimensions in ${path}`);
}

const window = new Window();

function imageIn(markup: string) {
  window.document.body.innerHTML = markup;
  const img = window.document.querySelector("img");
  if (!img) throw new Error("Expected rendered image");
  return img;
}

describe("approved image delivery", () => {
  it("covers every approved full hero file with an existing, correctly described variant", () => {
    const files = readdirSync("public/hero", { recursive: true })
      .map(String)
      .filter((path) => path.endsWith(".webp") && !path.endsWith("-800.webp"))
      .map((path) => `/hero/${path.replaceAll("\\", "/")}`)
      .sort();
    expect(Object.keys(variants).sort()).toEqual(files);
    for (const [src, image] of Object.entries(variants)) {
      expect(webpDimensions(src)).toEqual([image.width, image.height]);
      const [width, height] = webpDimensions(image.small);
      expect(width).toBe(image.smallWidth);
      expect(height! / width!).toBeCloseTo(image.height / image.width, 2);
      expect(image.smallWidth).toBeLessThan(image.width);
      const img = imageIn(
        renderToStaticMarkup(
          createElement("img", {
            src,
            alt: "Approved project",
            loading: "lazy",
            ...responsiveImage(src, catalogueImageSizes),
          }),
        ),
      );
      expect(img.getAttribute("src")).toBe(src);
      expect(img.getAttribute("srcset")).toBe(`${image.small} ${width}w, ${src} ${image.width}w`);
      expect(img.getAttribute("sizes")).toBe(catalogueImageSizes);
      expect(img.getAttribute("width")).toBe(String(image.width));
      expect(img.getAttribute("height")).toBe(String(image.height));
      expect(img.getAttribute("loading")).toBe("lazy");
      expect(img.getAttribute("alt")).toBe("Approved project");
    }
  });

  it.each([
    undefined,
    null,
    "",
    "/hero/future-project/00-cover.webp",
    "/images/projects/other/cover.webp",
    "https://example.com/hero/ameriya-cold-storage/00-cover.webp",
    "/hero/ameriya-cold-storage/00-cover.webp?version=2",
    "/hero/ameriya-cold-storage/00-cover.webp#crop",
    "toString",
    "__proto__",
  ])("does not infer variants or dimensions for %s", (src) => {
    expect(responsiveImage(src, "100vw")).toEqual({});
  });

  it("renders the existing priority hero and lazy gallery without changing their frame or source", () => {
    const src = "/hero/ameriya-cold-storage/00-cover.webp";
    for (const priority of [true, false]) {
      const sizes = priority ? detailHeroImageSizes : detailGalleryImageSizes;
      const markup = renderToStaticMarkup(
        createElement(ParallaxImage, {
          src,
          alt: "Case study photograph",
          priority,
          sizes,
          ratio: "4/3",
        }),
      );
      const img = imageIn(markup);
      expect(img.getAttribute("src")).toBe(src);
      expect(img.getAttribute("srcset")).toContain("00-cover-800.webp 800w");
      expect(img.getAttribute("sizes")).toBe(sizes);
      expect(img.getAttribute("alt")).toBe("Case study photograph");
      expect(img.getAttribute("width")).toBe("1600");
      expect(img.getAttribute("height")).toBe("900");
      expect(img.getAttribute("decoding")).toBe("async");
      expect(img.getAttribute("loading")).toBe(priority ? null : "lazy");
      expect(img.getAttribute("fetchpriority")).toBe(priority ? "high" : null);
      expect(img.parentElement?.getAttribute("style")).toContain("aspect-ratio:4/3");
      expect(img.className).toContain("h-[124%]");
    }
  });

  it("leaves unknown Parallax images without responsive metadata and retains empty-image fallback", () => {
    const img = imageIn(
      renderToStaticMarkup(
        createElement(ParallaxImage, {
          src: "https://example.com/photo.webp",
          alt: "Uploaded photo",
        }),
      ),
    );
    expect(img.getAttribute("src")).toBe("https://example.com/photo.webp");
    for (const attribute of ["srcset", "sizes", "width", "height"]) {
      expect(img.hasAttribute(attribute)).toBe(false);
    }
    const fallback = renderToStaticMarkup(createElement(ParallaxImage, { src: "", alt: "" }));
    expect(fallback).toContain("Infeworks Infrastructure");
    expect(fallback).not.toContain("<img");
  });
});
