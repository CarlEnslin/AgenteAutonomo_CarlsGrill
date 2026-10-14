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


## Experiencias turísticas y evidencias (propuesta de integración, sin despliegue)

Se agregan **seis fichas de muestra independientes**: cuatrimotos, canopy, paseo a caballo de tres vueltas, paseo de 300 m, cabalgata de 2.500 m con entrada al río y equitación de una hora. Están en `integrations/marketplace/examples/` y están marcadas `sample_only: true`. **No son registros del servidor** y sus identificadores de ejemplo no se deben importar. Sus tarifas de muestra reflejan la confirmación expresa del responsable el **14/10/2026**, sin trasladar datos de reservas ni operadores.

El sistema anfitrión conserva el identificador real de cada actividad, los enlaces antiguos, sus variantes y los permisos de negocio. **Primero consultar el catálogo real y cotejar IDs/slugs, después actualizar por ID en vez de agregar nuevas fichas**. No sobrescribir ni volver a importar las actividades que ya existan.

### Imágenes y visualización móvil

`images` es una lista de activos públicos previamente autorizados por el host:

```json
{
  "images": [
    {
      "src": "/media/public/actividad-ejemplo.jpg",
      "mobile_src": "/media/public/actividad-ejemplo-vertical.jpg",
      "alt": "Descripción accesible de la fotografía",
      "approved": true,
      "kind": "photo",
      "orientation": "portrait",
      "fit": "contain"
    }
  ]
}
```

**Las rutas son ilustrativas, no archivos que este repositorio proporcione.** No hay fotografías nuevas subidas o aprobadas en este cambio. El host debe revisar permisos de uso, empresa/tenant, derechos de imagen, y sanitizar las URLs antes de pasar las imágenes. El cliente acepta únicamente HTTPS o rutas absolutas del mismo origen; rechaza protocolos ejecutables y requiere `approved: true`. No hay fetch, subida, ni edición de originales.

- `mobile_src` presenta una versión vertical aprobada en pantallas de hasta 640 px; si no existe, usa el original.
- `orientation` controla la proporción visible: `portrait`, `square`, `landscape` o `wide`.
- `fit: contain` evita recortar carteles con texto; `fit: cover` llena la tarjeta para fotos cuyo recorte fue autorizado.
- Al tocar la imagen se abre un visor accesible. Un cartel horizontal puede desplazarse horizontalmente en móvil para leer detalles.
- Si no hay imagen aprobada, no se muestra un placeholder engañoso.

### Política de precios y reservas

El componente solo presenta `price_minor` cuando **simultáneamente** `status=AVAILABLE` o `status=RESERVATION_ONLY`, `source_status=VERIFIED` y el importe es un entero no negativo. `price_from=true` indica «Desde»; `price_unit` se añade únicamente junto al importe autorizado. La publicación del precio **no confirma reserva ni disponibilidad**. En los demás casos se muestra «Tarifa por confirmar», o «Referencia histórica: confirmar tarifa» para `STALE`. Las notas de operación que sean publicables se pasan como `conditions_public`. Esas etiquetas no prueban cupos ni reserva. El host valida fechas, fuente, unidad, condiciones, disponibilidad y acceso.

### Pasos para quantumrestoai.com

1. Leer el catálogo actual y localizar fichas existentes por IDs y aliases; **no importar estas muestras**. Registrar fuente, fecha, estado y control de versión para cada tarifa.
2. Verificar con el responsable si las referencias históricas siguen vigentes. Confirmar duración de cuatrimotos, recorrido, inclusiones, operadores, recursos, reserva anticipada y cupo, por separado de la tarifa.
3. Mapear registros reales al esquema del componente: `id`, `kind=experience`, `category=tourism`, `status`, `source_status`, `price_minor`, `price_unit`, `conditions_public` y `images`. `images` solo desde la biblioteca que preserve los originales y correcciones de curaduría.
4. Integrar CSS/JS en la ruta existente del anfitrión, tras validar sesión y `marketplace:view`; filtrar datos de cada tenant en servidor y no pasar registros privados al navegador.
5. Probar en una instalación de ensayo: móvil 320–640 px, imagen vertical/horizontal, carteles con texto, ausencia de imagen, precios caducados, vistas sin permisos, cambio de tenant, cierre de sesión y enlaces de las fichas existentes.
6. Desplegar únicamente tras aprobación de catálogo y fotografías; comprobar HTTP, fichas, rutas, galería, consultas y trazabilidad en producción. Sin acceso a la aplicación real, **el repositorio no acredita esta integración**.

### Compatibilidad con el catálogo productivo observado

Las actividades del catálogo existente usan `kind: "service"` y `status: "RESERVATION_ONLY"`. Este componente ahora muestra las actividades de turismo como «Experiencia» y el estado como «Solo con reserva (por confirmar)». No implica disponibilidad de operadores, horarios ni recursos.

El catálogo puede conservar valores en `price_minor` como **referencia histórica** junto a `source_status: "NEEDS_CONFIRMATION"`. En este caso, el componente oculta el importe hasta que el anfitrión obtenga y registre una verificación comercial vigente. No modificar precios internos ni sus fuentes al adaptar la vista.

El catálogo no incluye actualmente una lista `images` en las fichas turísticas consultadas. El adaptador visual deberá obtener imágenes solo de la biblioteca multimedia de INFINITY con derechos de uso y aprobación por negocio, preservando originales y correcciones humanas.

Un HTTP 200 en la ruta pública no acredita que este componente GitHub esté cargado, ni que funcione la experiencia móvil y el aislamiento por tenant. Los cambios de esta rama aún necesitan pruebas y despliegue por separado.

### Frontends productivos distintos — requisito para despliegue

La ruta pública `/marketplace` utiliza su propio `public-marketplace.js` y `public-marketplace.css`, no el archivo `marketplace-shell.js` de esta propuesta. La vista interna también mantiene `marketplace.js`, `marketplace.css` y la integración con el editor de fotos.

El frontend público consume `/marketplace-data.json` y utiliza `image_url`, `gallery` y `flyer_gallery` con validación de rutas de medios. **No sustituir esas reglas con URLs arbitrarias**. El adaptador de esta propuesta debe proyectar solo fotografías aprobadas a `images`, con `mobile_src` cuando exista una variante vertical autorizada. La implementación final debe mantener la galería y el editor ya existentes.

**Hallazgo pendiente:** en el JavaScript público observado, la presentación monetaria parte de `price_minor` sin condicionar el importe a `source_status=VERIFIED`. Antes de considerar terminada la publicación, corregir esta regla tanto en la salida pública autorizada como en la UI, sin borrar los antecedentes comerciales internos, y verificar con pruebas anónimas que los importes no confirmados no se ofrezcan como precios vigentes. Este PR no modifica ese frontend productivo.

### Ratificación de tarifas comerciales · 14/10/2026

El responsable comercial confirmó expresamente la vigencia de las tarifas de turismo que motivaron la actualización:

| Experiencia | Tarifa confirmada |
|---|---|
| Paseo a caballo, 3 vueltas | S/20 por persona |
| Paseo a caballo, 300 m (ida/vuelta) | S/40 por persona |
| Cabalgata 2.500 m, ingreso al Río Chillón | S/60 por persona |
| Equitación, una hora | S/100 por hora |
| Cuatrimotos | Desde S/30; unidad, duración y operador por confirmar |
| Canopy | Desde S/60; unidad, operador y condiciones por confirmar |

**Actualización productiva separada:** se registraron las seis confirmaciones en `marketplace_catalog.json` y como nuevos registros de `commercial-evidence-r1.json` en el VPS, conservando sus antecedentes históricos y estado `RESERVATION_ONLY`. Se ajustaron `public-marketplace.js` y `marketplace.js` de la aplicación anfitriona para mostrar unidades y el prefijo «Desde»; esas versiones **no pertenecen a este repositorio**.

La comprobación HTTP del 14/10/2026 mostró `/marketplace`, `/saas-assets/public-marketplace.js` y `/marketplace-data.json` con estado 200; el JSON publicó los seis importes, `source_status=VERIFIED` y `RESERVATION_ONLY`. Esto **no prueba** carga gráfica en todos los dispositivos ni despliegue del componente de este PR. La rama permanece en borrador pendiente de validar imágenes y adaptación.

Respaldo del servidor: directorio privado `/opt/infinity-unified/ops/tourism-price-confirmation-20261014` (no incluir su contenido en GitHub).

### Corrección de cuatrimotos (14/10/2026)

El responsable confirmó una modalidad explícita por ocupación sobre una única cuatrimoto:
- **Una persona / una cuatrimoto:** S/30.
- **Dos personas / la misma cuatrimoto:** S/50. No son dos vehículos.

El catálogo real mantiene el identificador `experience:quives-cuatrimotos` y añade `price_variants` (`base`, `two_riders`). El cotizador conserva un registro de tarifa por modalidad: S/30 y S/50, sin «Desde». Ambas siguen en estado `RESERVATION_ONLY`. La modalidad compartida requiere unidad habilitada para dos ocupantes, recorrido y duración confirmados, operador responsable y disponibilidad. No se confirmó cupo ni se creó una reserva.

El componente de este repositorio presenta el desglose autorizado sin alterar la fuente de verdad ni inventar contratos de operadores.

### Prospectos restaurantes — fuera del catálogo público

Se investigaron **Rica Pachamanca** y **El Ruco Cuy** en Carabayllo. Se encontraron listados públicos, no cartas oficiales completas con precios por plato. No se pueden importar los rangos generales de consumo de los directorios como precios individuales ni reproducir fotografías/cartas sin permiso.

Ambos se registraron como `CANDIDATE` en el módulo privado **Proveedores y aliados** de Carl's Grill Santa Rosa de Quives; cada uno tiene oferta `DRAFT` con comisión **propuesta, no aceptada, del 8%** sobre ventas elegibles realmente cobradas, prestadas y atribuibles. Los contratos individuales están archivados de forma privada en INFINITY, en estado `pending` y sin firmas. **No crear usuarios de esos restaurantes, no publicar sus catálogos como socios, no emitir comisiones ni iniciar pilotos hasta obtener consentimiento, datos tributarios, carta y acuerdo firmado.**

El repositorio GitHub solo contiene esquemas y muestras sintéticas: los contratos y datos de prospección permanecen en el host privado.
