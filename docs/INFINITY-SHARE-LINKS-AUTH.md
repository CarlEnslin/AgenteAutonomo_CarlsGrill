# INFINITY: compartir fichas y conservar el destino al iniciar sesión

## Alcance y estado
Esta guía establece el contrato para **todos los módulos de INFINITY** (Marketplace, Garage, tareas, calendarios, Family House, etc.).
El repositorio actual contiene solo componentes visuales; **no** contiene el servidor de autenticación, router ni el despliegue de quantumrestoai.com. No presentar este documento como implementación del host.

## Comportamiento requerido
1. La tarjeta tiene una acción principal **Compartir**. El menú muestra WhatsApp, Telegram, Facebook, X, correo, **Copiar enlace** y, cuando el dispositivo lo admite, **Más aplicaciones** mediante la hoja nativa del sistema. Solo las apps instaladas/soportadas se muestran en la hoja nativa.
2. Cada enlace contiene un **identificador estable de recurso y contexto de navegación**. El enlace no contiene datos privados, credenciales, claves, tokens, números de documento ni claves de sesión.
3. El visitante abre la aplicación en la ubicación exacta. Si tiene sesión válida y permiso, ve la ficha de inmediato.
4. Si no tiene sesión, aparece el inicio de sesión con usuario/correo, contraseña visible/ocultable, recuperar contraseña, cancelar y estados de error. El contexto de la ficha debe mantenerse en memoria/ruta; idealmente el cuadro se superpone a la vista y no manda al inicio general.
5. Tras la autenticación (incluido OAuth si existe), volver al mismo módulo/negocio/recurso/estado de vista; refrescar permisos **desde el servidor** antes de mostrar contenido.
6. Sin permisos, mostrar una pantalla de acceso restringido y solicitud de acceso solo donde exista soporte; no revelar datos de la ficha. Para recursos borrados, no disponibles o URL inválidas, mostrar un estado adecuado con regreso seguro.
7. Las rutas se deben poder abrir desde WhatsApp en un navegador nuevo, una ventana privada y un teléfono distinto; también después de recargar y con sesión caducada.

## Contrato del componente Marketplace
`InfinityMarketplace.render({ catalog, navigate, openItem, getShareUrl, ... })`

- `getShareUrl(entry)` es una función **sincrónica** inyectada por la aplicación anfitriona y devuelve una URL HTTPS canónica, estable y compartible de esa **ficha**, tras validar que se permite compartirla.
- Cuando `getShareUrl` no existe, **no se muestra** Compartir. En el componente la URL está verificada superficialmente (HTTPS, sin credenciales en la autoridad), pero **el anfitrión** es responsable de verificar dominio/ruta de confianza y evitar tokens y datos sensibles en path/query/fragment.
- `openItem(entry.id)` sigue abriendo la ficha dentro del host. `getShareUrl` **no** consulta contenido ni otorga permisos. Se preservan las llamadas preexistentes del host.
- Cualquier otro módulo puede adoptar el mismo contrato, pero requiere integración y pruebas propias.

## Contrato de rutas y seguridad del host
- Establecer un **registro centralizado de rutas** con un parser que resuelva `modulo + tenantID + tipoRecurso + resourceID + subvista` usando IDs opacos estables; no usar nombres comerciales como comprobante de acceso.
- Definir una URL canónica por ficha (la sintaxis final, con pathname o hash, dependerá del router existente). Ejemplo solo de **estructura**, no un enlace operativo: `/app#/garage/vehicle/<resource-id>`.
- El cliente conserva la ruta exacta al mostrar el modal de inicio de sesión; nunca reemplaza la ubicación con `/app` simplemente porque falta sesión.
- En autenticación por redirección se mantiene el destino interno, evitando vulnerabilidades de redirección abierta: validar ruta contra allowlist interna y guardar estado ligado a la sesión/solicitud. No confiar en un parámetro `returnUrl` externo sin validar.
- Una vez iniciada sesión, revalidar el acceso en backend por **usuario + tenantID + recurso + acción**; no basta con tener una URL o una sesión.
- El backend devuelve respuesta equivalente a 401 (no autenticado), 403 (sin permisos), 404 (recurso inexistente/no divulgable) y estado de sesión expirada sin exponer contenido privado.
- El host debe borrar contexto sensible de autenticación al cerrar sesión o cambiar de negocio y garantizar que el botón Atrás del navegador se comporte correctamente.
- En vistas sensibles (salud, familia, finanzas), compartir el **localizador**, no una previsualización ni información del registro en aplicaciones externas; evaluar permisos de compartir antes de mostrar el botón.

## Matriz de verificación antes de producción
- [ ] Sesión activa y permisos: abrir enlace directo aterriza exactamente en la ficha.
- [ ] Sin sesión: formulario completo **en contexto**, autenticación y retorno a ficha.
- [ ] Contraseña incorrecta: error visible, sin perder destino.
- [ ] Recuperación de contraseña: después de completar proceso se preserva/restituye la ficha cuando sea posible.
- [ ] OAuth/redirección externa: retorno al recurso previsto, sin open redirect.
- [ ] Sin permisos: mensaje claro sin filtración de contenido.
- [ ] Diferente tenant: verificación por negocio; no cambiar acceso automáticamente.
- [ ] Sesión expirada: reautenticación sin pérdida de ubicación.
- [ ] URL manipulada, inexistente o antigua: error seguro y recuperación.
- [ ] WhatsApp/Telegram/Facebook/X/correo: URL correcta; cancelar y volver.
- [ ] Android/iOS: hoja nativa de compartir; escritorio: menú alternativo.
- [ ] «Copiar enlace»: portapapeles o copia manual accesible.
- [ ] Vista pequeña, lectores de pantalla, teclado, Escape, foco y navegación con Atrás.
- [ ] No generar/publicar enlaces con secretos o información privada.
- [ ] Confirmar que la aplicación de producción realmente usa la versión aprobada del componente.

## Dependencias abiertas
El propietario del host debe exponer el router real, autenticación, resolución de permisos y su proceso de despliegue. La existencia de una propuesta GitHub no implica que el servidor productivo cambió automáticamente.
