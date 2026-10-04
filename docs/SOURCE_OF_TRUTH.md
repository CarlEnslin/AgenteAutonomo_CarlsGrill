# Fuentes y decisión de incorporación

Revisión: 2026-10-04, America/Lima. Alcance: preparar `CarlEnslin/AgenteAutonomo_CarlsGrill` para trabajo con Codex, conservando los sistemas actuales.

## Decisión

**BACKEND_SOURCE_UNVERIFIED — incorporar únicamente el esqueleto.** Se localizaron e inspeccionaron fuentes históricas, candidatos y módulos recientes, pero no una exportación completa inequívocamente vinculada a los servicios actualmente desplegados. Integridad de un archivo no equivale a vigencia productiva.

GitHub confirmó antes de la inicialización: repositorio público, rama predeterminada `main`, tamaño 0 y consulta de commits con HTTP 409, `Git Repository is empty`. La búsqueda de repositorios accesibles del propietario devolvió este repositorio; no encontró otra fuente de código en esa búsqueda.

## Fuentes examinadas

| Fuente | Evidencia leída en esta revisión | Alcance y límite |
|---|---|---|
| `Infinity-backend.zip`, dos copias archivadas el 15/09 | Mismos bytes; 40 entradas; `main.py`, `requirements.txt`, imports de FastAPI y routers propios. | Código histórico real disponible. No demuestra coincidencia con producción actual. |
| `INFINITY-LAUNCH-CONTROL.md`, 29/09 UTC | Informe completo: candidato separado `saas_main:app`; advierte cambios productivos posteriores al ZIP y falta de instalación/verificación en ese momento. | Arquitectura y resultados históricos declarados. Las pruebas del informe no se volvieron a ejecutar aquí. |
| `INFINITY-SAAS-ZERO-CAPITAL-PARTNER-MARKETPLACE-2026-09-29.zip` | README y `docs/SOURCE_OF_TRUTH.md`; 294 entradas. | Piloto separado con código candidato. Su documentación prohíbe copiarlo íntegro sobre el VPS. |
| `INFINITY-QUANTUMRESTOAI-UNIFICADO-R1-2026-09-29.zip` | 176 entradas; `unified_main.py`, `saas_main.py`, `main.py`, dependencias y `QUANTUMRESTOAI-INTEGRACION.md`. | Candidato unificado; el documento declara que entonces no estaba desplegado. No contiene prueba de equivalencia con una versión posterior. |
| Respaldo de `quantumrestoai.com` del 30/09, TAR.GZ | Inventario de 15.607 entradas bajo `domains/quantumrestoai.com/public_html`, con WordPress. No se leyó `wp-config.php`. | Respaldo de sitio WordPress; no es una exportación del backend Python del VPS. No se importó. |
| `INFINITY-Accesos-Conexiones-R2-CANDIDATO.zip`, 02/10 | README y diagnóstico: servicio unificado y ruta de release inspeccionados entonces; 19 entradas. | Evidencia documental más reciente localizada de la ubicación del servicio. Es un módulo candidato, no un snapshot completo de esa instalación. |
| `INFINITY-Dental-R9-Laboratorio-y-Pruebas.zip`, creado 04/10 UTC (03/10 en Lima) | `LEER-PRIMERO.md`, contrato de integración e inventario de 23 entradas. | Laboratorio con datos ficticios. Requiere validar su adaptador contra el VPS activo; no es el backend completo ni está acreditado como desplegado. |

Se buscó además en Google Drive por nombres INFINITY, Infinity y QuantumResto: los resultados accesibles fueron documentos, catálogos y carpetas, sin una fuente productiva completa identificada. Esa búsqueda tiene límites de tipos e indexación; no acredita inexistencia de otros archivos. Los antecedentes conversacionales recuperados corroboran la separación entre producción y candidatos, pero no sustituyen los bytes actuales del servidor.

## Arquitectura documentada más reciente

El diagnóstico incluido en R2, fechado 2 de octubre, registra:

| Componente | Referencia observada entonces |
|---|---|
| Servicio unificado | `infinity-unified.service` |
| Ruta lógica | `/opt/infinity-unified/current` |
| Destino del enlace en esa inspección | `/opt/infinity-unified/releases/20261001-marketing-media-r1` |
| Entrada y escucha del unificado | `unified_main:app`, `127.0.0.1:8650` |
| Sesión y rutas SaaS | `app/saas/security.py`, `app/saas/routes.py` |
| Conexiones y frontend | `app/saas/connections.py`, `app/saas/web/app.js` |
| Backend anterior separado | `/home/quantum/backend`, `backend.service`, puerto 8000 |

Estos son hechos documentados de aquella inspección, no una lectura viva realizada hoy. El inventario de dispositivos de esta revisión devolvió el conector del VPS como **Offline**. Esto impide verificar sus archivos por esa vía; no demuestra caída del sitio ni del proceso de INFINITY.

El código actual de ambos servicios debe reconciliarse antes de decidir dónde ubicarlo en este repositorio. No se copian datos, cuentas, autorizaciones, configuraciones privadas ni observaciones comerciales contenidas en los paquetes fuente.

## Huellas de los archivos inspeccionados

SHA-256 calculados sobre los archivos descargados en esta revisión:

| Archivo | SHA-256 |
|---|---|
| `Infinity-backend.zip` (ambas copias) | `3858e158719aabe2e4a04f95cddb2a966f5eddbfc2da528b0358b4c1b3486a8b` |
| `INFINITY-SAAS-ZERO-CAPITAL-PARTNER-MARKETPLACE-2026-09-29.zip` | `222f01dfc632d755e2d1abd7de5573322abdca6ade1c3169317db17a435de089` |
| `INFINITY-QUANTUMRESTOAI-UNIFICADO-R1-2026-09-29.zip` | `6e3df430d77b89701751163422d2a86698cdf164547ce18b4651a579bd547f32` |
| Respaldo WordPress TAR.GZ del 30/09 | `a2972473ddd940242bb36fa3a55c1f5934935335dc7b888cfd07a9d276eb5ed3` |
| `INFINITY-Accesos-Conexiones-R2-CANDIDATO.zip` | `cb44f17c76587866fb8d2c0dbcad75f5da3f1c2e12171e519ab16f7bd47af6ca` |
| `INFINITY-Dental-R9-Laboratorio-y-Pruebas.zip` | `db04df0348e1a0e0388162875145070eedc16ca691e77f1830aaf528ea1cbaba` |

Las huellas permiten identificar estos candidatos y duplicados. No acreditan autoría, ausencia de secretos, seguridad de ejecución ni correspondencia con producción. Los archivos originales permanecen fuera de GitHub.

## Condición para cambiar de estado

Obtener la fuente descrita en `BACKEND_IMPORT.md`, vincularla a la versión activa con fecha y hashes, revisar su contenido, comprobar dependencias y ejecutar pruebas aisladas. Registrar qué parte se verificó y qué parte continúa siendo histórica. No sustituir este estado por una conclusión basada solo en una fecha de archivo o en una respuesta HTTP satisfactoria.
