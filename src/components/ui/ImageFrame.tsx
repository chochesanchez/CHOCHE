import Image from "next/image";

/**
 * next/image in a fixed-ratio frame. Grayscale by default, true color on hover
 * — keeps the site monochrome while letting the work itself bloom.
 */
export default function ImageFrame({
  src,
  alt,
  ratio = "4 / 3",
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  ratio?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`group/frame relative overflow-hidden border border-hairline bg-white ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover grayscale transition-[filter,transform] duration-700 ease-editorial group-hover/frame:scale-[1.02] group-hover/frame:grayscale-0"
      />
    </div>
  );
}
