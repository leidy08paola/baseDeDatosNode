
// definimos los endpoints

const express = require('express')
const router = express.Router();

// importamos el controlador

const estudianteController = require('../controllers/estudianteController');

// GET / API/estudiantes
// listar todos

router.get('/',estudianteController.obtenerTodos);

// ───────────────────────────────────────────────────────────
// GET /estudiantes → Listar todos los estudiantes
// ───────────────────────────────────────────────────────────
/**
 * @swagger
 * /estudiantes:
 *   get:
 *     summary: Listar todos los estudiantes
 *     description: Obtiene la lista completa de estudiantes ordenados por fecha de creación (más recientes primero).
 *     tags: [Estudiantes]
 *     responses:
 *       200:
 *         description: Lista de estudiantes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito: { type: boolean, example: true }
 *                 cantidad: { type: integer, example: 5 }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Estudiante'
 *       500:
 *         description: Error interno del servidor
 */


router.get('/', estudianteController.obtenerTodos);

// ───────────────────────────────────────────────────────────
// GET /estudiantes/{id} → Obtener estudiante por ID
// ───────────────────────────────────────────────────────────
/**
 * @swagger
 * /estudiantes/{id}:
 *   get:
 *     summary: Obtener un estudiante por ID
 *     description: Busca un estudiante específico mediante su ID numérico.
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del estudiante a buscar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Estudiante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/Estudiante'
 *       404:
 *         description: Estudiante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorNoEncontrado'
 *       500:
 *         description: Error interno del servidor
 */



// GET /api/estudiantes/:id

router.get('/:id',estudianteController.obtenerPorId);

// ───────────────────────────────────────────────────────────
// POST /estudiantes → Crear nuevo estudiante
// ───────────────────────────────────────────────────────────
/**
 * @swagger
 * /estudiantes:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     description: Registra un nuevo estudiante en la base de datos. El email debe ser único.
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       description: Datos del estudiante a crear
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, apellido, email, carrera]
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "María"
 *                 description: Nombre del estudiante (2-100 caracteres)
 *               apellido:
 *                 type: string
 *                 example: "González"
 *                 description: Apellido del estudiante
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "maria.gonzalez@example.com"
 *                 description: Correo electrónico único
 *               edad:
 *                 type: integer
 *                 example: 20
 *                 description: Edad opcional (0-120)
 *               carrera:
 *                 type: string
 *                 example: "Medicina"
 *                 description: Programa académico
 *     responses:
 *       201:
 *         description: Estudiante creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito: { type: boolean, example: true }
 *                 mensaje: { type: string, example: "Estudiante creado exitosamente" }
 *                 data:
 *                   $ref: '#/components/schemas/Estudiante'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorValidacion'
 *       500:
 *         description: Error interno del servidor
 */


//POST / API/estudiantes
router.post('/',estudianteController.crear);

// ───────────────────────────────────────────────────────────
// PUT /estudiantes/{id} → Actualizar estudiante
// ───────────────────────────────────────────────────────────
/**
 * @swagger
 * /estudiantes/{id}:
 *   put:
 *     summary: Actualizar un estudiante completo
 *     description: Modifica todos los campos de un estudiante existente. Se requieren todos los campos obligatorios.
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del estudiante a actualizar
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, apellido, email, carrera, activo]
 *             properties:
 *               nombre: { type: string, example: "María Elena" }
 *               apellido: { type: string, example: "González Ruiz" }
 *               email: { type: string, example: "maria.gonzalez@example.com" }
 *               edad: { type: integer, example: 21 }
 *               carrera: { type: string, example: "Enfermería" }
 *               activo: { type: boolean, example: true }
 *     responses:
 *       200:
 *         description: Estudiante actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error interno del servidor
 */


// put /api/estudiante/id
router.put('/:id',estudianteController.actualizar);

// ───────────────────────────────────────────────────────────
// DELETE /estudiantes/{id} → Eliminar estudiante
// ───────────────────────────────────────────────────────────
/**
 * @swagger
 * /estudiantes/{id}:
 *   delete:
 *     summary: Eliminar un estudiante
 *     description: Elimina permanentemente un estudiante de la base de datos.
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del estudiante a eliminar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Estudiante eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exito: { type: boolean, example: true }
 *                 mensaje: { type: string, example: "Estudiante María González eliminado correctamente" }
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error interno del servidor
 */


// delete /api/ estudiantes/:id

router.delete('/id',estudianteController.eliminar);

module.exports= router;

