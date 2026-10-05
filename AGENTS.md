# Instrucciones para Codex

Este repositorio contiene el componente visual de Carl’s Grill y documentación histórica. El backend completo de INFINITY no está incluido.

Leer `README.md`, `docs/CARLS-GRILL-UI.md` y `SECURITY.md` antes de editar.

- Conservar la integración con la aplicación anfitriona y sus controles de sesión y acceso por negocio.
- No confundir la identificación visual del nombre de un negocio con autorización.
- No inventar endpoints, dependencias, reglas de negocio ni datos para sustituir fuentes ausentes.
- Mantener todas las entradas variables como texto; no insertar HTML recibido de registros.
- Comprobar el cambio entre negocios, el cierre de sesión, los estados vacíos, los errores y el tamaño móvil.
- Usar datos sintéticos y un entorno aislado para las pruebas.
- No publicar credenciales, datos personales, bases, respaldos ni configuración operativa privada.
- No presentar un enlace al repositorio como sincronización o despliegue automático.
- La publicación de código y el despliegue son acciones distintas; respetar el alcance autorizado para cada tarea.
- Trabajar en una rama y preservar cambios ajenos. No forzar actualizaciones del historial.
- Registrar lo que se comprobó y sus límites. No atribuir pruebas históricas a una ejecución nueva.

Para los dos archivos de presentación no hay dependencias de terceros. El comportamiento debe probarse con el contrato del anfitrión; no se incluye aquí una suite completa del backend.
