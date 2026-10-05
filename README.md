# AgenteAutonomo_CarlsGrill

Integración de **Carl’s Grill en INFINITY**.

[Abrir el centro de operaciones de Carl’s Grill](https://quantumrestoai.com/app#carls-grill)

El acceso utiliza la sesión habitual y los negocios autorizados de INFINITY.

## Código disponible

`integrations/carls-grill/frontend/carls-command.js` contiene el panel visual y `carls-command.css` su diseño para escritorio y móvil. El componente recibe datos del anfitrión; no incluye credenciales, no hace llamadas de red y no inventa registros.

El panel incluye contactos, oportunidades, tareas pendientes, cierres con evidencia y accesos a marketing, conversaciones, conexiones y asistente. Cada acción utiliza la navegación de la aplicación anfitriona.

[Guía del componente](docs/CARLS-GRILL-UI.md)

## Trabajar con Codex

```sh
git clone https://github.com/CarlEnslin/AgenteAutonomo_CarlsGrill.git
cd AgenteAutonomo_CarlsGrill
git switch -c trabajo/descripcion-del-cambio
```

Leer `AGENTS.md` y `SECURITY.md` antes de editar. El backend completo de INFINITY no está incluido. No crear endpoints o dependencias aproximadas para sustituirlo.

El repositorio es público. No subir datos personales, credenciales, bases, respaldos ni configuración operativa privada. Los documentos de fuentes originales se conservan como antecedentes históricos.

El enlace dentro del panel abre este repositorio; no configura despliegues automáticos ni habilita canales externos.
