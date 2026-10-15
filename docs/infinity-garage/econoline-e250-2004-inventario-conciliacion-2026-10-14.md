# INFINITY GARAGE — Ford Econoline E250 2004 — expediente de conciliación (2026-10-14)

Estado: datos recopilados de conversación y fotografías; NO equivalen a comprobación de instalación, pago o inventario físico. Evitar duplicar partidas existentes.

## Identidad y mecánica
- Vehículo Ford Econoline E250 2004, proyecto también llamado Forte Kona Line / Forte ITU 50 (alias por confirmar). No confundir con Ford Crown Victoria ni con referencia histórica a Econoline 1998.
- Motor Ford V8 configurado 302, procedente del conjunto anteriormente usado en Crown Victoria, con cigüeñal/pistones 302 y Edelbrock Pro-Flo 4 EFI; transmisión AOD mejorada. Segundo motor Ford 289 y otra AOD son EXTRAS, no instalados.
- Historial: reconstrucción de motor, cigüeñal, pistones, metales, culatas/empaques, reparación de rosca, balancines, ajuste de encendido con 12° BTDC como objetivo de configuración Pro-Flo 4; trabajos de arranque y AOD reportados resueltos. No declarar operatividad definitiva sin prueba.
- Combustible: sistema anterior Edelbrock fuel sump con bomba de carburador y pérdidas de presión; se adquirió AEM 50-1000 340 LPH in-tank, regulador Fuelab 53501-1K o 53601-1K (verificar código de caja; fotografía previa 53501-1K), filtro de 10 micras (elemento Fuelab 71801, cuerpo reportado PQY), y manómetro. Cotización de compra por tres componentes S/2350 según chat; estado de instalación no verificado. Cableado relé Bosch 30/87/87a/85/86 y conector anterior morado positivo / negro negativo; verificar polaridad, control ECU y fusible antes de energizar. Manguera vista 5/16 300 PSI EN1765 para retorno externo; no sumergible. Faltantes sujetos a revisión física: líneas de alimentación y retorno, adaptadores AN6, manguera sumergible compatible, conexión retorno tanque, relé/fusible/cableado y puesta a punto.
- Bujías: muestra Champion RV12YC/406, se evaluó RV15YC4 según catálogo Ford LTD 1981 (no asumir automáticamente compatibilidad con culatas del 302 trasladado); se adquirieron ACDelco R42TS oxidadas para pruebas; otras ofertas de Autolite 26 y Champion pendientes de verificación. No registrar ofertas como compras.
- Carrocería: búsqueda pendiente del marco/soporte frontal de parrilla y direccionales de Econoline 2004. No confundir con parrilla decorativa.

## Inventario visual — 2026-10-14 (existencia en fotos, propiedad/ubicación a conciliar)
1. Juego de llaves mixtas Casco, 18 piezas métricas/pulgadas, estuche negro; 9 métricas 8,9,10,11,12,13,14,17,19 mm y 9 SAE 1/4,5/16,3/8,7/16,1/2,9/16,5/8,11/16,3/4. Cantidad: 1 juego visible; precio y fecha desconocidos.
2. Herramienta INGCO de mango amarillo/negro, parece destornillador o portapuntas, sostenido por alicate de presión: identidad exacta y cantidad por confirmar; no inventariar como herramienta separada sin inspección.
3. Alicate de presión metálico visible: 1 unidad, marca/modelo no legible, precio desconocido.
4. Vernier comprado Sodimac S/29.80 según conversación 2026-10-13, inventario herramientas; comprobante pendiente.
5. Pistola de tiempo digital Risco DA-3100, compra informada S/700 (2026-08-28 aprox.), avance 0–60°, RPM, voltaje, dwell; existencia actual por confirmar.
6. Manómetro Fuelab de presión gasolina visible instalado/ubicado en vano motor: componente vehicular, no herramienta suelta; no duplicar costo con regulador.
7. Otras fotos: vano motor, cables de bujía azules, filtro aire Edelbrock, compartimento interior, batería, neumático/aro y accesorios; registrar como evidencia del estado, no como compras independientes.
8. Caja/estuche de herramientas con llaves mixtas: registrar como parte del juego, no como herramienta adicional.

## Gastos con cifras aportadas
- Bomba AEM + regulador Fuelab + filtro: S/2350, monto comunicado en negociación/compra; verificar comprobante antes de consolidar gasto.
- Pistola estroboscópica digital: S/700, usuario indicó compra.
- Vernier: S/29.80, usuario indicó compra.
- Cochera: S/62.50 + S/10 + S/4.50 reportados el 2026-10-13 = S/77.00; verificar concepto y no duplicar abonos. Tarifa futura S/10 noche y S/4.50 día; no registrar como pagado.
- Llaves Casco, alicate, herramienta INGCO, componentes varios: precio desconocido.

## Estado y acciones de integración
- Consolidar contra registro actual de quantumrestoai.com / INFINITY GARAGE; acceso al backend no verificado aquí. Este expediente en GitHub es fuente de conciliación, NO prueba de publicación en web.
- Campos requeridos: vehículo/alias, categoría, descripción, cantidad, estado, ubicación, propietario, precio, fecha, proveedor, comprobante, imagen, fuente, instalado vs almacenado, validación humana.
- No mezclar inversión personal y aportes de sociedad; registrar propietario y origen antes de valorar.

---

## Ampliación de expediente e integración — 2026-10-14

**Alcance:** síntesis del historial 2025–2026 y de los libros de trabajo `INFINITY_GARAGE_MAESTRO_2026-10-09.xlsx` y `INFINITY_GARAGE_MAESTRO_COMPARADOR_2026-10-09.xlsx`. Algunos registros se originan en afirmaciones del propietario o fotografías descritas en conversaciones previas; no se asumen verificaciones físicas independientes. Mantener `E250-2004` como identificador maestro. La base privada del anfitrión manda sobre este documento público.

### Verificación actual de infraestructura

- El **2026-10-14** se observó en el dispositivo autorizado del VPS la versión activa `/opt/infinity-unified/releases/20261013-garage-expenses-r1`, con `infinity-unified.service` y `backend.service` activos. Observación puntual; no avala por sí sola el contenido de la base ni el funcionamiento de cada ruta.
- El anfitrión contiene módulo `app/unified/garage_api.py` y vistas `app/saas/web/garage-private.html` + `garage.js`; acceso de navegación desde `/app/garage`. El endpoint `/api/unified/garage/records` exige autorización del dueño. No inventar rutas adicionales ni efectuar accesos privilegiados fuera del contrato verificado.
- La aplicación distingue tipos `vehicle`, `order`, `spare`, `quote`, `supplier`, `measurement`, `decision`, `expense`, `tool`, `parking`, además de fotografías por mecanismo separado. **Código en GitHub, staging y registros de producción son tres estados diferentes.**
- Se dejó exclusivamente en **staging privado del VPS** el archivo `/var/lib/infinity-unified/garage-imports/e250-2026-10-14-consolidado-PENDIENTE.json` con 36 registros en formato `kind, record_id, payload`. Permisos de archivo `0600`, carpeta `0700`. Es un archivo **pendiente de conciliación/importación**, no una modificación verificada de la base `garage.sqlite3`. No publicar su contenido o recibos en este repositorio.
- No se ha comprobado una importación del staging a la base activa ni la aparición de los registros nuevos en la interfaz. Hacer reconciliación autenticada por ID y tipo, preservar campos nuevos de origen y verificar métricas antes de afirmar sincronización.

### Activos y propiedad: no mezclar

| ID | Activo | Estado o destino | Regla de inventario |
|---|---|---|---|
| E250-2004 | Ford Econoline E250 2004 | Motor configurado a Ford 302; EFI Pro-Flo 4; AOD mejorada; avería sin cierre de inspección | **Vehículo del expediente principal** |
| GAR-ENG-002 | Segundo motor Ford 289 | Repuesto separado; posible futuro Ford F-150 | No registrarlo como motor actualmente instalado |
| GAR-TR-002 | Segunda caja AOD | Extra, posible futuro F-150 | No sumarla a la AOD instalada |
| CV-1981-82 | Ford Crown Victoria | Proyecto parrilla móvil remolcable sin motor | No mezclar averías del conjunto trasladado |
| F150-1980s | Ford F-150 ochentera | Proyecto futuro por confirmar | No declarar compra ni instalación |
 
### Cronología: hechos, propuestas y medidas sin prueba

- **2025-11:** se eligió proyecto Econoline con Windsor 302, Pro-Flo 4, AOD y posible GLP. Roofrack/safari, asientos turísticos, piso lateral expandible tipo comedor y bullbar fueron **ideas de diseño**, no entregas confirmadas. Ratios de ejes 3.55/3.73/4.10 eran recomendaciones, no coronas instaladas.
- **2026-03:** se estudiaron TV cable Lokar, kit TransGo SK AOD y cooler Hayden Rapid-Cool. Menciones o consultas no bastan para inventariar estas marcas como instaladas.
- **2026-07:** motor Windsor comprado inicialmente identificado como 289 por carrera de 2.87"; bloque antiguo/no roller referido; cigüeñal/metales originales problemáticos (0.060 reportado). Se efectuó adaptación posterior con cigüeñal y pistones de 302. Sobremedida de cilindros reportada +0.030"; 4.030" es diámetro teórico, **requiere medición real**.
- **2026-08:** historial de balancín desplazado, fuga/sellado entre cilindros 1 y 2 y problemas de empaque de culata. Se evaluaron empaques locales Pevisa y definitivos Fel-Pro/Ford Performance; no registrar cada opción como comprada. Calibrar y verificar base de avance para Pro-Flo 4 conforme manual, sin atribuir 12° BTDC a una medición real actual.
- **2026-08 a 2026-10:** bombas del conjunto Edelbrock fuel sump fallaban; valores históricos de presión: aproximadamente 58 psi al dar contacto, caída a ~5 psi en 2 s y pérdida en caliente tras 15–20 min. Prueba con tapa de tanque retirada sin mejora. Conjunto AEM / Fuelab / filtro 10 micras reportado como adquirido, **instalación y comprobantes sin cierre**. No afirmar que la falla ya está resuelta.
- **2026-10:** E250 identificada como destino real del conjunto motor/caja trasladado desde Crown Victoria. Caso de seguridad `GAR-E250-001`: humo/aceite por escape izquierdo, alojamiento de perno de culata dañado, inserto anterior expulsado y solución provisional mediante varilla/pasador; inspeccionar antes de usar. **No arrancar motor hasta revisión profesional de bloque/culata, taladro transversal, fisuras y fijación.**
- **2026-10-13:** gastos de cochera reportados S/62.50 atrasos + S/10 noche + S/4.50 día, total S/77.00; no contar S/62.50 como una sola noche. Próxima noche a partir del 14/10 S/10 pendiente salvo nueva constancia.
- **2026-10-13–14:** vernier Karson 150 mm de Sodimac S/29.80. Se comunicó **recibido y funcionando el 14/10**, con estuche y una pila de botón adicional LR44/AG13 1.5 V. Anula la nota histórica de entrega pendiente.

### Herramientas: unidad lógica, costo, certeza

| ID canónico | Elemento | Cantidad lógica | Valor / estado |
|---|---|---|---|
| TOOL-E250-KARSON-150 | Vernier digital Karson 150 mm/6" (estuche + pila extra incluidos) | 1 | S/29.80; recibido/probado |
| TOOL-E250-CASCO-18 | Juego de 18 llaves combinadas Casco: 9 métricas 8, 9, 10, 11, 12, 13, 14, 17, 19 mm y 9 SAE 1/4, 5/16, 3/8, 7/16, 1/2, 9/16, 5/8, 11/16, 3/4" | **1 juego**, no 18 juegos | Visible en fotos anteriores; precio/ubicación actuales no verificados |
| TOOL-E250-ALICATE-PRESION | Alicate de presión | 1 | Visible en fotos; marca/precio por verificar |
| TOOL-E250-INGCO-PENDIENTE | Herramienta de mango negro/amarillo INGCO, posible destornillador/portapuntas | Sin cantidad confirmada | **Candidato a identificar; no sumar a stock físico** |
| TOOL-E250-RISCO-DA3100 | Pistola de tiempo/estroboscópica digital Risco DA-3100 | 1 declarada | Compra S/700 (fecha aproximada 28/08); ubicación pendiente |

El manómetro Fuelab es **componente de combustible del vehículo**, no una herramienta libre adicional. Las fotos del motor, cables azules, aro, batería, filtración de aire y estuches son evidencias, **no automáticamente nuevas compras**. Cada unidad debe conservar `owner`, `storage_location`, `evidence_status`, `purchase_date`, `receipt_ref` privado, `installed`, `inventory_confirmed` y `vehicle_id`.

### Sistema mecánico de la E250

1. **Motor y culatas:** asegurar que motor real convertido a 302 no se etiquete como 289 extra. Registro de pistones 4.030", cigüeñal de 302, balanceo 28/50 oz, flexplate original rajado, motor de arranque 9/11 dientes y orden de encendido son problemas de compatibilidad histórica; el estado final de cada especificación exige identificación física. Bujías: Champion RV12YC vieja, RV15YC4 ofrecida según aplicación Ford LTD 1981, ACDelco R42TS para prueba; no convertir una oferta de RV15YC4 o Autolite 26 en compra.
2. **Culata/pasador:** evaluar grietas y pérdida de material cerca del anclaje. Inspeccionar asiento, profundidad, diámetro y planitud antes de elegir BIG-SERT 5761G / 5761D o pernos ARP 154-3705. No usar la varilla/pasador provisional para justificar arrancar.
3. **Presión de cárter:** comprobar PCV/respiraderos, compresión/leak-down, aros y fugas de retenes/empaques. **El cárter no está diagnosticado como roto.**
4. **EFI:** distinguir piezas reportadas —bomba AEM 50-1000 340 LPH, regulador Fuelab con referencia a validar (53501-1K o 53601-1K), filtro 10 micras elemento 71801/cuerpo PQY y manómetro— de conjunto completo montado. Revisar línea de retorno, AN6/fittings, relé/fusible, polaridad, manguera sumergible certificada y estanqueidad; una manguera externa 5/16" EN1765 300 PSI **no equivale** a certificación sumergible.
5. **AOD:** caja mejorada instalada; verificar tipo/rosca efectiva de puertos de refrigeración, adaptadores, diámetro de líneas, TV cable y enfriamiento ATF. La mención a shift kit, servo A o cables concretos no acredita montaje hasta revisarlo.
6. **Carrocería y frenos:** buscar **marco frontal completo que sujeta parrilla y direccionales** específico Econoline 2004 (no la parrilla decorativa). Para frenos traseros el alcance solicitado son **discos solamente**; verificar aplicación y dimensiones antes de comprar.

### Estado económico para conciliar (importes del usuario, no auditoría contable)

- Cochera pagada reportada en 2026-10-13: S/62.50 + S/10 + S/4.50 = **S/77.00**. Tarifa futura S/10 noche y S/4.50 día. La noche pendiente **no es gasto pagado**.
- Vernier Karson: S/29.80, **corregido** desde mención anterior S/29.90; tanto `tool` como `expense` pueden referenciar la misma operación con `related_tool`, pero el desembolso debe computarse **una sola vez**.
- Risco DA-3100: S/700 declarados como compra de herramienta, comprobante por conciliar.
- AEM + Fuelab + filtro: S/2,350 reportados para el conjunto; **pago y desglose deben confirmarse** antes de agregar al acumulado de gastos pagados.
- Las llaves Casco, el alicate y el accesorio INGCO carecen de precio demostrado. **No imputar cero como costo real** ni sumar los precios publicados en USD de BIG-SERT, Fel-Pro u otros candidatos al total de inversiones.

### Reglas explícitas de conciliación/importación

1. La fuente de verdad para operaciones confirmadas es INFINITY privada; antes de importar, comparar `(kind,record_id)` con el servidor. Los ID estables evitan duplicación dentro de un mismo tipo, pero no detectan la misma compra archivada bajo otro ID: verificar manualmente `supplier + date + amount + item`.
2. Una ficha `tool` y una ficha `expense` de la misma compra son relaciones, no dos gastos. No declarar `paid:true` para un importe informado solo en negociación.
3. Para el historial y fotografías, distinguir `confirmed_user`, `photo_historical`, `inspection_pending`, `quoted_only`, `planned_only`. No confundir fotografías descritas con archivos ya cargados en la galería web.
4. No copiar a GitHub público recibos, pedidos individuales, nombres de cuentas, identificadores privados, imágenes de clientes o el archivo de staging. Publicar aquí solo el procedimiento y las conclusiones saneadas.
5. No sustituir el backend desde este repositorio: el código completo productivo no fue importado ni comparado con las fuentes públicas. Nunca ejecutar migraciones, pagos o compras automáticas para estos datos.
6. **Antes de declarar terminado:** confirmar API con sesión autorizada, verificar cada tipo y registro, inspeccionar UI móvil, comprobar total pagado sin duplicados y retener evidencia de conciliación. El staging verificado **no es** ejecución de importación.
