
const http = require('http');
const url = require('url');
const fs = require('fs');

const { insertar, consultar, editar, eliminar } = require('./consultasBD');

http.createServer(async (req, res) => {

    // RUTA RAIZ PARA CARGAR EL ARCHIVO index.html
    if (req.url == '/' && req.method == 'GET') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        const html = fs.readFileSync('./index.html', "utf8");
        res.end(html);
    }

    // RUTA POST PARA AGREGAR UNA NUEVA CANCIÓN
    if (req.url == '/cancion' && req.method == 'POST') {
        res.setHeader('Content-Type', 'application/json');
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        try {
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