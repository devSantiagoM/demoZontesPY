"use client";

/**
 * Coordinación con la pantalla de carga (components/Loader.tsx).
 *
 * - `whenLoaded()`: la portada espera a que la cortina empiece a subir para hacer su entrada. Si no hubo pantalla
 *   de carga (segunda visita en la sesión, «reducir movimiento» o navegación interna) se resuelve enseguida.
 * - `markReady(tarea)`: avisa que algo que la carga espera ya está listo (por ejemplo, un video o una escena).
 */
type Result = { fromLoader: boolean };

let released = false;
const waiters: ((r: Result) => void)[] = [];
const ready = new Set<string>();
const readyWaiters = new Map<string, (() => void)[]>();

/** ¿Hay una pantalla de carga en curso? (la decide el script del <head> antes de pintar la página) */
export const loaderActive = () => typeof document !== "undefined" && document.documentElement.classList.contains("con-carga") && !released;

export function whenLoaded(): Promise<Result> {
  if (!loaderActive()) return Promise.resolve({ fromLoader: false });
  return new Promise((resolve) => waiters.push(resolve));
}

/** La llama la pantalla de carga cuando la cortina empieza a subir. */
export function releaseLoaded() {
  released = true;
  waiters.splice(0).forEach((w) => w({ fromLoader: true }));
}

export function markReady(task: string) {
  ready.add(task);
  readyWaiters.get(task)?.splice(0).forEach((w) => w());
}

export function waitFor(task: string) {
  if (ready.has(task)) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const list = readyWaiters.get(task) ?? [];
    list.push(resolve);
    readyWaiters.set(task, list);
  });
}
