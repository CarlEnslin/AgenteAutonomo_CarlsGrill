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

Se agregan **cinco fichas de muestra independientes**: cuatrimotos, paseo a caballo de tres vueltas, paseo de 300 m, cabalgata de 2.500 m con entrada al río y equitación de una hora. Están en \`integrations/marketplace/examples/\` y están marcadas \`sample_only: true\`. **No son registros del servidor** y sus identificadores de ejemplo no se deben importar. Sus importes son \`null\`; referencias comerciales antiguas, aunque documentadas, no son automáticamente tarifas vigentes.

El sistema anfitrión conserva el identificador real de cada actividad, los enlaces antiguos, sus variantes y los permisos de negocio. **Primero consultar el catálogo real y cotejar IDs/slugs, después actualizar por ID en vez de agregar nuevas fichas**. No sobrescribir ni volver a importar las actividades que ya existan.

### Imágenes y visualización móvil

\`images\` es una lista de activos públicos previamente autorizados por el host:

\`\`\`json
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
\`\`\`

**Las rutas son ilustrativas, no archivos que este repositorio proporcione.** No hay fotografías nuevas subidas o aprobadas en este cambio. El host debe revisar permisos de uso, empresa/tenant, derechos de imagen, y sanitizar las URLs antes de pasar las imágenes. El cliente acepta únicamente HTTPS o rutas absolutas del mismo origen; rechaza protocolos ejecutables y requiere \`approved: true\`. No hay fetch, subida, ni edición de originales.

- \`mobile_src\` presenta una versión vertical aprobada en pantallas de hasta 640 px; si no existe, usa el original.
- \`orientation\` controla la proporción visible: \`portrait\`, \`square\`, \`landscape\` o \`wide\`.
- \`fit: contain\` evita recortar carteles con texto; \`fit: cover\` llena la tarjeta para fotos cuyo recorte fue autorizado.
- Al tocar la imagen se abre un visor accesible. Un cartel horizontal puede desplazarse horizontalmente en móvil para leer detalles.
- Si no hay imagen aprobada, no se muestra un placeholder engañoso.

### Política de precios y reservas

El componente solo presenta \`price_minor\` cuando **simultáneamente** \`status=AVAILABLE\`, \`source_status=VERIFIED\` y el importe es un entero no negativo. \`price_unit\` es texto público aprobado que se anexa únicamente junto al importe verificable. En los demás casos se muestra «Tarifa por confirmar», o «Referencia histórica: confirmar tarifa» para \`STALE\`. Las notas de operación que sean publicables se pasan como \`conditions_public\`. Esas etiquetas no prueban cupos ni reserva. El host valida fechas, fuente, unidad, condiciones, disponibilidad y acceso.

### Pasos para quantumrestoai.com

1. Leer el catálogo actual y localizar fichas existentes por IDs y aliases; **no importar estas muestras**. Registrar fuente, fecha, estado y control de versión para cada tarifa.
2. Verificar con el responsable si las referencias históricas siguen vigentes. Confirmar duración de cuatrimotos, recorrido, inclusiones, operadores, recursos, reserva anticipada y cupo, por separado de la tarifa.
3. Mapear registros reales al esquema del componente: \`id\`, \`kind=experience\`, \`category=tourism\`, \`status\`, \`source_status\`, \`price_minor\`, \`price_unit\`, \`conditions_public\` y \`images\`. \`images\` solo desde la biblioteca que preserve los originales y correcciones de curaduría.
4. Integrar CSS/JS en la ruta existente del anfitrión, tras validar sesión y \`marketplace:view\`; filtrar datos de cada tenant en servidor y no pasar registros privados al navegador.
5. Probar en una instalación de ensayo: móvil 320–640 px, imagen vertical/horizontal, carteles con texto, ausencia de imagen, precios caducados, vistas sin permisos, cambio de tenant, cierre de sesión y enlaces de las fichas existentes.
6. Desplegar únicamente tras aprobación de catálogo y fotografías; comprobar HTTP, fichas, rutas, galería, consultas y trazabilidad en producción. Sin acceso a la aplicación real, **el repositorio no acredita esta integración**.
