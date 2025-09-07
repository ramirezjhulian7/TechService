# TechService

Resumen rápido
----------------
Proyecto frontend en Angular que implementa una landing, autenticación básica con usuarios estáticos (JSON), un catálogo de servicios y un panel de administración (CRUD). Se integró Bootstrap para la UI y se añadieron utilidades y componentes para trabajar con datos locales JSON.

Lo que se implementó
---------------------
- Integración de Bootstrap (CSS y JS) y Google Fonts (Lora, Montserrat, Source Sans 3).
- Variables globales SCSS con la paleta de colores del proyecto: #027373, #038C7F, #A9D9D0, #F2E7DC, #0D0D0D.
- Navbar responsiva con logo y navegación. Botón "Ingresar" que cambia a "Servicios" cuando el usuario está autenticado; botón de Logout.
- Landing page (componente `LandingComponent`).
- Login funcional (componente `LoginComponent`) que valida credenciales contra `src/assets/data/users.json`.
- Componente `ServicesComponent`: muestra cards con los servicios leídos desde `public/data/services.json`.
- Detalle de servicio (`ServicesDetailComponent`) con layout en dos columnas (texto + media) al hacer clic en una card.
- `AdminComponent`: interfaz para administración de servicios (CRUD en memoria). Permite agregar/editar/borrar filas y descargar el JSON resultante.
- Guardas y servicios: `UserService` y `AuthService` para validar credenciales y mantener estado de sesión (BehaviorSubject + localStorage persistente).
- Componente `ProximamenteComponent` para funciones pendientes.

Estructura de rutas (árbol)
--------------------------

Las rutas principales implementadas actualmente son:

- `/` → `LandingComponent` (home)
- `/login` → `LoginComponent` (formulario de acceso)
- `/services` → `ServicesComponent` (listado de cards)
- `/services/:id` → `ServicesDetailComponent` (detalle a pantalla completa)
- `/proximamente` → `ProximamenteComponent` (funcionalidad no desarrollada)
- `/admin` → `AdminComponent` (panel de administración) — protegido por `AuthGuard` (redirige a `/login` si no estás autenticado)

Cómo navegar
-------------
- Desde la navbar puedes ir a Home o Servicios. Para entrar a Admin ve a `/admin` (requiere login). Para probar el detalle haz clic en cualquier card en `/services`.

Lista de usuarios (para pruebas)
------------------------------

Los usuarios se encuentran en `src/assets/data/users.json` y son los siguientes:

- jhulian / jh123 (role: admin)
- felipe / felipe123 (role: admin)
- daniel / daniel123 (role: admin)
- profe / profe123 (role: admin)

Instalación y ejecución
-----------------------

Requisitos
- Node.js (>= 18 recomendado)
- npm

Pasos

1. Instala dependencias del proyecto:

```powershell
npm install
```

2. Ejecuta la app Angular en modo desarrollo:

```powershell
npm start
# abre http://localhost:4200
```

Notas sobre el API / persistencia
--------------------------------
- El proyecto está preparado para trabajar con JSON estáticos en `public/data/services.json` (uso actual). El panel de administración realiza los cambios en memoria y ofrece un botón "Descargar JSON" para descargar el array actualizado y reemplazar manualmente el archivo en `public/data/services.json`.
- En versiones anteriores se agregó un servidor Express opcional que permitía persistir automáticamente (endpoints `/api/services` y `/api/upload`). Si quieres que lo restaure e integre para que el Admin pueda escribir en `public/data/services.json` y subir imágenes a `public/service-image`, lo puedo habilitar — requiere ejecutar `npm run start:api` y añadir dependencias (`express`, `multer`, `cors`).

Uso de Angular y Bootstrap
--------------------------
- Framework: Angular 19 (standalone components y Router). El proyecto usa `bootstrap` para estilos y componentes listos (tablas, botones, formularios). Globalmente se mapearon tokens de color a variables CSS para mantener coherencia visual.

Archivos y componentes importantes
---------------------------------
- `src/app/app.component.*` — root, navbar y router outlet.
- `src/app/landing.component.*` — landing page.
- `src/app/login.component.*` — login con validación y accesibilidad.
- `src/app/services.component.*` — listado de servicios (cards).
- `src/app/services-detail.component.*` — detalle de servicio.
- `src/app/admin.component.*` — administración (tabla, formulario, CRUD).
- `src/app/user.service.ts` — carga usuarios desde JSON.
- `src/app/auth.service.ts` — estado de sesión y persistencia en localStorage.
- `public/data/services.json` — datos de servicios (JSON usado por `ServicesComponent`).
- `src/assets/data/users.json` — usuarios de prueba.

Consejos y siguientes pasos sugeridos
-----------------------------------
- Añadir un backend real (Express o Firebase) para persistir cambios desde Admin y gestionar autenticación.
- Implementar guards y roles más estrictos para proteger rutas según `role` del usuario.
- Añadir validaciones y pruebas unitarias para `UserService`, `AuthService` y `AdminComponent`.
- Mejorar UX con confirmaciones, deshacer y optimizaciones de rendimiento para listas grandes.