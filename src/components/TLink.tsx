"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { cover } from "@/motion/curtain";
import { scrollToTarget } from "@/motion/core";

type Props = ComponentProps<typeof Link> & { href: string; label?: string };

/**
 * Enlace interno con transición: «/#caminos» desde la portada solo hace scroll; hacia otra página sube la
 * cortina con `label` (el nombre del destino) y después navega. Ctrl/⌘ + clic abre en otra pestaña como siempre.
 */
export function TLink({ href, label, onClick, children, ...rest }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function handle(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const [path, hash] = href.split("#");
    const target = path || pathname;
    if (normalize(target) === normalize(pathname)) {
      e.preventDefault();
      if (hash) {
        scrollToTarget(`#${hash}`);
        history.replaceState(null, "", `#${hash}`);
      } else scrollToTarget(0);
      return;
    }
    e.preventDefault();
    void cover(label ?? "Zontes").then(() => router.push(href, { scroll: false }));
  }

  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}

const normalize = (p: string) => (p.endsWith("/") ? p : `${p}/`);
