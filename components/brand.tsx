import Link from 'next/link';

export function BrandMark({ className = 'size-10' }: { className?: string }) {
  return <svg viewBox="0 0 64 64" className={className} aria-hidden="true"><path d="M7 12h48L45 25H34L23 59H8l12-34H7z" fill="#3777ff"/><path d="M36 29h21L45 59H31l9-23H28z" fill="#ef4056"/><path d="m53 2 2.4 6.6L62 11l-6.6 2.4L53 20l-2.4-6.6L44 11l6.6-2.6z" fill="#d7ff5f"/></svg>;
}

export function Brand({ footer = false }: { footer?: boolean }) {
  return <Link href="/" className="group inline-flex items-center gap-3" aria-label="TKD Scoring home">
    <BrandMark className={footer ? 'size-9' : 'size-10'} />
    <span>
      <span className="block text-[17px] font-black italic leading-none tracking-[.03em] text-white">TKD <span className="text-electric">SCORING</span></span>
      <span className="mt-1 block text-[7px] font-semibold uppercase tracking-[.19em] text-white/45">TKDTech Sports Management</span>
    </span>
  </Link>;
}
