# INFINITY GeoRealty — arquitectura propuesta

## Propósito

GeoRealty es la capa inmobiliaria/geoespacial de INFINITY. Debe permitir que un proyecto evolucione desde una ficha comercial hasta un activo técnico con mapa, terreno, topografía, lotización, modelos 3D, BIM y servicios profesionales.

## Principios

- Open source primero.
- Formatos abiertos y exportables.
- Separación estricta por tenant y usuario.
- El archivo técnico original conserva procedencia, fecha y permisos.
- Ningún precio, lote, título, área o disponibilidad se inventa a partir de una imagen.
- Un modelo 3D no sustituye un levantamiento topográfico o documento legal.

## Stack preferente

### GIS
- QGIS / GRASS GIS.
- GDAL.
- PostGIS.
- MapLibre.

### Topografía y nubes de puntos
- PDAL.
- CloudCompare.
- LAS / LAZ.

### Fotogrametría
- OpenDroneMap / WebODM.

### BIM y arquitectura
- FreeCAD.
- IfcOpenShell / BlenderBIM.
- Blender.
- IFC como formato interoperable.

### Web 3D
- CesiumJS.
- Three.js.
- GLB / glTF.

### Datos
- GeoJSON para geometrías vectoriales.
- GeoTIFF para raster/elevación.
- IFC para BIM.
- OBJ/GLB para modelos de visualización.

## Pipeline de terreno

1. Definir fuente y permisos.
2. Capturar coordenadas/polígono.
3. Importar DEM, levantamiento o nube de puntos.
4. Normalizar CRS.
5. Calcular curvas, pendientes y elevaciones.
6. Generar malla de terreno.
7. Superponer lotes e infraestructura.
8. Exportar versión web GLB/Cesium.
9. Vincular ficha del Marketplace.
10. Registrar versión y procedencia.

## Google Maps y terceros

Las APIs o basemaps con licencia pueden utilizarse según sus términos, pero INFINITY no debe extraer ni redistribuir modelos 3D propietarios como activos propios. Para un gemelo 3D exportable usar datos abiertos, datos del cliente, levantamiento, dron o fuentes con licencia compatible.

## Red de profesionales

Marketplace debe permitir perfiles de:

- arquitecto;
- topógrafo;
- ingeniero;
- modelador 3D;
- piloto de dron;
- paisajista;
- constructor.

El flujo comercial:

`proyecto → necesidad → solicitud → profesionales autorizados → propuesta → aceptación → trabajo → validación → comisión INFINITY`.

Los contactos privados del profesional no se convierten automáticamente en datos públicos. El perfil público se alimenta solo con campos aprobados.

## Privacidad local-first

El diseño objetivo para contactos es un Private Contact Vault local cifrado. El servidor recibe únicamente identificadores o datos mínimos cuando el usuario autoriza una acción que lo requiere. Cualquier sincronización futura debe ser opt-in, cifrada y auditable.

## Primer piloto

Usar una ficha inmobiliaria con datos comerciales verificados y sin precio inventado. Añadir después geometría real cuando exista una fuente técnica confiable.
