'use client';

export default function myImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // Eğer CDN URL tanımlanmışsa CDN'i kullan, yoksa yerel sunucudan hizmet ver (unoptimized gibi çalışır)
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || '';
  
  if (cdnUrl) {
    // CDN üzerinden hizmet verirken basit bir proxy veya CDN yapısı varsayımı
    return `${cdnUrl}${src}?w=${width}&q=${quality || 75}`;
  }

  // Varsayılan davranış
  return `${src}?w=${width}&q=${quality || 75}`;
}
