# curso-claude

Landing page de **RM (ayudas económicas)**, hecha con Next.js y Tailwind CSS, y las skills del curso (`SKILL-*.md`).

## Landing

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
```

- Copy y datos: `src/content/landing.ts` (los valores marcados con `PLACEHOLDER` deben reemplazarse antes de publicar).
- Componentes: `src/components/ui/` (primitivas) y `src/components/sections/` (secciones).
- Páginas legales: `/terminos` y `/privacidad`, se completan en `legalPages` dentro de `src/content/landing.ts`.
- Variable opcional: `NEXT_PUBLIC_SITE_URL` (URL pública del sitio, usada en metadatos, sitemap y robots).
