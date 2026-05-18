import Link from "next/link";
import { COMPANY, LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-sea text-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="display-heading text-2xl">D&apos;BAY-Exquisite</p>
            <p className="mt-3 max-w-xs text-sm text-paper/70 leading-relaxed">
              {COMPANY.tagline}. Send a US store link on X. We vet, quote in
              Naira, ship, and deliver.
            </p>
          </div>

          <div>
            <p className="section-label !text-paper/50 mb-4">Connect</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={LINKS.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/90 hover:text-paper underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  @dbayexquisite on X
                </a>
              </li>
              <li>
                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/90 hover:text-paper underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={LINKS.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/90 hover:text-paper underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  All links (Linktree)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="section-label !text-paper/50 mb-4">Company</p>
            <ul className="space-y-2 text-sm text-paper/80">
              <li>{COMPANY.name}</li>
              <li>{COMPANY.rc}</li>
              <li>{COMPANY.location}</li>
              <li>
                <Link
                  href="/track"
                  className="text-paper/90 hover:text-paper underline-offset-4 hover:underline"
                >
                  Track order
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-paper/10 pt-8 text-xs text-paper/50 sm:flex-row sm:justify-between">
          <p>
            © {year} {COMPANY.name}. All rights reserved.
          </p>
          <p>Rates subject to FX market changes.</p>
        </div>
      </div>
    </footer>
  );
}
