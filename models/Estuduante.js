// define la estructura de la tabla estudiantes
// Sequelize crea automáticamente la tabla si no existe
// cada propiedad se mapea como una columna en mysql

const { DataTypes } = require('sequelize'); 
// CORREGIDO: Se agregaron dos puntos más (../../) para poder salir correctamente de controllers/models
const { sequelize } = require('../config/database');

const Estudiante = sequelize.define('Estudiante', {
    // el id es auto incremental y es primary key
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    // nombre del estudiante
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El nombre no puede estar vacío' },
            len: { args: [2, 100], msg: 'El nombre debe tener entre 2 y 100 caracteres' }
        }
    },
    // apellido del estudiante
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El apellido no puede estar vacío' },
            len: { args: [2, 100], msg: 'El apellido debe tener entre 2 y 100 caracteres' }
        }
    },
    // Email del estudiante
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: { msg: 'El email ya existe en la base de datos' },
        validate: {
            notEmpty: { msg: 'El email no puede estar vacío' },
            isEmail: { msg: 'Debe ser un email válido' }
        }
    },
    // edad del estudiante
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: { args: [1], msg: 'La edad no puede ser negativa o cero' }, // Corregido aquí
            max: { args: [120], msg: 'La edad ingresada no es válida' }      // Corregido aquí
        }
    },
    // carrera del estudiante
    carrera: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'Sin definir'
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    // opciones adicionales del modelo
    tableName: 'estudiantes',
    timestamps: true,
    underscored: true // hace que use created_at y updated_at
});

module.exports = Estudiante;