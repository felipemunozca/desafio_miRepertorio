
const { Pool } = require('pg');
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

const pool = new Pool(config);

const insertar = async (datos) => {
    const consulta = {
        text: "INSERT INTO repertorio (cancion, artista, tono) values($1, $2, $3) RETURNING *;",
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
}

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

module.exports = { insertar, consultar, editar, eliminar};
