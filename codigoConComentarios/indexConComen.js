/**
 * Iniciar el proyecto npm
 * > npm init -y
 * 
 * Instalar el paquete cursor
 * > npm i pg-cursor
 * 
 * Instalar el paquete nodemon como dependencia de desarrollo
 * > npm i nodemon -D
 * 
 * Crear una nueva base de datos llamada repertorio
 * CREATE DATABASE repertorio ;
 * 
 * Crear una nueva tabla en la base de datos llamada repertorio
 * CREATE TABLE repertorio (
        id SERIAL, 
        cancion VARCHAR(50), 
        artista VARCHAR(50), 
        tono VARCHAR(10)
    );
 * 
 * Comenzar a programar el desafio:
 */

    const http = require('http');
    const url = require('url');
    const fs = require('fs');
    
    /* llamo las funciones creadas en consultasBD.js */
    const { insertar, consultar, editar, eliminar } = require('./consultasBD');
    
    /* Se crea el servidor. */
    http.createServer(async (req, res) => {
    
        // RUTA RAIZ PARA CARGAR EL ARCHIVO index.html
        /* se le da un codigo de estado 200 para indicar que todo esta OK. */
        /* se utiliza file system para leer de forma sincrona el archivo y el formato. */
        if (req.url == '/' && req.method == 'GET') {
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            const html = fs.readFileSync('./index.html', "utf8");
            res.end(html);
        }
    
        // RUTA POST PARA AGREGAR UNA NUEVA CANCIÓN
        /* se crea una variable body igual vacio, donde se agregara la informacion enviada desde el formulario. */
        /* on() es un metodo que me permite escuchar. Se utiliza para escuchar si se envia data desde el formulario */
        /* chunk se traduce como trozo o pedazo, es un estandar utilizado para indicar que se recibira la data por partes. */
        if (req.url == '/cancion' && req.method == 'POST') {
            res.setHeader('Content-Type', 'application/json');
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
    
            try {
                /* se agrega un codigo de estado 201 para indicar que se ha creado un nuevo recurso. */
                req.on('end', async () => {
                    const datos = Object.values(JSON.parse(body));
                    const respuesta = await insertar(datos);
                    res.statusCode = 201;
                    res.end(JSON.stringify(respuesta));
                });
            } catch (error) {
                console.log("Se produjo un error al agregar una canción.");
                console.log(error);
            }
        }
    
        // RUTA GET PARA LISTAR TODAS LAS CANCIONES QUE ESTAN GUARDADAS EN LA BASE DE DATOS.
        /* se agrega un codigo de estado 200 para indicar que todo esta OK. */
        /* utilizando la propiedad rows, se logra imprimir la respuesta de la BD en el formulario html. */
        if (req.url == '/canciones' && req.method == 'GET') {
            res.setHeader('Content-Type', 'application/json');
            
            try {
                const respuesta = await consultar();
                res.statusCode = 200;
                res.end(JSON.stringify(respuesta.rows));
            } catch (error) {
                console.log("Se produjo un error al imprimir la lista de canciones en el formulario.");
                console.log(error);
            }
        }
    
        // RUTA PUT PARA EDITAR UNA CANCIÓN DE LA LISTA.
        if (req.url == '/cancion' && req.method == 'PUT') {
            res.setHeader('Content-Type', 'application/json');
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
    
            try {
                /* se realiza un cambio en el archivo index.html, para poder recibir el id dentro de la variable datos. Linea 171. */
                req.on('end', async () => {
                    const datos = Object.values(JSON.parse(body));
                    const respuesta = await editar( datos );
                    res.statusCode = 201;
                    res.end(JSON.stringify(respuesta));
                });
            } catch (error) {
                console.log("Se produjo un error al editar una canción de la lista.");
                console.log(error);
            }
        }
    
        // RUTA DELETE PARA ELIMINAR UNA CANCION DE LA LISTA.
        /* se recibe la url por el endpoint para eliminar solo la cancion en la cual se presiono el boton. */
        if (req.url.startsWith('/cancion?') && req.method == 'DELETE') {
            const { id } = url.parse(req.url, true).query;
    
            try {
                const respuesta = await eliminar(id);
                res.statusCode = 200;
                res.end(JSON.stringify(respuesta));
            } catch (error) {
                console.log("Error al intentar eliminar una canción.");
                console.log(error);
            }
        }
    
    }).listen(3000, console.log("Servidor corriendo en http://localhost:3000/"))