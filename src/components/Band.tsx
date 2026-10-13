/**
 * Franja oscura con frases que corre de derecha a izquierda (se detiene con el cursor encima y queda quieta con
 * «reducir movimiento»). Es decorativa: lo que dice está escrito también en la página.
 */
export function Band({ items }: { items: string[] }) {
  // Cada tramo tiene que ser más ancho que la pantalla para que el recorrido no muestre el corte.
  const chars = items.join("").length;
  const reps = Math.max(1, Math.ceil(110 / Math.max(chars, 1)));
  const run = Array.from({ length: reps }, () => items).flat();
  const half = (k: string) => (
    <div className="band-run" key={k}>
      {run.map((t, i) => (
        <span className="band-item" key={`${k}-${i}`}>
          {t}
          <svg viewBox="0 0 10 10" aria-hidden="true">
            <path d="M5 0 10 5 5 10 0 5Z" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className="band" data-theme="noche" aria-hidden="true">
      <div className="band-track" style={{ "--band-dur": `${Math.round(run.join("").length * 0.32)}s` } as React.CSSProperties}>
        {half("a")}
        {half("b")}
      </div>
    </div>
  );
}
