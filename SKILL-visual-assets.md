---
name: visual-assets
description: Genera assets visuales listos para usar (PNG, JPG, WebP, SVG) diseñándolos en HTML/CSS/SVG y renderizándolos con un navegador headless, y usa la API de Gemini cuando hacen falta ilustraciones, fotos, texturas, fondos o iconos ilustrados. Infiere qué assets se necesitan, sus medidas, formato y técnica a partir del pedido y del proyecto (landing, brief, brand guideline). Usar siempre que el usuario pida imágenes, banners, heroes, fondos, iconos, ilustraciones, favicons, imágenes Open Graph, posts, stories, carruseles o portadas para redes, miniaturas de YouTube, cabeceras de email, anuncios display, mockups o "las imágenes que faltan" de una web, aunque no diga "asset" ni el formato.
---

# Generación de assets visuales

Actúas como **director/a de arte y diseñador/a de producción**: decides qué piezas hacen falta, con qué medidas y técnica, las produces con calidad de entrega y verificas cada archivo antes de darlo por bueno.

Dos técnicas que se combinan:
- **HTML/CSS/SVG → imagen** (`scripts/render.mjs`): todo lo que lleva texto, layout, formas geométricas, iconos de línea, gradientes, patrones, logos y piezas de un set que deben ser idénticas en estilo. Es exacto al píxel, editable y reproducible.
- **Gemini** (`scripts/gemini-image.mjs`): lo que el código no dibuja bien: fotografía, ilustración con personajes o escenas, texturas orgánicas, estilo 3D/clay, pintura. Su debilidad es el texto, los logos y las medidas exactas, así que el texto y el encuadre final se ponen en HTML encima (**Mixto**).

Todos los scripts son Node 22+ sin dependencias y usan Chrome o Edge instalado (o `CHROME_PATH`). `<skill>` = la carpeta de esta skill.

## 1. Inferir qué hace falta

Antes de dibujar, arma un **plan de assets**. Fuentes, en orden:
1. **El pedido**: plataforma, uso, cantidad, tono. "Un post para el lanzamiento" ya implica Instagram vertical 1080×1350 JPG.
2. **El proyecto** (busca rápido con Glob/Grep, sin leerlo todo):
   - Una landing o web (`index.html`, `*.css`, componentes): sus `<img>` rotas o con placeholder, `background-image` vacíos y huecos de diseño son los assets que faltan; el CSS dice la proporción (`aspect-ratio`, alturas, `object-fit`).
   - Un brand guideline (`brand-guidelines/**`), tokens CSS (`:root { --… }`), `tailwind.config`: paleta, tipografías, radios.
   - Un brief o buyer personas (`brief*.json`, `buyer-personas*.md`): público, tono, mensajes, sector.
3. **El catálogo** `references/asset-specs.md`: medidas, formato, zonas seguras y técnica por tipo de asset, más una tabla de señales → inferencia. Léelo cuando el asset no sea trivial.

El plan es una tabla corta: archivo · uso · medida final · formato · técnica · notas. Si el pedido es claro, muéstralo y sigue. **Pregunta solo** si una decisión cambia mucho el resultado y no se deduce (p. ej. no hay ninguna pista de marca ni de estilo y el usuario quiere algo muy de marca); en lo demás elige un default razonable y dilo.

Reglas de formato que más importan (detalle en el catálogo):
- PNG si hay transparencia, texto, colores planos o bordes nítidos.
- JPG (82–90) para fotos, ilustraciones densas y fondos a sangre sin transparencia.
- Iconos y logos: SVG fuente + PNG transparente.
- No regeneres ni "redibujes" un logo existente: úsalo tal cual (`<img src>` del archivo real).

## 2. Identidad visual

Fija los tokens antes de diseñar: colores (HEX con rol), fuentes (Google Fonts o `@font-face` local), radio, estilo de iconos, tono de imagen. Si el proyecto los tiene, úsalos exactamente. Si no, propón una paleta breve coherente con el sector y el público y dilo en el plan. La coherencia entre piezas importa más que el lucimiento de una sola.

## 3. Producir

Estructura de entrega (dentro del proyecto, o donde pida el usuario):
```
assets/<proyecto-o-campaña>/
├── og-image-1200x630.jpg
├── ig-post-lanzamiento-1080x1350.jpg
├── icons/icon-seguridad.svg · icon-seguridad.png …
└── _source/
    ├── assets.html          ← mesa de trabajo, re-renderizable
    └── gemini/              ← imágenes crudas de Gemini + prompts.md
```
Nombres en kebab-case descriptivos por uso; incluye `-WxH` cuando la medida es parte de la especificación (el verificador lo comprueba).

### 3a. HTML/CSS → imagen
1. Copia `assets/workbench.html` a `_source/assets.html` y léelo: muestra el patrón. Cada pieza es un elemento con `data-asset="nombre"` y su tamaño CSS exacto; todas en una sola página para que compartan tokens.
2. Diseña con calidad de producción: jerarquía tipográfica clara, márgenes de seguridad, contraste legible (texto sobre imagen → scrim o degradado), alineaciones a una rejilla. Iconos SVG en rejilla 24×24 con el mismo grosor de trazo en todo el set.
3. Renderiza:
   ```bash
   node "<skill>/scripts/render.mjs" "assets/<p>/_source/assets.html" --out-dir "assets/<p>"
   ```
   - `data-format="jpg|png|webp"` (por defecto PNG), `data-quality`, `data-bg`.
   - **Escala**: medida final = tamaño CSS × `data-scale`. Para piezas con medida fija (redes, OG, anuncios) diseña al tamaño final con escala 1. Usa `data-scale="2"`/`"3"` para iconos e imágenes de UI que la web mostrará a la mitad o tercio.
   - PNG sale con fondo transparente salvo que el elemento tenga fondo propio; el gris de la mesa de trabajo no se exporta.
   - `--only nombre1,nombre2` re-renderiza solo esas piezas.
   - Para un solo archivo sin mesa: `render.mjs pieza.html --out x.png --width W --height H [--transparent]`.
   - Las imágenes locales del HTML deben cargarse por ruta relativa al HTML; el script avisa de las que no cargan.

### 3b. Gemini
1. La key se lee de `GEMINI_API_KEY` en un `.env` (directorio actual o sus padres, la carpeta de la skill o la carpeta `.claude/skills/` compartida). Comprueba una vez por sesión: `node "<skill>/scripts/gemini-image.mjs" --check`. Si falta, dile al usuario que cree `.env` con `GEMINI_API_KEY=…` en la raíz del proyecto, y mientras tanto resuelve con HTML/SVG lo que se pueda. **Nunca** muestres, copies ni registres el valor de la key.
2. Lee `references/gemini-prompting.md` la primera vez: estructura del prompt, fondos para recortar, consistencia de sets.
3. Genera:
   ```bash
   node "<skill>/scripts/gemini-image.mjs" --prompt-file "assets/<p>/_source/gemini/hero.txt" --out "assets/<p>/_source/gemini/hero.png" --aspect 16:9 --size 2K
   ```
   `--ref a.png,b.jpg` para referencias de estilo o edición; `--n 3` para variantes (cuesta más, úsalo solo si el usuario quiere elegir); `--model` o `GEMINI_IMAGE_MODEL` para otro modelo (`--list-models` muestra los disponibles). Guarda cada prompt usado en `_source/gemini/prompts.md`.
   - Por defecto prueba, en orden, `gemini-3-pro-image` → `gemini-3-pro-image-preview` → `gemini-3.1-flash-image` → `gemini-2.5-flash-image`. Para borradores, iconos o muchas variantes, `--model gemini-3.1-flash-image` es más rápido y barato.
   - Si termina con **"sin cuota en este plan"**, la cuenta de Google no tiene facturación activa y el nivel gratuito no incluye generación de imágenes. No reintentes: díselo al usuario una vez y resuelve con HTML/CSS/SVG (gradientes, formas, patrones, iconos vectoriales) dejando en el plan qué piezas mejorarían con Gemini cuando active la facturación.
4. **Mira** cada imagen generada (Read) antes de usarla: anatomía, artefactos, texto espurio, fidelidad a la paleta. Si falla, ajusta el prompt y regenera; no entregues una imagen defectuosa.
5. Lleva la imagen a su medida final: o la compones en la mesa HTML (`<img>` con `object-fit: cover` + texto/logo en HTML, **Mixto**), o la ajustas con `image-tools.mjs resize --fit cover`.

### 3c. Post-proceso (`scripts/image-tools.mjs`)
- `remove-bg <in> <out.png> [--color auto|#hex] [--tolerance 32] [--soft 24]` — quita fondos lisos rellenando desde los bordes (respeta blancos interiores). Para ilustraciones e iconos de Gemini generados sobre fondo liso.
- `trim <in> <out.png> [--padding 16]` — recorta márgenes transparentes.
- `resize <in> <out> --width W [--height H] [--fit cover|contain|fill] [--bg #hex]`.
- `convert <in> <out.jpg|png|webp> [--quality 88] [--bg #fff]`.
- `icons <master-512.png> <dir> [--name favicon]` — favicon 16/32/48, `.ico`, apple-touch 180 (fondo opaco), 192 y 512.

Tras un `remove-bg`, revisa el borde: `resize recorte.png _check.jpg --width 600 --bg "#ff00ff"` y míralo. Si hay halo, sube `--tolerance` o regenera con fondo más limpio; borra el `_check` después.

## 4. Verificar y entregar

1. Ejecuta el verificador sobre la carpeta de entrega:
   ```bash
   node "<skill>/scripts/check-assets.mjs" "assets/<p>"
   ```
   Comprueba firma real vs extensión, medidas contra el `-WxH` del nombre y transparencia/peso si pasas `--expect`. Corrige hasta "Todo correcto".
2. **Mira cada asset final** con Read (no solo el log): texto cortado, elementos fuera de la zona segura, fuentes que no cargaron (fallback del sistema), contraste insuficiente, bordes con halo. Una pieza que pasa el verificador puede seguir estando mal diseñada.
3. Respuesta al usuario:
   - Tabla de archivos entregados (ruta, uso, medida, formato, peso), sacada de la salida del verificador.
   - Qué técnica se usó en cada uno y, si hubo Gemini, cuántas llamadas.
   - Supuestos que tomaste (plataforma, paleta, tono) para que pueda corregirlos.
   - Cómo editar: cambiar `_source/assets.html` y re-ejecutar `render.mjs`.

## Checklist
- [ ] ¿El plan cubre lo que pidió (y lo que la landing/brief implica) con medidas y formato correctos para cada destino?
- [ ] ¿Colores y fuentes salen de la marca del proyecto, o de una paleta propuesta y comunicada?
- [ ] ¿El texto está en HTML, no horneado por Gemini? ¿El logo es el archivo real?
- [ ] ¿Los PNG que deben ser transparentes lo son, y los JPG no esconden fondos negros o blancos inesperados?
- [ ] ¿`check-assets.mjs` dice "Todo correcto" y miraste cada imagen final?
- [ ] ¿La key de Gemini no aparece en ningún archivo, log ni respuesta?
