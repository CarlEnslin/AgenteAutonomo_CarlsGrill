# Instrucciones para Codex

## Alcance actual

El repositorio contiene un esqueleto seguro. No existe aquí un backend verificado. Leer `README.md`, `docs/SOURCE_OF_TRUTH.md` y `docs/BACKEND_IMPORT.md` antes de implementar cambios.

- No inventar endpoints, dependencias, modelos, migraciones o reglas de negocio para sustituir el código ausente.
- No tratar un ZIP candidato, una demo, una fecha reciente o un resultado histórico de pruebas como evidencia de despliegue.
- Mantener separadas las observaciones del servicio unificado y del backend anterior. No reemplazar uno con otro.
- No copiar paquetes completos, bases, conocimiento privado o logs al repositorio. Incorporar solo archivos individualmente revisados y con procedencia.
- Preservar la estructura e importaciones del código verificado cuando llegue; `backend/` no impone una reestructuración del runtime.
- No acceder a bases productivas ni usar credenciales reales para validar este esqueleto. Usar datos sintéticos en pruebas futuras.
- No ejecutar instaladores recuperados, migraciones, reinicios, cambios de proxy, DNS, webhooks o despliegues como parte de una incorporación de código.
- No cambiar permisos, audiencia o automatizaciones externas sin el alcance correspondiente.

## Trabajo y validación

Usar una rama por cambio; conservar cambios ajenos. Identificar la versión de origen y comparar antes de editar. Documentar qué cambió, qué se verificó y qué permanece pendiente.

Actualmente no hay dependencias ni suite de aplicación que instalar o ejecutar. Para cambios documentales, revisar enlaces relativos, coherencia y `git diff --check`. Para incorporar código, añadir comandos de instalación y pruebas únicamente después de comprobarlos en una copia aislada.

Nunca afirmar que una prueba, conexión, integración o despliegue se completó si solo existe una propuesta o evidencia histórica. No publicar resultados privados de diagnósticos. Revisar nombres y contenido del diff antes de enviar cambios a GitHub; no usar `git add -f` para omitir exclusiones de seguridad.
