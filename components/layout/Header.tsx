"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { COMPANY, LINKS, NAV_LINKS } from "@/lib/constants";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-md">
      <motion.div
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/"
          className="display-heading text-lg text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          D&apos;BAY<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/track"
            className="text-sm text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Track
          </Link>
          <motion.a
            href={LINKS.x}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2 !px-4 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Message on X
          </motion.a>
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span
            className={`block h-0.5 w-6 bg-ink transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-ink transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-ink transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            className="border-t border-border bg-paper px-5 py-6 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-lg text-ink"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/track"
                  className="text-lg text-ink"
                  onClick={() => setMobileOpen(false)}
                >
                  Track order
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href={LINKS.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                >
                  Message on X
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="hidden border-t border-border md:block">
        <p className="mx-auto max-w-6xl px-8 py-1.5 text-center text-[10px] tracking-[0.15em] uppercase text-muted">
          {COMPANY.name} · {COMPANY.rc} · {COMPANY.location}
        </p>
      </div>
    </header>
  );
}
