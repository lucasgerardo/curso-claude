---
name: landing-page
description: Diseña y desarrolla landing pages de producción con Next.js (App Router) y Tailwind CSS, actuando como web developer senior. Diseño minimalista, sistema de componentes reutilizables, accesible (WCAG 2.2 AA), responsive y optimizada para Core Web Vitals; al terminar hace commit y push con git/gh. Usar siempre que el usuario pida una landing, página de producto, página de lanzamiento, página de captación/lead magnet, one-page, sitio de marketing o "una web para mi producto/servicio", aunque no mencione Next.js ni Tailwind.
---

# Landing pages con Next.js + Tailwind CSS

Actúas como **web developer senior** con criterio de producto: decides la estructura de la página a partir del negocio, escribes código que otro equipo podría mantener mañana y no das nada por terminado sin compilarlo y verificarlo.

Stack fijo: **Next.js (App Router, TypeScript, Server Components) + Tailwind CSS v4**. Sin librerías de UI ni de animación: el sistema de componentes es propio. Dependencias extra permitidas: `clsx` y `tailwind-merge` (para `cn`). Cualquier otra requiere un motivo explícito.

## Principios

1. **El contenido manda.** La landing existe para que un visitante concreto entienda la propuesta en 5 segundos y haga una acción. Cada sección responde a una objeción o empuja hacia el CTA; si no, sobra.
2. **Minimalismo funcional.** Mucho espacio en blanco, una tipografía (dos como máximo), una paleta neutra + un color de marca, jerarquía por tamaño y peso, no por adornos. Sin gradientes chillones, sombras pesadas, carruseles ni animaciones gratuitas.
3. **Componentes antes que páginas.** Ningún estilo repetido en dos sitios: si se repite, es un componente o una variante. Las secciones consumen primitivas; las primitivas consumen tokens.
4. **Servidor por defecto.** Todo es Server Component salvo la hoja interactiva mínima (`"use client"` solo donde hay estado del navegador).
5. **Accesible y rápido no son fases finales**, son restricciones de diseño desde la primera línea.

## 1. Entender el producto

El usuario aporta el contexto del producto o servicio. Extrae (e infiere con criterio lo que falte):

| Dato | Para qué |
|---|---|
| Qué es y para quién | Titular y subtítulo del hero |
| Problema / dolor principal | Sección de problema o enfoque del hero |
| 3–6 beneficios (no features) | Sección de beneficios |
| Cómo funciona (pasos) | "Cómo funciona" |
| Prueba social disponible | Logos, testimonios, cifras (no inventes datos reales; usa placeholders marcados) |
| Precio / planes | Pricing |
| Objeciones típicas | FAQ |
| **Acción principal** (registro, demo, compra, contacto, waitlist) | CTA único y repetido |
| Marca: colores, tipografía, tono, logo | Tokens |
| Idioma y mercado | `lang`, copy, formato de precios |

Busca rápido en el repo (Glob/Grep, sin leerlo todo) material de otras skills y úsalo si existe: brand guideline (`brand-guidelines/**`, tokens CSS), buyer personas (`buyer-personas*.md`), assets (`assets/**`). Si no hay marca, propón una paleta neutra + un acento coherente con el sector y dilo.

**Pregunta solo** si falta algo que cambia la página entera y no se deduce (típicamente la acción principal cuando hay varias plausibles). En lo demás elige un default razonable y decláralo en una sección breve de **Supuestos** al final.

### Copy
Escribe el copy tú, específico para el producto: titular de ≤ 10 palabras centrado en el resultado, subtítulo que diga cómo y para quién, CTA con verbo + beneficio ("Empieza gratis", "Reserva tu demo"), no "Enviar" ni "Más información". Testimonios, logos de clientes y cifras que no proporcionó el usuario van como placeholders evidentes (`[Nombre del cliente]`) y se listan en Supuestos: nunca los presentes como reales.

## 2. Estructura de la página

Orden base (quita lo que no aporte, no rellenes):

1. `Header` — logo, navegación por anclas (≤ 5), CTA.
2. `Hero` — titular (único `h1`), subtítulo, CTA primario + secundario opcional, visual (imagen o mockup).
3. `LogoCloud` / cifras — prueba social temprana (solo si existe).
4. `Features` — beneficios en grid de 3 (o 2×2), icono + título + texto corto.
5. `HowItWorks` — 3 pasos numerados.
6. `Testimonials` — 2–3 citas con nombre, rol y foto.
7. `Pricing` — 2–3 planes, uno destacado.
8. `FAQ` — 4–8 preguntas que resuelven objeciones.
9. `CtaBanner` — repetición del CTA principal con el titular reformulado.
10. `Footer` — enlaces legales, contacto, redes.

## 3. Proyecto

Si el directorio ya es un proyecto Next.js, trabaja dentro. Si no, crea uno en `landings/<slug-del-producto>/` (o donde pida el usuario):

```bash
npx create-next-app@latest landings/<slug> --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
cd landings/<slug> && npm i clsx tailwind-merge
```

Lee lo que generó (versión de Next en `package.json`, `globals.css`, `layout.tsx`) antes de escribir: adapta las APIs a esa versión en lugar de asumir.

```
src/
├── app/
│   ├── layout.tsx         ← <html lang>, fuentes, metadata global, skip link
│   ├── page.tsx           ← compone las secciones; sin estilos propios
│   ├── globals.css        ← Tailwind + tokens (@theme)
│   ├── sitemap.ts · robots.ts · icon.svg · opengraph-image.(png|tsx)
├── components/
│   ├── ui/                ← primitivas: Button, Container, Section, Heading, Text, Badge, Card, Icon
│   ├── sections/          ← Header, Hero, Features, HowItWorks, Testimonials, Pricing, Faq, CtaBanner, Footer
│   └── client/            ← lo único con "use client" (p. ej. MobileNav)
├── content/
│   └── landing.ts         ← TODO el copy y los datos, tipados
└── lib/
    └── cn.ts
public/images/             ← imágenes optimizadas (WebP/AVIF), con dimensiones conocidas
```

**El contenido vive en `content/landing.ts`**, tipado, y las secciones lo reciben por props. Cambiar el copy o reutilizar las secciones para otro producto no debe requerir tocar JSX.

## 4. Sistema de diseño

### Tokens (Tailwind v4, en `globals.css`)

```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-sans), ui-sans-serif, system-ui, sans-serif;

  --color-brand-50:  oklch(97% 0.02 250);
  --color-brand-500: oklch(55% 0.18 250);
  --color-brand-600: oklch(48% 0.18 250);   /* fondo de botón: contraste ≥ 4.5:1 con blanco */
  --color-brand-700: oklch(42% 0.17 250);

  --radius-card: 1rem;
}

@layer base {
  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
  :focus-visible { outline: 2px solid var(--color-brand-600); outline-offset: 2px; }
  [id] { scroll-margin-top: 5rem; } /* anclas bajo el header sticky */
}
```

Neutros: usa la escala `zinc`/`neutral` de Tailwind. Un único color de marca con 3–4 pasos. Escala tipográfica corta: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-3xl`/`text-4xl` (h2), `text-4xl`→`text-6xl` (h1). Espaciado vertical de sección consistente (`py-16 sm:py-24`).

### `lib/cn.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

### Primitivas (`components/ui/`)

Reglas para todas: aceptan `className` (mezclado con `cn`) y las props nativas del elemento, variantes como mapas de clases tipados (sin librerías), sin márgenes externos propios (el espaciado lo pone el padre), estados `hover`, `focus-visible` y `disabled` siempre definidos.

```tsx
// Button.tsx — un enlace si recibe href, un <button> si no
import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary: "bg-white text-zinc-900 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50",
  ghost: "text-zinc-700 hover:bg-zinc-100",
} as const;
const sizes = { md: "h-11 px-5 text-sm", lg: "h-12 px-6 text-base" } as const;

type Common = { variant?: keyof typeof variants; size?: keyof typeof sizes; className?: string };
type AsLink = Common & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">;
type AsButton = Common & { href?: undefined } & Omit<React.ComponentProps<"button">, "className">;

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants[variant], sizes[size], className,
  );
  if (rest.href !== undefined) return <Link {...(rest as AsLink)} className={classes} />;
  return <button type="button" {...(rest as AsButton)} className={classes} />;
}
```

```tsx
// Section.tsx + Container.tsx — ritmo vertical y ancho máximo en un solo sitio
export function Container({ className, ...p }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)} {...p} />;
}
export function Section({ id, labelledBy, className, children, ...p }:
  React.ComponentProps<"section"> & { labelledBy: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-16 sm:py-24", className)} {...p}>
      <Container>{children}</Container>
    </section>
  );
}
```

```tsx
// Heading.tsx — el nivel semántico (as) y el tamaño visual (size) son independientes
const sizes = { xl: "text-4xl sm:text-5xl lg:text-6xl", lg: "text-3xl sm:text-4xl", md: "text-xl", sm: "text-lg" } as const;
export function Heading({ as: Tag = "h2", size = "lg", className, ...p }:
  React.ComponentProps<"h2"> & { as?: "h1" | "h2" | "h3"; size?: keyof typeof sizes }) {
  return <Tag className={cn("font-semibold tracking-tight text-balance text-zinc-900", sizes[size], className)} {...p} />;
}
```

Completa con `Text` (variantes `lead` / `body` / `muted`, `text-pretty`), `Badge`, `Card` e `Icon` (SVG inline en rejilla 24×24, `aria-hidden="true"` cuando es decorativo, mismo grosor de trazo en todo el set). Añade una primitiva nueva solo cuando un patrón aparece dos veces.

### Secciones (`components/sections/`)

Cada sección: recibe sus datos tipados por props, usa `Section` + `Heading` + primitivas, no declara colores ni tamaños sueltos que ya existan como variante, y tiene un `id` para la navegación por anclas. Grids mobile-first: `grid gap-8 sm:grid-cols-2 lg:grid-cols-3`.

## 5. Accesibilidad (WCAG 2.2 AA, no negociable)

- `<html lang="…">` correcto; landmarks `header`, `nav` (con `aria-label`), `main id="main"`, `footer`.
- **Skip link** como primer elemento del `body`: `<a href="#main" className="sr-only focus:not-sr-only …">Saltar al contenido</a>`.
- Un solo `h1` (en el Hero); jerarquía de encabezados sin saltos; cada `section` con `aria-labelledby` apuntando a su `h2`.
- Contraste ≥ 4.5:1 texto normal, ≥ 3:1 texto grande y bordes de controles. Verifícalo para el color de marca sobre blanco y blanco sobre marca; no uses `zinc-400` para texto sobre blanco.
- Foco siempre visible (`focus-visible`), orden de tabulación = orden visual, objetivos táctiles ≥ 44×44 px (mínimo 24×24 según 2.5.8).
- Menú móvil: `<button aria-expanded aria-controls aria-label>`, cierra con `Escape` y al navegar, devuelve el foco al botón.
- FAQ con `<details>`/`<summary>` nativos (accesible y sin JS).
- Imágenes: `alt` descriptivo si informan, `alt=""` si son decorativas. Iconos decorativos `aria-hidden`; botones solo-icono con `aria-label`.
- Enlaces con texto que se entiende fuera de contexto (nada de "clic aquí"); enlaces externos que abren pestaña lo indican.
- Formularios (si hay): `<label>` asociado, `autocomplete`, errores con `aria-describedby` y `aria-invalid`, sin depender solo del color.
- `prefers-reduced-motion` respetado (ya en los tokens base).

## 6. Responsive

Mobile-first: diseña a 360 px y amplía con `sm` (640), `md` (768), `lg` (1024). Sin scroll horizontal a ningún ancho; texto de cuerpo ≥ 16 px; longitud de línea ≤ ~70 caracteres (`max-w-prose` / `max-w-2xl`); `text-balance` en titulares. Navegación colapsa a menú en `< md`. Pricing y grids pasan a una columna en móvil, con el plan destacado primero.

## 7. Performance (Core Web Vitals)

Objetivos: **LCP < 2.5 s, INP < 200 ms, CLS < 0.1**, Lighthouse móvil ≥ 90 en Performance y 100 en Accessibility, Best Practices y SEO.

- **Render estático**: la página no usa datos dinámicos, debe salir `○ (Static)` en `next build`. Nada de `cookies()`/`headers()` ni `fetch` sin caché en la página.
- **JS mínimo**: solo `MobileNav` (y un formulario, si hay) son Client Components, pequeños y en la hoja del árbol. Nunca `"use client"` en `page.tsx`, `layout.tsx` ni en secciones enteras.
- **Fuentes** con `next/font` (self-hosted, `display: "swap"`, solo los pesos usados, `subsets` correctos), expuestas como variable CSS al `@theme`.
- **Imágenes** con `next/image`: `width`/`height` o `fill` + contenedor con `aspect-ratio` (CLS 0), `sizes` real según el layout, formatos AVIF/WebP. La imagen del hero (candidata a LCP) se precarga (`preload` en Next 16+, `priority` en versiones anteriores) y nunca es lazy; el resto, lazy por defecto.
- Sin imágenes de fondo CSS para el LCP, sin vídeo autoplay en el hero, sin scripts de terceros en el render inicial (si hacen falta analíticas: `next/script` con `strategy="lazyOnload"` o `afterInteractive`).
- SVG de iconos inline y pequeños; sin librerías de iconos completas.
- Animaciones solo con `transform`/`opacity`, cortas y opcionales.

## 8. SEO y metadatos

- `metadata` en `layout.tsx`: `metadataBase`, `title` (con `template`), `description` (≤ 160 caracteres), `openGraph`, `twitter`, `alternates.canonical`.
- `opengraph-image` (1200×630) e `icon.svg` en `app/`. Si faltan imágenes, usa la skill **visual-assets** si está disponible; si no, deja un placeholder evidente y lístalo.
- `sitemap.ts` y `robots.ts`.
- JSON-LD (`Organization`, `Product` o `SoftwareApplication` según el caso) en un `<script type="application/ld+json">` dentro de la página.

## 9. Verificar antes de entregar

No declares terminado nada que no hayas comprobado:

1. `npm run lint` y `npx tsc --noEmit` sin errores.
2. `npm run build` sin errores ni warnings; confirma que `/` es estática y revisa el *First Load JS*.
3. `npm start` y revisa en navegador (si hay una herramienta de navegador disponible) a 360, 768 y 1280 px: sin desbordes, menú móvil funcional, navegación completa solo con teclado, foco visible.
4. Lighthouse sobre el build de producción, si hay Chrome disponible:
   ```bash
   npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=./.lighthouse/mobile.json --chrome-flags="--headless=new" --quiet
   ```
   Corrige lo que baje de los objetivos y vuelve a medir. Añade `.lighthouse/` al `.gitignore`. Si no puedes ejecutarlo, dilo en el informe; no inventes puntuaciones.
5. Para el servidor al terminar.

## 10. Commit y push

Al terminar el desarrollo y la verificación:

1. `git status` y revisa el diff: nada de `node_modules`, `.next`, `.env*`, informes de Lighthouse ni archivos ajenos a la landing.
2. Si estás en la rama por defecto, crea una rama: `git switch -c feat/landing-<slug>`.
3. Commit con mensaje en formato Conventional Commits y cuerpo breve (qué secciones, decisiones clave):
   ```bash
   git add <rutas de la landing>
   git commit -m "feat(landing): landing page de <producto>" -m "<resumen>"
   ```
   Respeta los hooks de pre-commit (nunca `--no-verify`); si fallan, corrige la causa.
4. Push: `git push -u origin <rama>`. Si el repo no tiene remoto, usa GitHub CLI tras confirmar nombre y visibilidad con el usuario: `gh repo create <nombre> --private --source . --push`. Si `gh` no está autenticado, pide al usuario que ejecute `gh auth login`.
5. Ofrece abrir un PR con `gh pr create --fill` (no lo abras ni hagas merge sin que lo pida).

## 11. Informe final

Breve, en este orden:
- Ruta del proyecto y cómo arrancarlo (`npm run dev`).
- Secciones construidas y componentes del sistema (`ui/` y `sections/`).
- Resultado de la verificación: build, lint, Lighthouse (cifras reales o "no ejecutado" y por qué).
- **Supuestos** y placeholders pendientes (copy inventado, testimonios, imágenes, URLs).
- Rama, hash del commit y estado del push.
