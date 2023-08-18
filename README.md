# Bingo Project

API para generar tarjetas de bingo, llamar números y verificar el bingo. 

## Requisitos

- [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/).
- Instancia de [PostgreSQL](https://www.postgresql.org/download/) en ejecución y configurada.
- Instancia de [Redis](https://redis.io/download) en ejecución y configurada.

## Instalación

Para instalar las dependencias del proyecto, ejecuta:

````npm install````

## Configuración de la Base de Datos

Para crear las tablas y estructuras necesarias en PostgreSQL:

Conéctate a tu instancia PostgreSQL.
Ejecuta el script SQL que se encuentra en el archivo db/script.sql.

````psql -U <usuario> -d <bd> -a -f script.sql````

Reemplaza <usuario> y <bd> con tus datos de PostgreSQL

## Ejecución del Proyecto

Para correr el proyecto localmente:

````serverless offline````

## Pruebas
Para ejecutar las pruebas unitarias:

````npm test````

## Documentación

### Verificar Bingo
Método: POST
URL: http://localhost:3000/dev/check-bingo
Headers: Content-Type: application/json
Body (JSON):

```json
{
    "card": {
        "B": [/* números */],
        "I": [/* números */],
        "N": [/* números */],
        "G": [/* números */],
        "O": [/* números */]
    },
    "calledNumbers": [/* números llamados */]
}
```

### Obtener una nueva tarjeta de Bingo
Método: GET
URL: http://localhost:3000/dev/card

### Llamar al siguiente número
Método: GET
URL: http://localhost:3000/dev/call-number
Nota: Asegúrate de reemplazar {gameId} con el ID del juego que estás utilizando.

