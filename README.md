# Nextray Prueba Técnica — Frontend

## Cómo levantarlo

```bash
pnpm install
pnpm run dev
```

Necesitas Node >= 22.12 y el backend Laravel funcionando. Por defecto apunta a `http://nextay-prueba-back.test/api`. Si necesitas cambiar la URL, edita en el `.env` la variable `VITE_API_BASE_URL`.

## Decisiones

- **Sin TypeScript**: es un proyecto pequeño, por lo que se ha optado por una instalación por defecto sin typescript.
- **Sin store** (Pinia/Vuex): cada componente maneja su estado solo, no hay nada que compartir.
- **fetch nativo** en vez de Axios: son dos endpoints, no hace falta un wrapper.
- **BigInt** en Fibonacci: F(80) ya se pasa de `Number.MAX_SAFE_INTEGER`, así que devuelvo strings.
- **Proxy de Vite** para no tener que configurar CORS del lado de Laravel.

## Qué dejé sin hacer

- **Paginación**: las tablas muestran todo. Si crece el dataset hay que habilitar el paginador de `q-table`.
- **Tests**: no escribí ninguno. A esta escala la revisión manual bastó.
- **Auth**: la app es pública. Si tuviera login habría que meter navigation guards, algún tipo de sistema de token Bearer o similar.
