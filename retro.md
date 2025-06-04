# Retrospectiva Sprint 1

## Estrella de Mar

### Comenzar a hacer
- Planificar con mayor profundidad tiempos por tarea.
- Documentar riesgos y posibles bloqueos desde el inicio.

### Hacer más
- Buscar referentes de UI/UX para inspirar el diseño.
- Iterar bocetos en digital para probar quick feedback.

### Continuar haciendo
- Definir temática y público objetivo antes de codear.
- Crear repositorio y estructura de carpetas desde el inicio.

### Hacer menos
- Cambios de tema de diseño a último momento.
- Saltarse la revisión de wireframes antes de avanzar.

### Dejar de hacer
- Trabajar sin tablero de tareas ni retrospectiva.
- Subir imágenes sin versionado claro en carpeta correspondiente.

# Retrospectiva Sprint 2

## Estrella de Mar

### Comenzar a hacer
- Definir criterios de “listo” (DoD) para cada historia de usuario.  
- Probar enlaces de navegación en móvil/emulación.

### Hacer más
- Revisar consistencia de estilos CSS entre páginas.  
- Escribir pequeños tests manuales (checklist) para validar cada vista.

### Continuar haciendo
- Retro al final de cada sprint.  
- Mantener la estructura MVC desde el inicio.

### Hacer menos
- Cambios de diseño directo en HTML sin actualizar el CSS global.  
- Codificar sin tickets asignados en el tablero.

### Dejar de hacer
- Subir archivos HTML desactualizados.  
- Olvidar actualizar `README.md` con nuevos enlaces.

# Retrospectiva Sprint 3

## Estrella de Mar

### Comenzar a hacer
- Añadir validaciones básicas al crear o editar (front/back).  
- Probar navegación con EJS partials en rutas anidadas.

### Hacer más
- Escribir ejemplos de datos de prueba en JSON.  
- Verificar estados “vacío” (sin productos, sin usuario logueado).

### Continuar haciendo
- Mantener partials DRY (no repetir head/footer).  
- Documentar cada controlador.

### Hacer menos
- Usar `res.sendFile` para vistas estáticas.  
- Mezclar lógica de datos y presentación.

### Dejar de hacer
- Asumir que los datos existen sin “mockearlos”.  
- Subir JSON vacíos sin ejemplos representativos.

# Retrospectiva Sprint 4

## Estrella de Mar

### Comenzar a hacer
- Probar flujos de registro y login con distintos navegadores.  
- Documentar estructuras JSON de `users.json`.

### Hacer más
- Verificar persistencia de datos tras reinicios del servidor.  
- Añadir mensajes de éxito/error en los formularios.

### Continuar haciendo
- Mantener controladores bien comentados.  
- Refrescar el tablero al inicio de cada sprint.

### Hacer menos
- Asumir que `req.file` siempre existe.  
- Olvidar manejar errores de lectura/escritura de JSON.

### Dejar de hacer
- No limpiar cookies tras logout.  
- Mezclar lógica de sesión en controladores de datos.

# Retrospectiva Sprint 6

## Estrella de Mar

### Comenzar a hacer
- Documentar claramente criterios de validación (mínimos y máximos).
- Probar casos límite (e.g., cadenas vacías, contraseñas muy cortas).

### Hacer más
- Añadir mensajes de error legibles en las vistas.
- Agregar validación de campos únicos (email, nombre de producto).

### Continuar haciendo
- Mantener la sincronización de Sequelize con la base de datos.
- Refrescar tablero antes de iniciar el sprint.

### Hacer menos
- Depender exclusivamente de validaciones del back-end.
- Olvidar la validación del front-end para mejorar UX.

### Dejar de hacer
- No manejar los errores de validación y dejar que la app caiga.
- Exponer detalles internos de la base de datos en los mensajes de error.
