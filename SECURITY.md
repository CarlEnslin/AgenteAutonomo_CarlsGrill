# Secretos y datos privados

El repositorio es público. Solo admite código revisado, documentación técnica sin datos personales y fixtures sintéticos.

No versionar contraseñas, tokens, claves privadas, sesiones, cookies, autorizaciones OAuth, archivos de entorno, bases de datos, respaldos, historias clínicas, correos, contactos, importaciones financieras, logs productivos o capturas de administración. Un secreto puede estar embebido en código, Markdown, JSON o JavaScript aunque el nombre del archivo no esté excluido.

`.gitignore` reduce errores con archivos nuevos. No inspecciona contenido, no bloquea la API de GitHub, no retira archivos ya rastreados y puede omitirse mediante una incorporación forzada. Revisar siempre el contenido de cada archivo antes del commit y de cualquier publicación por API.

Mantener originales y evidencia privada fuera del árbol de trabajo. Si se necesita un ejemplo de configuración, crear uno nuevo con nombres comprobados y valores vacíos o marcadores; nunca copiar y publicar el entorno real. No incluir configuración de servicios que contenga secretos en argumentos, URLs o variables.

Si se detecta una credencial expuesta, detener su difusión, comunicar el incidente por un canal privado y gestionar su revocación o rotación con el responsable. Borrarla del último commit no elimina la exposición del historial. No publicar el valor en issues, comentarios, mensajes de commit ni resultados de pruebas.

No se han configurado controles de secretos del servidor GitHub ni protección de ramas como parte de esta inicialización.
