const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API CRUD Estudiante",
            version: "1.0.0",
            description: "API REST para el CRUD de Estudiantes",
            contact: {
                name: "Andres Mosquera",
                email: "jufepepa@gmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor de desarrollo local"
            }
        ],
        components: {
            schemas: {
                // Esquema Principal: Estudiante
                Estudiante: {
                    type: "object",
                    required: ["nombre", "apellido", "email", "carrera"],
                    properties: {
                        id: {
                            type: "integer",
                            description: "Identificador único del estudiante",
                            example: 1
                        },
                        nombre: {
                            type: "string",
                            description: "Nombre del estudiante",
                            example: "Juan"
                        },
                        apellido: {
                            type: "string",
                            description: "Apellido del estudiante",
                            example: "Pérez"
                        },
                        email: {
                            type: "string",
                            description: "Correo electrónico",
                            example: "juan.perez@email.com"
                        },
                        carrera: {
                            type: "string",
                            description: "Carrera que cursa",
                            example: "Análisis y Desarrollo de Software"
                        },
                        edad: {
                            type: "integer",
                            description: "Edad del estudiante (opcional)",
                            example: 22,
                            nullable: true
                        },
                        activo: {
                            type: "boolean",
                            description: "Estado del estudiante (opcional)",
                            example: true,
                            nullable: true
                        },
                        created_at: {
                            type: "string",
                            format: "date-time",
                            description: "Fecha de creación del registro",
                            example: "2023-01-01T00:00:00.000Z",
                            nullable: true
                        },
                        updated_at: {
                            type: "string",
                            format: "date-time",
                            description: "Fecha última de actualización del estudiante",
                            example: "2023-01-02T10:30:00.000Z",
                            nullable: true
                        }
                    }
                },
                // Esquema de Error de Validación (400)
                ErrorValidacion: {
                    type: "object",
                    properties: {
                        exito: { 
                            type: "boolean", 
                            example: false 
                        },
                        mensaje: { 
                            type: "string", 
                            example: "Error de validación" 
                        },
                        errores: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            example: ["El campo nombre es requerido"]
                        }
                    }
                },
                // Esquema de Error No Encontrado (404)
                ErrorNoEncontrado: {
                    type: "object",
                    properties: {
                        exito: { 
                            type: "boolean", 
                            example: false 
                        },
                        mensaje: { 
                            type: "string", 
                            example: "Estudiante no encontrado" 
                        }
                    }
                }
            }
        }
    },
    // Rutas donde swagger-jsdoc buscará las anotaciones @swagger
    apis: ["./routes/*.js", "./controllers/*.js"]
};

// Generar las especificaciones de Swagger
const specs = swaggerJsdoc(options);

// Exportar los módulos para usarlos en server.js o app.js
module.exports = {
    swaggerUi,
    specs
};