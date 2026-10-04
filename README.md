# AgenteAutonomo_CarlsGrill

Base de trabajo para Codex y la incorporación controlada del código de INFINITY / QuantumResto-AI.

**Estado al 4 de octubre de 2026: esqueleto documental; backend actual pendiente de verificar e incorporar.** Este repositorio todavía no ejecuta INFINITY. Su inicialización no instala, despliega ni modifica servicios existentes.

## Comenzar

```sh
git clone https://github.com/CarlEnslin/AgenteAutonomo_CarlsGrill.git
cd AgenteAutonomo_CarlsGrill
git switch -c trabajo/descripcion-del-cambio
git status --short
```

En Codex, seleccionar este repositorio y usar `main` como base. Leer primero `AGENTS.md` y `docs/SOURCE_OF_TRUTH.md`. No hace falta configurar credenciales de producción ni instalar dependencias para trabajar con este esqueleto. No se han definido comandos de arranque, dependencias o pruebas de aplicación porque aún falta su fuente actual.

## Estructura

| Archivo o carpeta | Propósito |
|---|---|
| `AGENTS.md` | Instrucciones de continuidad y límites para Codex. |
| `backend/README.md` | Reserva documental para la futura incorporación; no contiene una aplicación. |
| `docs/SOURCE_OF_TRUTH.md` | Fuentes inspeccionadas, integridad y límites de vigencia. |
| `docs/BACKEND_IMPORT.md` | Fuente exacta pendiente y procedimiento de incorporación. |
| `SECURITY.md` | Manejo de secretos y datos privados. |
| `.gitignore` | Exclusiones de credenciales, estado local, bases y respaldos. |

## Qué falta

Una exportación revisada del código que resuelva **actualmente** `/opt/infinity-unified/current`, vinculada al servicio `infinity-unified.service`, y una comparación con `/home/quantum/backend` (`backend.service`). El diagnóstico del 2 de octubre apuntaba a `releases/20261001-marketing-media-r1`; es una observación histórica, no una verificación actual.

El ZIP histórico `Infinity-backend.zip`, el candidato unificado del 29 de septiembre y los módulos posteriores no demuestran por sí solos qué código está desplegado. Por eso no se importó ninguno como backend canónico. El detalle está en [la guía de incorporación](docs/BACKEND_IMPORT.md).

## Antes de cada commit

Revisar `git status --short`, `git diff --cached --name-only` y `git diff --cached` en un entorno privado. Agregar archivos por nombre después de revisarlos. Este repositorio es público: no subir archivos originales de producción, datos de clientes, exportaciones de conversaciones ni credenciales. `.gitignore` es una barrera preventiva, no un detector de secretos ni protección para archivos ya versionados.

No hay despliegue automático ni conexión del repositorio al VPS. La publicación de este esqueleto no demuestra que Codex haya ejecutado una tarea remota o que INFINITY haya cambiado.
