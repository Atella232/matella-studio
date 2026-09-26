# DBH2 Zatikiak V2 — criterios para sustituir la unidad actual

La ruta pública `/matematika/dbh2/zatikiak` no se sustituirá ni enlazará con la V2 hasta que todos los bloques estén completos y exista una aprobación explícita.

## 1. Aislamiento

- [x] La V2 vive en una carpeta propia.
- [x] La V2 tiene una ruta interna no enlazada: `/prototipo/zatikiak-v2`.
- [x] Su progreso utiliza claves de almacenamiento distintas.
- [x] La versión pública no importa componentes ni datos de la V2.

## 2. Corrección matemática

- [x] Existe un único núcleo para normalizar, comparar y operar con fracciones con signo.
- [x] Las respuestas aceptan fracciones equivalentes y decimales con coma o punto.
- [x] Se aceptan cifras arábigas orientales.
- [x] Las aproximaciones decimales no se presentan como igualdades exactas.
- [x] El reto de la receta acepta `5/3`.
- [x] El reto final usa datos coherentes: quedan 1800 L y el depósito inicial es 6000 L.
- [x] Hay pruebas para signos, equivalencias, localización, impropias y el reto final.
- [x] Auditar individualmente todos los ejercicios, retos y rondas de juego migrados.
- [x] Añadir pruebas de propiedades aritméticas sobre un dominio denso de racionales con signo.

## 3. Ruta pedagógica

- [x] Hay una secuencia recomendada visible.
- [x] La teoría se divide en etapas cortas con objetivo explícito.
- [x] La práctica sigue el orden intento → pista → explicación.
- [x] Se guarda el progreso en el dispositivo.
- [x] Incorporar un diagnóstico inicial de seis preguntas sin calificación.
- [x] Completar la práctica interactiva de cada bloque curricular.
- [x] Añadir feedback específico para los errores más frecuentes.
- [x] Incorporar actividades de estimación, precisión y explicación del razonamiento.

## 4. Paridad funcional

- [x] Portada y ruta de aprendizaje.
- [x] Doce temas de teoría organizados en cinco bloques curriculares.
- [x] Siete laboratorios exactos de representación, equivalencia, operaciones y proporcionalidad.
- [x] Diez actividades de práctica guiada interactiva.
- [x] Doce retos contextualizados y corregidos.
- [x] Cuatro modos de juego con cálculo exacto.
- [x] Migrar y revisar el banco completo de 42 ejercicios.
- [x] Completar tres experiencias de juego originales más equivalencias rápidas.
- [x] Revisar los laboratorios actuales: se conservan seis corregidos y se añade proporcionalidad.

## 5. Accesibilidad e idiomas

- [x] Los elementos interactivos iniciales usan botones, etiquetas y estados accesibles.
- [x] El documento actualiza `lang` y `dir` para euskera, castellano y árabe.
- [x] La navegación funciona sin depender de tarjetas `div` clicables.
- [x] Se respeta `prefers-reduced-motion`.
- [x] Recorrido completo con controles semánticos y navegación por teclado en pestañas.
- [x] Revisión del árbol accesible sin respuestas de memoria ocultas expuestas.
- [x] Revisión editorial completa de euskera con terminología curricular oficial.
- [x] Revisión editorial completa de árabe, RTL y dirección LTR aislada para las fórmulas.
- [x] Contraste AA comprobado para los colores de texto y estados principales.

## 6. Diseño adaptable y calidad

- [x] La cabecera móvil no es fija ni bloquea una cuarta parte de la pantalla.
- [x] La navegación y las herramientas se compactan en pantallas pequeñas.
- [x] Revisar las secciones a 390, 768, 1024 y 1440 píxeles.
- [x] Probar zoom real del navegador al 200 %.
- [x] Comprobar que no existen saltos de contenido ni desbordamientos horizontales.
- [x] Medir rendimiento y cargar la V2 de forma diferida en un paquete independiente.
- [x] Completar una sesión real de principio a fin sin errores de consola.

## 7. Puerta de sustitución

- [x] Todos los criterios técnicos y de contenido anteriores están completos.
- [x] Comparación lado a lado entre la unidad actual y la V2.
- [x] Revisión pedagógica y lingüística final.
- [ ] Aprobación explícita del propietario del proyecto.
- [ ] Copia de seguridad o punto de restauración antes del cambio de rutas.
- [ ] Sustitución de la ruta pública y prueba final posterior.
