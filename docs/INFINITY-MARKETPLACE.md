# INFINITY Marketplace — contrato de integración

## Objetivo

Marketplace es el punto de venta transversal de INFINITY. Debe permanecer visible en la navegación principal para todo usuario autenticado que tenga la capacidad `marketplace:view`.

Orden recomendado de navegación:

1. Inicio / Command Center.
2. Marketplace.
3. Negocios / verticales.
4. CRM.
5. Marketing.
6. Automatizaciones.
7. Herramientas.

El componente de este repositorio **no sustituye al host productivo**. Solo ofrece una presentación segura e integrable. El anfitrión sigue siendo responsable de sesión, autorización, rutas, datos y acciones.

## Archivos

- `marketplace-shell.js`: render y descriptor de navegación.
- `marketplace-shell.css`: estilos aislados.
- `marketplace-manifest.json`: contrato declarativo.

## Contrato del host

`InfinityMarketplace.render` recibe:

| Campo | Uso |
|---|---|
| `catalog` | Lista ya autorizada y filtrada por el host. |
| `navigate` | Navegación interna del host. |
| `openItem` | Abre una ficha por identificador. |
| `money` | Formatea importes en unidades menores. |
| `canAccess` | Comprueba capacidades del usuario. |
| `selectedCategory` | Filtro de categoría actual. |
| `metrics` | Conteos opcionales del catálogo. |

No contiene endpoints ni realiza llamadas de red.

## Privacidad

El Marketplace nunca debe consultar directamente contactos privados, historiales clínicos, conversaciones, pagos ni archivos personales. El host debe entregar únicamente datos publicables o datos que el usuario tenga autorización para ver.

La existencia de una ficha tampoco significa:

- disponibilidad confirmada;
- precio vigente;
- reserva confirmada;
- pago validado;
- comisión ganada.

Esos estados proceden de la herramienta o responsable correspondiente.

## Categorías iniciales

- Turismo.
- Inmobiliaria.
- Grill & Outdoor.
- Dental.
- Eventos.
- Profesionales.

## Ficha inmobiliaria

Una propiedad puede mostrar datos comerciales derivados que hayan sido aprobados, mientras el archivo fuente y los contactos privados permanezcan aislados. El modelo debe soportar geometría y activos 2D/3D mediante identificadores de recursos, sin incrustar información privada en el repositorio público.

## Próximo paso productivo

El host real de INFINITY debe:

1. registrar la ruta `marketplace`;
2. inyectar `NAV_ITEM` después de Inicio;
3. aplicar `marketplace:view`;
4. servir catálogo desde la fuente de verdad;
5. registrar atribución, lead, oportunidad y cierre al abrir o convertir una ficha;
6. probar desktop, móvil, cambio de tenant y cierre de sesión.
