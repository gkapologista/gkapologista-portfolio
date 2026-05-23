// Derive the .webp sibling of an image path so templates can offer a
// <source srcset> while keeping the original PNG/JPG as the <img> fallback.
// Handles .png / .PNG / .jpg / .jpeg / .JPG.
export function webpFrom(src: string): string {
  return src.replace(/\.(png|jpe?g)$/i, '.webp');
}
