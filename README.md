# Zontes Paraguay — propuesta de sitio (versión con fotos)

Sitio para una concesionaria Zontes en Paraguay, hecho con **Next.js (React + TypeScript)** y **GSAP**
(ScrollTrigger + Lenis). Es una **propuesta**: la dirección, los teléfonos, el WhatsApp y las redes son
**datos de ejemplo**.

Esta es la **versión sin 3D**: la portada usa las fotos de las motos en capas con **parallax** en lugar de la
moto en Three.js. Todo lo demás (pantalla de carga, la gama, fichas, caminos, menú, contacto) es igual.

Las especificaciones de los 18 modelos salen de [zontes.com.ar](https://zontes.com.ar/) (Zontes Argentina).
Solo se cargó lo publicado: si un dato no figura, la ficha no lo muestra.

## Empezar

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # genera out/ (sitio estático)
npm start          # sirve out/ para probar el build
```

**Publicar en Vercel:** importá el repositorio y listo (Vercel detecta Next.js). En cualquier otro hosting
estático, subí la carpeta `out/`. Para que las vistas previas al compartir el enlace usen el dominio
correcto, definí `NEXT_PUBLIC_SITE_URL` (por ejemplo `https://zontes.com.py`).

## Antes de publicar

- [ ] **Datos reales** en `src/content/dealer.ts` (dirección, horarios, WhatsApp con 595, teléfono, correo,
      redes) y `demo: false`. Eso quita los avisos de «datos de ejemplo» del pie y del formulario.
- [ ] **Especificaciones para Paraguay:** revisá `src/content/models.ts` contra las fichas oficiales del
      importador (pueden variar de las de Argentina) y completá los modelos que hoy tienen ficha corta.
- [ ] **Fotos:** ya hay fotos de 703F, 703RR, 350X, 350GK, 350T y 368G ETC. Para el resto, ver «Sumar fotos».
      Confirmá que las fotos se pueden usar (las de estudio y las de uso que se cargaron son ilustrativas).
- [ ] **Logo:** el encabezado usa la palabra «Zontes» en la tipografía del sitio. Si la marca autoriza su
      logo, reemplazalo en `src/components/Header.tsx` (`.brand`).

## Editar el contenido

| Qué | Dónde |
|---|---|
| Modelos, fichas, colores, usos, momentos de la 703F | `src/content/models.ts` |
| Fotos (archivo, tamaño, texto alternativo) | `src/content/photos.ts` |
| Textos de la portada, escenas del recorrido (`story`: textos, fotos y diseño de cada una), colores a probar (`colorPicks`), «Para nuestros caminos» (foto de fondo, `bgPos`, botón), servicios, franja y preguntas frecuentes | `src/content/home.ts` |
| Datos de la concesionaria y enlaces de WhatsApp | `src/content/dealer.ts` |

Cada modelo tiene `uses` (`ciudad`, `ruta`, `tierra`, `pista`): de ahí salen los filtros del catálogo.
El primer color de `paints` es el que pinta su placa en la lista (y la portada de la ficha si no tiene foto).

## Sumar fotos

1. **Foto de estudio** (la moto sola, recortada con fondo transparente, mirando a la derecha si se puede):
   exportala en WebP, de 600 a 1600 px de ancho, y copiala a `public/fotos/<modelo>/<color>.webp`.
2. Agregala en `src/content/photos.ts` con su ancho y alto reales y un texto alternativo que describa la moto
   («Zontes 350R azul, vista de tres cuartos»).
3. En `src/content/models.ts`, poné `photo: F.<grupo>.<foto>` en el color que corresponde. Listo: la foto
   aparece en la vitrina de la gama, en la miniatura de la lista (tablet y teléfono), en la portada y en
   «Colores y vistas» de la ficha, en las tarjetas «También en la gama» y en «Para nuestros caminos».
4. **Otras vistas** del mismo modelo (perfil, lado izquierdo): van en `photos` del modelo, con `label`.
5. **Fotos de uso** (la moto en la calle): van en `moments` del modelo (pestañas de la ficha) o en `roads`
   (`home.ts`), donde son el fondo desenfocado de «Para nuestros caminos». `pos` y `bgPos` eligen qué parte de
   la foto queda a la vista al recortarla (como `object-position`). Para ese fondo conviene una foto de 1920 px
   o más: con las actuales (500 px de ancho) el desenfoque disimula que son chicas.

Un color sin foto se muestra como una placa en ese color que dice «Foto en <color>: próximamente», para que
nadie vea una moto negra cuando eligió la naranja.

## Cómo está armado

```
src/
  app/                    páginas: portada, /modelos, /modelos/[modelo] (18, estáticas), /contacto
  content/                los textos y datos
  components/
    home/                 portada: Hero (foto en capas), Story (escenas con parallax), ColorPick, la gama,
                          caminos, servicio
    models/               la gama (filas + vitrina con foto), catálogo con filtros, tarjetas, momentos,
                          preguntas frecuentes, foto y placa pintada
    Band                  la franja oscura que corre (se detiene con el cursor; quieta con «reducir movimiento»)
    Header, Footer, ContactBlock (formulario → WhatsApp), TLink (enlaces con transición)
  motion/                 GSAP + ScrollTrigger + Lenis, parallax.ts, cortina entre páginas, tema del encabezado
  styles/                 tokens.css y los estilos por parte
```

- **Contacto por WhatsApp.** El sitio es estático: el formulario arma el mensaje (nombre, motivo, modelo)
  y abre WhatsApp con el texto listo. No se guarda ningún dato.
- **Sin WebGL:** la portada pesa mucho menos que la versión 3D y no depende de la placa de video del equipo.

## Sistema de diseño

Misma estructura que el sistema de diseño «Render», con identidad propia:

- **Tres capas de tokens** (`src/styles/tokens.css`): primitivos `--c-*`, temas `--t-<tema>-*` y semánticos
  `--bg`, `--fg`, `--muted`, `--line`, `--panel`. Temas: **día** (estudio de aluminio), **noche**,
  **tierra** (la tierra colorada, disponible) y **pintura** / **pintura-clara** (la portada de las fichas sin foto,
  sobre `--paint`). «Para nuestros caminos» usa **noche** sobre la foto desenfocada.
- **Color:** aluminio `#D9DBD8`, asfalto `#1A1B1D`, goma `#0E0F10`, grafito `#5A5E62`. El **ámbar del guiño**
  `#FF9E1B` es solo para acciones (WhatsApp, prueba de manejo); al pasar el cursor parpadea dos veces.
  El color fuerte lo ponen las motos: cada ficha usa su pintura real.
- **Tipografía:** Archivo (variable; el eje de ancho es expresivo: los nombres de los modelos se ensanchan
  al pasar el cursor) y Barlow (nacida de los carteles de ruta) para texto y fichas.
- **Movimiento:** una sola secuencia de carga (la palabra gigante «acelera» de angosta a ancha). El resto
  responde a lo que hace la persona: scroll, cursor, clic. El nombre gigante detrás de cada foto «acelera»
  igual al cambiar de modelo; la franja de frases corre sola, y se detiene con el cursor o con «reducir
  movimiento».
- **Fotos:** sobre el aluminio del estudio, delante del nombre del modelo en su pintura (en las pinturas muy
  oscuras el nombre se aclara para que la moto no se pierda).

## Pantalla de carga

«Acelera»: sobre asfalto, la palabra ZONTES se ensancha mientras carga el sitio y un contador va de 000 a
100 km/h. Al llegar a 100 el ámbar hace el guiño dos veces y la cortina sube; en la portada, la palabra gigante
de abajo está en el mismo lugar, así el paso se ve continuo.

- **Espera la carga real:** fuentes y fotos de la página (la de la portada tiene prioridad alta; las de más abajo
  se cargan al acercarse). Dura como mínimo 2 s y como máximo 5 s. Mientras carga no se puede hacer scroll.
- **Cuándo aparece:** cada vez que se abre o se recarga el sitio (F5). Al navegar por dentro del sitio no
  vuelve a aparecer (esos cambios de página usan la cortina) y nunca aparece con «reducir movimiento». Para que
  salga una sola vez por pestaña, poné `LOADER_ONCE_PER_SESSION = true` en `components/loaderBoot.ts`. Lo decide
  un script chico en el `<head>`, antes de pintar, así no hay parpadeo.
- **Sin JavaScript** no aparece, y si el JavaScript del sitio fallara, a los 9 s se saca sola.
- **Rendimiento:** para juzgar la velocidad, probá el build (`npm run build && npm start`): `npm run dev` es
  varias veces más lento (código sin optimizar, React en modo desarrollo, cada página se compila la primera vez
  que se abre).
- Archivos: `components/Loader.tsx`, `components/loaderBoot.ts` (script del `<head>`), `motion/loader.ts`
  (la portada espera a la cortina para hacer su entrada) y `styles/loader.css`.

## Barra de scroll

La barra del navegador está oculta (`styles/base.css`), como en lukebaffait.fr. El scroll no cambia: rueda,
trackpad, teclado y touch siguen moviendo el scroll nativo, que es el que usan Lenis y ScrollTrigger. En su
lugar hay un indicador propio (`components/ScrollBar.tsx`), hecho con un ScrollTrigger de toda la página
(`start: 0`, `end: "max"`, `onUpdate` → `self.progress`): aparece al scrollear, con mouse se puede arrastrar o
tocar la pista para saltar, y se ve oscuro sobre fondos claros y claro sobre los oscuros. Para volver a la barra
del navegador, borrá las dos líneas de `html{scrollbar-width:none}` y `::-webkit-scrollbar` y quitá
`<ScrollBar />` del layout.

## La portada con fotos en capas (parallax)

**Portada** (`components/home/Hero.tsx`): tres capas. Atrás, la palabra gigante ZONTES (en el mismo lugar y
tamaño que la de la pantalla de carga, así el paso es continuo); en el medio, la 703F de estudio; adelante, el
texto. Al bajar, cada capa va a otra velocidad: la palabra se queda atrás, la moto sube y se acerca un poco, el
texto se va primero. Con mouse, la moto y la palabra siguen al puntero apenas, en sentidos opuestos. Cada capa
tiene un contenedor para el scroll y otro para el puntero, así una animación no pisa a la otra.

**El recorrido** (`components/home/Story.tsx`, textos en `story` de `content/home.ts`): cinco escenas que
alternan día y noche.

| Escena | Diseño | Fotos |
|---|---|---|
| 01 Diseñada en Jiangmen | `split`: texto + foto | 703F en la tierra colorada |
| 02 De 198 a 699 cc | `trio`: tres motos con su cilindrada atrás | 350GK, 368G ETC, 703RR |
| 03 Cuando cae el sol | `split` (noche) | 703F con las luces prendidas |
| 04 Todo a la vista | `collage` (noche): dos fotos superpuestas | 703F en la ciudad y en ruta |
| 05 Elegí el color | pastillas de color, nombre gigante en la pintura | 703F, 350X, 703RR, 350T |

**Cómo se mueve** (`motion/parallax.ts`, GSAP ScrollTrigger con `scrub`):

- Cada elemento con `data-speed` se desplaza mientras su escena cruza la pantalla. Positivo = se queda atrás
  (como algo lejano); negativo = se adelanta (como algo cercano). El número es la fracción del alto de la
  pantalla que recorre: `0.22` (la palabra del fondo) recorre el 22 %.
- Las fotos dentro de un cuadro (`.scene-frame`) se agrandan un 15 % y se deslizan adentro: la foto parece más
  lejos que su marco.
- Solo se animan `transform` y `opacity` (no hay relayout al scrollear). Con «reducir movimiento» no se mueve
  nada y todo queda en su lugar.
- Para cambiar una escena: editá `story` en `content/home.ts` (`layout`, `photo` / `photos` / `bikes`,
  `theme`); para cambiar cuánto se mueve una capa, su `data-speed` en `Story.tsx`.

## Responsive y accesibilidad

- Probado de 320 px a 1920 px, tabletas y teléfonos en horizontal: sin scroll horizontal ni textos cortados.
- En el teléfono (y la tablet en vertical) ZONTES y la moto van arriba y los textos abajo; en pantallas bajas
  (teléfono en horizontal) la moto pasa a la derecha y los textos se compactan.
- Con **reducir movimiento** no hay pantalla de carga, scroll suave, parallax ni cortina: la portada y las
  escenas quedan quietas. La franja de frases queda quieta.
- Navegable con teclado («Ir al contenido» con el primer Tab, foco visible en ámbar), pestañas con roles
  ARIA y flechas/Inicio/Fin, preguntas frecuentes con `<details>`, formulario con errores que llevan el foco
  al campo. Pasar el foco por una fila de la gama actualiza la vitrina, igual que el cursor.

## Marcas

Zontes es una marca de Guangdong Tayo Motorcycle Technology Co., Ltd. Este proyecto no usa logos de la
marca; para publicarlo como sitio oficial hace falta la autorización correspondiente.
#   d e m o Z o n t e s P Y  
 