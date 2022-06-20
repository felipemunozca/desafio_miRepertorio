
/* Se utiliza un destructoring para llamar a la clase Pool */
const { Pool } = require('pg');
/* Se llama a la Clase Cursor, por eso la primera letra es con mayuscula. */
const Cursor = require('pg-cursor');

const config = {
    user: 'felipe',
    host: 'localhost',
    password: '123456',
    database: 'repertorio',
    port: '5432',
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
}

/* se crea una nueva constante llamada pool a la cual se le asignan los valores de la clase Pool y 
la configuracion para la conexion a la base de datos. */
const pool = new Pool(config);


/* función asíncrona que recibe los datos desde index.js y los inserta en la BD. */
/* text: sera la consulta SQL escrita en formato parametrizado utilizando un valor numerico junto al signo peso $. */
/* es una buena practica para evitar inyecciones SQL.
/* values: seran los datos que se enviaron desde el formulario a index.js y luego son resividos en esta funcion. */
/* los datos deben ser ordenados según como se declaro la consulta.*/
const insertar = async (datos) => {
    const consulta = {
        text: "INSERT INTO repertorio (cancion, artista, tono) values($1, $2, $3) RETURNING *;",
        values: datos,
    };

    /* utilizando await, se espera que se cumpla la consulta antes de continuar. */
    /* en el caso en que se produsca un error, el catch lo atrapa, y por consola, se imprimira el codigo y el mensaje de dicho error. */
    try {
        const result = await pool.query(consulta);
        return result; 

    } catch (error) {
        console.log(error.code);
        console.log(error.message);
        return error; 
    }
}

/* Función asíncrona para seleccionar todos los registros de la BD */
const consultar = async () =>{
    const consulta = {
        text: "SELECT * FROM repertorio;"
    };

    try {
        const result = await pool.query(consulta);
        return result;

    } catch (error) {
        console.log(error.code);
        console.log(error.message);
        return error; 
    }
}

/* Función asíncrona para editar un registro de la BD */
/* ya que los datos son enviados en el formato [ id, cancion, artista, tono ] 
se deben declarar en el orden que se reciben para realizar la consulta. */
const editar = async (datos) => {
    const consulta = {
        text: "UPDATE repertorio SET cancion = $2, artista = $3, tono = $4 WHERE id = $1 RETURNING *;",
        values: datos,
    };

    try {
        const result = await pool.query(consulta);
        return result;

    } catch (error) {
        console.log(error.code);
        console.log(error.message);
        return error; 
    }
};

/* Función asíncrona para eliminar un registro de la BD */
/* para eliminar una cancion, solo es necesario recibir el id. */
/* se debe crear la consulta utilizando directamente el id, ya que al hacerlo como en los ejemplos de arriba, no se lee dicho id. */
const eliminar = async (id) => {
    const consulta = {
        text: `DELETE FROM repertorio WHERE id = ${id} RETURNING *;`,
    };

    try {
        const result = await pool.query(consulta);
        return result;
    } catch (error) {
        console.log(error.code);
        console.log(error.message);
        return error;
    }
}


/* Se exportan las funciones para ser utilizadas por otros archivos. */
module.exports = { insertar, consultar, editar, eliminar};
