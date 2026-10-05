# Componente visual de Carl’s Grill

## Uso

Cargar `carls-command.css` y `carls-command.js` antes de la aplicación anfitriona.

La función `window.InfinityCarlsDashboard.render` devuelve un elemento DOM y recibe:

| Campo | Contenido |
|---|---|
| `tenant` | Negocio previamente autorizado por la aplicación anfitriona. |
| `metrics` | Conteos y cierres registrados; los datos faltantes permanecen explícitos. |
| `leads`, `tasks`, `opportunities` | Objetos con una lista `items` de registros del negocio activo. |
| `navigate` | Función de navegación del anfitrión. |
| `money` | Función que formatea importes en unidades menores y moneda. |

La clase `cg-overview` en `body` activa el tema del resumen. Retirarla al cambiar de vista, negocio o cerrar sesión. La clase no concede permisos.

`isCarlsGrill` identifica el nombre para presentación; **no es un mecanismo de autorización**. La aplicación anfitriona debe validar sesión, membresía y acceso a los datos. El nombre no puede utilizarse como sustituto del control de acceso.

Los valores y títulos variables se insertan con `textContent`. El componente no contiene secretos, no consulta servicios y no modifica registros. El gráfico resume los registros recibidos, no predice ventas ni confirma reservas o pagos.

## Diseño y accesibilidad

Tema grafito con cian y ámbar, jerarquía tipográfica clara, botones de navegación, indicadores de progreso semánticos, foco visible y adaptación móvil. El motivo orbital es decorativo y se excluye del árbol de accesibilidad. Se respeta la preferencia de movimiento reducido.

## Límites

El componente debe integrarse con la aplicación existente; abrir el JavaScript por sí solo no ejecuta INFINITY. No habilita WhatsApp, publicaciones autónomas, pagos ni reservas automáticas. Los ejemplos para pruebas deben usar exclusivamente datos ficticios.

No publicar configuración del anfitrión ni registros privados como parte de este componente.
