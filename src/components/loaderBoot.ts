/** Clave de sesión de la pantalla de carga (se guarda cuando termina). */
export const LOADER_SESSION_KEY = "zontes-carga";

/**
 * ¿La pantalla de carga se muestra una sola vez por sesión?
 * - false (ahora): aparece cada vez que se abre o se recarga el sitio (F5). Al navegar por dentro del sitio no
 *   vuelve a aparecer: esos cambios de página usan la cortina.
 * - true: aparece solo la primera vez en cada pestaña; si la persona recarga, entra directo.
 */
export const LOADER_ONCE_PER_SESSION = false;

/**
 * Corre en el <head>, antes de que se pinte la página: decide si hay pantalla de carga (nunca con «reducir
 * movimiento»). Si el JavaScript del sitio no llegara a cargar, a los 9 s la saca igual para que se pueda usar.
 */
export const loaderBootScript = `(function(){var d=document.documentElement;try{if(${LOADER_ONCE_PER_SESSION ? `sessionStorage.getItem("${LOADER_SESSION_KEY}")||` : ""}matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("con-carga");setTimeout(function(){if(!window.__zontesCarga)d.classList.remove("con-carga")},9000)}catch(e){}})();`;
