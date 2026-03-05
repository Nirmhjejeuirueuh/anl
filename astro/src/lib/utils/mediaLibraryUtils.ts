// Shared utilities for the media library marquee sections

/** Strip extension and lowercase a filename */
export function baseName(filename: string): string {
  return filename.replace(/\.[^/.]+$/, '').toLowerCase();
}

/**
 * Pair audio/video items with a matching cover/thumbnail image that shares
 * the same base filename. Matched images are attached as `_coverArt` /
 * `_thumbnail` and removed from the standalone image list.
 */
export function processItems(rawItems: any[]): any[] {
  if (!rawItems?.length) return [];

  const images = rawItems.filter(i => i.mime?.startsWith('image'));
  const nonImages = rawItems.filter(i => !i.mime?.startsWith('image'));

  const imageByBase: Record<string, any> = {};
  for (const img of images) {
    const base = baseName(img.name || '');
    if (base && !imageByBase[base]) imageByBase[base] = img;
  }

  const usedCoverImages = new Set<number>();

  const processed = nonImages.map(item => {
    const base = baseName(item.name || '');
    const matchedImage = imageByBase[base];
    if (item.mime?.startsWith('audio') && matchedImage) {
      usedCoverImages.add(matchedImage.id);
      return { ...item, _coverArt: matchedImage };
    } else if (item.mime?.startsWith('video') && matchedImage) {
      usedCoverImages.add(matchedImage.id);
      return { ...item, _thumbnail: matchedImage };
    }
    return item;
  });

  const standaloneImages = images.filter(i => !usedCoverImages.has(i.id));
  return [...standaloneImages, ...processed];
}

/** Sort items by YYYYMMDD date embedded in filename (newest first) */
export function sortItemsByDate(items: any[]): any[] {
  if (!items) return [];
  return items.sort((a, b) => {
    const extract = (name: string) => (name.match(/(\d{8})/) || ['', '00000000'])[1];
    return extract(b.name || '').localeCompare(extract(a.name || ''));
  });
}

/** Short caption – strips everything after recognisable date pattern */
export function getItemCaption(item: any, index: number): string {
  if (item.caption?.trim()) {
    const full = item.caption.trim();
    const m = full.match(
      /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:\s*-\s*\d{1,2})?,\s+\d{4}/
    );
    if (m) return full.substring(0, full.indexOf(m[0]) + m[0].length).trim();
    return full;
  }
  if (item.name) return item.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
  return `Media ${index + 1}`;
}

/** Full caption for modals */
export function getFullItemCaption(item: any, index: number): string {
  if (item.caption?.trim()) return item.caption.trim();
  if (item.name) return item.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
  return `Media ${index + 1}`;
}
