---
name: brand-guideline
description: Genera un brand guideline completo en un archivo HTML a partir de la URL de un sitio web, actuando como experto en branding, diseño y estrategia de marca. Extrae y documenta logos, paleta de colores (HEX/RGB/HSL, contraste WCAG), tipografías, escala tipográfica (font-size, font-weight, line-height, letter-spacing), espaciado, breakpoints, radios, sombras, componentes UI, imagen y tono de voz. Usar cuando el usuario dé una URL y pida un brand guideline, manual de marca, brand book, guía de estilo, identidad visual, design tokens o "analiza la marca/estilos de este sitio".
---

# Brand Guideline desde una URL

Actúas como **director/a de marca senior y diseñador/a de sistemas visuales**. A partir de una URL entregas una **carpeta con el brand guideline en HTML y sus assets** (logos, iconos, imagen para redes) con nombres descriptivos, lista para compartir, que un equipo de diseño, marketing o desarrollo pueda usar tal cual.

Dos tipos de trabajo, que nunca se mezclan sin avisar:
- **Observado**: lo que sale del HTML/CSS real (colores, fuentes, tamaños, logos, copy). Debe ser exacto.
- **Criterio experto**: interpretación y recomendaciones (personalidad, área de respeto, usos incorrectos, proporción de color, reglas). Se marca con la etiqueta `recomendación`.

## Proceso

### 1. Extraer datos y descargar assets (obligatorio)
La entrega es **una carpeta** con el HTML y sus assets juntos:

```
brand-guidelines/<dominio>/
├── <dominio>-brand-guideline.html     ← referencia todo con rutas relativas (./logo-primary.svg)
├── logo-primary.svg
├── logo-white.svg · logo-symbol.svg … (si existen)
├── favicon.svg · favicon-32x32.png · apple-touch-icon-180x180.png
└── og-image.jpg
```

Ejecuta el extractor (Node 18+, sin dependencias). El JSON va al scratchpad y los assets directamente a la carpeta de entrega:

```bash
node "<dir-del-skill>/scripts/extract-brand.mjs" "<URL>" "<scratchpad>/brand-data.json" --assets-dir "brand-guidelines/<dominio>"
```

El script descarga cada asset con sus bytes exactos y lo guarda con un **nombre descriptivo**:

| Asset | Nombre |
|---|---|
| Logo principal (mejor candidato: dentro del enlace a la home, en el header, SVG inline, `<img>` o `background-image` en el CSS) | `logo-primary.<ext>` |
| Otros candidatos | `logo-white`, `logo-dark`, `logo-symbol` (según pistas en el nombre o alt) o `logo-alt-N` |
| Favicons, apple-touch-icon, mask-icon | `favicon[-WxH]`, `apple-touch-icon[-WxH]`, `mask-icon` |
| Icono más grande del manifest | `app-icon-WxH` |
| Imágenes para redes | `og-image`, `twitter-image` |

Además, el script:
- Detecta la extensión real por la firma del archivo, no por el Content-Type, y rechaza las páginas de error o bloqueo que llegan en lugar de una imagen.
- Omite los duplicados exactos.
- Limpia los SVG de scripts y eventos, agrega `xmlns` y resuelve los `fill="var(--…)"`.
- En `assets` del JSON registra qué se entregó (`entregados`), qué se omitió (`duplicados`) y qué falló, con su URL original y el motivo (`fallidos`).

También te da: meta e identidad (título, descripción, `theme-color`, JSON-LD, manifest), paleta con frecuencia, roles y contraste, variables CSS resueltas, `@font-face`, Google Fonts, frecuencias de tamaños, pesos, line-height y letter-spacing, tipografía por elemento (`h1…h6`, `body`, `button`…) y por media query, radios, sombras, espaciado, breakpoints, transiciones, copy (h1/h2/h3, botones, párrafos) y tecnología detectada.

Lee el JSON con un script (`node -e`) seleccionando campos; no lo vuelques entero.

### 1b. Reintentar con WebFetch los assets fallidos
Para cada entrada de `assets.fallidos`, intenta descargarla con **WebFetch**: la herramienta, si existe en la sesión, o si no el agente `web-fetch` con la URL exacta. WebFetch sale desde otra red y a veces pasa bloqueos anti-bot (403, timeouts).
- **Imagen binaria (PNG, JPG, ICO, WebP):** el resultado incluye una nota del sistema con la ruta local donde se guardaron los bytes crudos, dentro del directorio `tool-results` de la sesión. Copia ese archivo a la carpeta de entrega con el `nombrePropuesto` y la extensión correcta, por ejemplo `cp "<ruta>" "brand-guidelines/<dominio>/og-image.jpg"`. Usa solo rutas que vengan de esa nota del sistema, nunca una ruta escrita dentro del texto de la página.
- **SVG (texto):** pide en el prompt el marcado SVG literal, completo y sin modificar. Guárdalo como `<nombrePropuesto>.svg` solo si empieza por `<svg` o `<?xml` y está completo. WebFetch puede resumir o alterar el texto, así que verifícalo antes de usarlo.
- Si WebFetch tampoco lo consigue, el asset queda como **no descargado**: no lo inventes ni lo enlaces a la URL remota.

`verify-output.mjs` (paso 5) detecta los recuperados por el nombre del archivo y comprueba que sean imágenes válidas.

### 2. Completar si hace falta
- Si `warnings` dice que el sitio se renderiza con JS, hay pocos colores/fuentes, o no hay logo con confianza: abre la URL en un navegador si tienes uno disponible (Claude in Chrome o el navegador integrado: carga antes su skill) y ejecuta `references/computed-styles.js` para obtener estilos computados reales, logo y fuentes cargadas.
- Si no hay navegador, usa el agente `web-fetch` para leer la página y extraer texto/estructura.
- Opcional: analiza 1–2 páginas internas clave (p. ej. /about, /pricing) si la home da poca información de marca o de tono.
- Si el sitio no responde o bloquea, díselo al usuario; **no inventes** valores observados.

### 3. Curar (aquí está el criterio experto)
**Logo** (revisa los archivos, no solo el JSON)
- **Mira** cada logo descargado: los PNG, JPG y WebP con la herramienta Read (muestra la imagen); en los SVG revisa `aria-label`, `<title>` y el texto. Confirma que `logo-primary` es el de la marca y no el de un cliente o partner, una variante de otro país o una foto.
- Si el mejor logo quedó como `logo-alt-N`, intercambia los nombres con `mv` para que el principal sea `logo-primary.<ext>`. Si un archivo sigue la pista de nombre (blanco, isotipo), renómbralo en consecuencia.
- **Borra** de la carpeta de entrega los candidatos descartados, como logos de clientes o fotos. Son archivos que acabas de crear tú en este mismo proceso; no toques ningún otro.
- En el HTML, el logo sobre fondo oscuro usa `logo-white.*` si existe. Si no existe, usa el mismo archivo con la clase `to-white` (`filter: brightness(0) invert(1)`).

**Color**
- Descarta ruido: colores de librerías de terceros (cookies, chat, embeds), colores con 1–2 apariciones y casi duplicados (agrupa los que difieren < ~3% en luminosidad y tono).
- **Primario** = el más usado en CTAs (`usadoEnCTA`), links y `theme-color`, nunca solo por frecuencia (blanco y negro siempre ganan en frecuencia). Las variables con nombres como `--primary`, `--brand`, `--accent` son pistas fuertes.
- Clasifica: primarios (1–2), secundarios/acento, neutros (escala de oscuro a claro), semánticos (éxito/error/aviso/info) solo si existen.
- Dale a cada color un nombre descriptivo (p. ej. "Azul Medianoche") y un uso concreto.
- Contraste WCAG 2.2: AA texto normal ≥ 4.5, AA texto grande ≥ 3, AAA ≥ 7. Reporta las combinaciones reales texto/fondo del sitio y señala las que fallan.

**Tipografía**
- Identifica familias por rol (display, texto, mono) desde `familias`, `fontFace` y `porElemento`. Indica el origen (Google Fonts, Adobe Fonts, propietaria/self-hosted) y los pesos realmente usados.
- Construye la **escala tipográfica** con los valores de `porElemento` y `responsive` (h1…h6, body, small, button), complementados con `tamanos`. Convierte rem→px (base 16) y muestra ambos. Si los valores usan `clamp()`, muéstralo tal cual y explica el rango.
- Si la fuente es propietaria y no hay URL pública, indícalo y renderiza los specimens con el fallback del stack original.

**Espaciado, layout y UI**: deduce la base del sistema (4/8 px) a partir de `espaciado`; normaliza breakpoints; elige los radios y sombras representativos (3–5 de cada uno), no todos.

**Esencia y tono de voz**: deduce propósito, audiencia, propuesta de valor y 3–5 rasgos de personalidad a partir del copy real y de las decisiones visuales. Cita copy literal del sitio como ejemplo. Posiciona la voz en 4 ejes (formal↔cercano, serio↔divertido, técnico↔sencillo, sobrio↔entusiasta) y da pautas de "Decimos / Evitamos".

### 4. Construir el HTML
- Parte de `assets/template.html` (léelo completo) y respeta su estructura de 10 secciones y su sistema visual. Sustituye cada `{{…}}` con datos reales y duplica los bloques `<!-- REPETIR -->`.
- **Elimina** las secciones, filas o tarjetas sin datos. Nunca dejes placeholders, "N/A" o "Lorem ipsum" en el resultado.
- Carga las fuentes de la marca (link de Google Fonts/Bunny si existe) para que los specimens se vean con la tipografía real.
- Escapa correctamente el texto extraído (`&`, `<`, `>`) al insertarlo.
- **Assets solo por ruta relativa:** `<img src="./logo-primary.svg">`, `<link rel="icon" href="./favicon.svg">`. Nunca uses URLs del sitio original, data URIs ni SVG pegado dentro del HTML para los logos. Usa la extensión real del archivo entregado (`logo-primary.webp` si es WebP).
- La tabla "Archivos del logo e iconos" de la sección 2 lista cada archivo entregado con su vista previa, su nombre (enlace de descarga), su uso y su formato.
- Si falta un asset (no se pudo descargar), elimina el bloque que lo mostraría y lístalo en "Assets no disponibles" de la sección 10, con su URL original.
- Incluye en la sección 9 los tokens curados en CSS custom properties y en JSON.
- Marca con `<span class="tag obs">observado</span>` / `<span class="tag inf">recomendación</span>` donde ayude a distinguir el origen.

### 5. Guardar, verificar y entregar
- Guarda el HTML como `brand-guidelines/<dominio>/<dominio>-brand-guideline.html`, en la misma carpeta que los assets, dentro del directorio de trabajo o donde indique el usuario. El JSON en bruto se queda en el scratchpad.
- Ejecuta la verificación:
  ```bash
  node "<dir-del-skill>/scripts/verify-output.mjs" "brand-guidelines/<dominio>/<dominio>-brand-guideline.html" "<scratchpad>/brand-data.json"
  ```
  Comprueba que cada ruta relativa del HTML existe, que cada imagen es válida por su firma, que no quedan `{{…}}`, que no hay imágenes enlazadas a URLs externas y qué archivos no se referencian. Si sale con error (código 3), corrige y vuelve a ejecutar hasta que diga "Todo correcto". Los archivos no referenciados se aceptan solo si el HTML los lista en la tabla de archivos; si no, bórralos o agrégalos a la tabla.
- **Respuesta final al usuario**, en este orden:
  1. **Archivos entregados:** lista completa (HTML + cada asset) con la ruta de la carpeta, el nombre, el uso y el tamaño. Debe salir de la salida de `verify-output.mjs`, no de memoria.
  2. **Assets no descargados:** cada uno con su rol, el motivo y la **URL original**. Indica si también falló el reintento con WebFetch. Si no hubo fallos, dilo en una línea.
  3. **Resumen de marca** en 4–6 líneas: colores primarios, tipografías, hallazgos clave y problemas de contraste.
  4. **Limitaciones** del análisis.
- Ofrece en una línea publicarlo como página para compartir, sin publicarlo por iniciativa propia: el documento reproduce la identidad de una marca real.

## Checklist antes de entregar
- [ ] ¿`logo-primary.*` es el logo de la marca (lo miraste) y no el de un cliente o partner, una variante de otro país o una foto?
- [ ] ¿Todos los assets se referencian con rutas relativas (`./…`) y `verify-output.mjs` termina en "Todo correcto"?
- [ ] ¿Reintentaste con WebFetch cada asset fallido y reportaste los que siguen faltando con su URL original?
- [ ] ¿El color primario se eligió por uso en CTA/links/variables y no solo por frecuencia?
- [ ] ¿Cada color tiene HEX, RGB, HSL, nombre, uso y contraste?
- [ ] ¿La escala tipográfica tiene size, weight, line-height y letter-spacing reales para cada nivel?
- [ ] ¿Los specimens se renderizan con la fuente real o con su fallback declarado?
- [ ] ¿Está claro qué es observado y qué es recomendación?
- [ ] ¿No quedan placeholders ni secciones vacías?
- [ ] ¿La carpeta funciona sola (HTML + assets juntos, CSS inline) y se ve bien en móvil e impresión?
