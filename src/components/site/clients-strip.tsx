import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import type { Client } from "@/types/content";

/** "Trusted by" logo strip with an infinite, pausable marquee. */
export function ClientsStrip({ clients }: { clients: Client[] }) {
  const logos = clients.filter((c) => c.logo_url);
  if (!logos.length) return null;
  // Repeat so the track is always wider than the screen, then duplicate once for a seamless loop.
  const base = Array.from({ length: Math.max(1, Math.ceil(8 / logos.length)) }, () => logos).flat();

  const Item = ({ c, hidden }: { c: Client; hidden?: boolean }) => {
    const img = (
      <span className="relative block h-10 w-[160px] opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 dark:invert sm:w-[190px]">
        <Image src={c.logo_url!} alt={hidden ? "" : c.name} fill sizes="190px" className="object-contain" />
      </span>
    );
    return (
      <li className="shrink-0 px-6 sm:px-9" aria-hidden={hidden || undefined}>
        {c.website_url && !hidden ? (
          <a href={c.website_url} target="_blank" rel="noopener noreferrer" aria-label={c.name}>
            {img}
          </a>
        ) : (
          img
        )}
      </li>
    );
  };

  return (
    <section id="clients" aria-label="Trusted by" className="pt-12 pb-16 sm:pt-16">
      <Reveal className="container-x">
        <p className="text-center text-lg text-text">
          Trusted by <strong className="font-semibold text-heading">growing businesses</strong> around the world
        </p>
      </Reveal>
      <div className="marquee relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="marquee-track flex w-max items-center">
          {base.map((c, i) => (
            <Item key={`a${i}`} c={c} hidden={i >= logos.length} />
          ))}
          {base.map((c, i) => (
            <Item key={`b${i}`} c={c} hidden />
          ))}
        </ul>
      </div>
    </section>
  );
}
