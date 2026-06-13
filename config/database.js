// configuracion  conexion mediante sequelize

// actuaa como orm : objectos  JS consultas

require('dotenv').config();

const { Sequelize } = require('sequelize');

// crear una instancia de sequelize con los datos de .env

const sequelize = new Sequelize(
    process.env.DB_NAME || 'crud_estudiantes' ,// nombre de la base de datos
    process.env.DB_USER || 'root', // usuario
    process.env.DB_PASSWORD || '', // contraseña
    {
        host: process.env.DB_HOST || 'localhost', // host
        port: process.env.DB_PORT || '3306', // puerto
        dialect: 'mysql', // tipo de base de datos
        logging: false, // desactivar logging de consultas

    }
    
);

// fucion para verificar la conexion a la base de datos

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

module.exports = {
    sequelize,
    testConnection
};