# Mapa de Bicicletas #

Este proyecto es una plataforma para la gestion de información para biciusuarios

### Versión:

*   0.0.1

### En que consiste ? ###

* Plataforma para la gestión de reserva de bicicletas, continen mapas con ubicacioón de las bicicletas.

### ¿ Como correrlo ? ###

* Configurar las variables de entorno
    - Crear archivo .env `$ cat .env.example > .env`
    - Modificar la URL de la base de datos en el capo 'MONGODB_URL' del archivo .env
* Ejecutar los test con jasmine `$ npm test`
* Correr en modo desarollo `$ npm run dev`