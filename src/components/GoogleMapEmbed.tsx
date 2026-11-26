import { SITE } from "@/data/site";

interface GoogleMapEmbedProps {
  heightClass?: string;
}

export function GoogleMapEmbed({ heightClass = "h-[360px] sm:h-[420px]" }: GoogleMapEmbedProps) {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-border-subtle bg-surface-muted ${heightClass}`}>
      <iframe
        title="Bản đồ chỉ đường đến Conic Computer - Chung cư Conic 13B, Bình Chánh, TP.HCM"
        src={SITE.mapEmbedSrc}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
