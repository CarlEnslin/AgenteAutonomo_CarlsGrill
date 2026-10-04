# Incorporar el backend real

## Fuente exacta que falta

Falta una **exportación completa, revisada y sin secretos del código del release al que apunta actualmente `/opt/infinity-unified/current`**, acompañada de evidencia de que `infinity-unified.service` usa ese código. La referencia documental del 02/10 era `/opt/infinity-unified/releases/20261001-marketing-media-r1`; no asumir que sigue vigente.

La exportación debe incluir, si la versión activa los utiliza:

- `unified_main.py`, todos sus módulos propios e importaciones transitivas.
- `app/`, incluyendo `app/saas/security.py`, `app/saas/routes.py`, `app/saas/connections.py` y el frontend real `app/saas/web/`.
- Paquetes propios adicionales importados, plantillas y recursos necesarios para ejecutar el servicio.
- Archivos reales de dependencias y restricciones, versión de Python y pruebas existentes con fixtures sintéticos.
- Código de esquema y migraciones existentes; nunca una copia de los registros productivos.

También falta una exportación revisada del código actual de `/home/quantum/backend`, ligado a `backend.service`, para delimitar qué sigue activo y evitar perder cambios. Debe conservar su `main.py`, `app/`, `route_inteligente_v1.py` y cualquier módulo adicional que realmente importe. Los antecedentes mencionan cambios de `new_chat` y `feedback` posteriores a archivos históricos; localizar su implementación real, sin suponer nombres ni rutas concretos.

**Ninguno de los ZIP inspeccionados satisface por sí solo esta condición.** No falta simplemente otro `main.py`: faltan el árbol ejecutable completo y su relación comprobada con los servicios.

## Evidencia mínima que debe acompañarlo

| Dato | Para qué sirve |
|---|---|
| Fecha/hora y ruta resuelta de `current` | Identificar la versión exportada y detectar cambio de release. |
| Servicio, directorio de trabajo y módulo de entrada, revisados sin secretos | Asociar los archivos al proceso correcto. |
| Inventario de rutas relativas, tamaños y SHA-256 | Comparar los bytes exportados con el origen. |
| Lista de archivos excluidos y motivo, sin valores privados | Explicar dependencias ausentes sin publicar datos. |
| Commit de origen, si existe, o manifiesto fechado si no existe | Establecer procedencia reproducible. |
| Relación entre los dos servicios y rutas del proxy, resumida sin credenciales | Evitar reemplazar el sistema equivocado. |

Para un operador autorizado, estas consultas de solo lectura ayudan a identificar el origen:

```sh
readlink -f /opt/infinity-unified/current
systemctl show infinity-unified.service --property=WorkingDirectory,FragmentPath --no-pager
systemctl show backend.service --property=WorkingDirectory,FragmentPath --no-pager
```

Estas consultas no exportan el código ni acreditan por sí solas el runtime. Inspeccionar en privado el comando de inicio y sus importaciones; conservar solo una descripción saneada. No publicar salida de `env`, archivos de entorno, argumentos con credenciales, unidades completas sin revisar ni logs de producción.

## Procedimiento cuando la fuente esté disponible

1. Verificar la ruta activa y tomar una copia consistente de **código**, fuera de este repositorio. Mantener un inventario privado. No reiniciar, migrar, instalar ni alterar el servicio para conseguir esa copia.
2. Separar código de configuración y datos. Excluir entornos virtuales, cachés, `.env`, autorizaciones OAuth, claves, bases, archivos subidos, conocimiento privado, respaldos y logs. Revisar también secretos incrustados dentro de archivos de código y documentación.
3. Comparar hashes contra el origen estable; registrar cualquier saneamiento con su hash posterior. Revisar archivos y dependencias realmente necesarios. No subir el archivo comprimido original al repositorio público.
4. Trabajar en una rama de importación. Conservar la estructura de importaciones real y decidir la ubicación después de identificar ambos servicios; no mover archivos a `backend/` de forma mecánica.
5. Añadir ejemplos nuevos con valores vacíos solo para variables de entorno comprobadas. Documentar dependencias y comandos de instalación de la versión real. No elegir versiones aproximadas para rellenar vacíos.
6. Ejecutar las pruebas existentes en un entorno aislado, sin conexiones externas ni datos reales. Registrar lo ejecutado y sus límites; los totales de pruebas de paquetes anteriores no cuentan como ejecución nueva.
7. Revisar el diff completo, los archivos excluidos y la procedencia. Actualizar `SOURCE_OF_TRUTH.md` y el README. Incorporar solo el código verificado, manteniendo candidatos posteriores identificados y separados hasta reconciliarlos.

El despliegue sigue siendo una tarea distinta. Esta importación no autoriza sobrescribir `/opt/infinity-unified/current`, `/home/quantum/backend`, bases, sesiones, callbacks, proxy o servicios.
