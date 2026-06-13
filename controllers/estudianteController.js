/**
 * Controlador de Estudiantes
 * Contiene la lógica de negocio para interactuar con el modelo Estudiante
 * y responder a las peticiones HTTP del cliente (API REST).
 */

const Estudiante = require("../models/Estuduante");

/**
 * MÉTODOS DEL CRUD
 */

/**
 * 1. OBTENER TODOS LOS ESTUDIANTES
 * Devuelve la lista completa de estudiantes registrados en la base de datos,
 * ordenados desde el más reciente hasta el más antiguo según su fecha de creación.
 */
const obtenerTodos = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll({
      order: [["createdAt", "DESC"]],
    });
    
    res.status(200).json({
      exito: true,
      cantidad: estudiantes.length,
      data: estudiantes,
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: "Error al obtener los estudiantes",
    });
  }
};

/**
 * 2. OBTENER UN ESTUDIANTE POR ID
 * Busca un único estudiante utilizando su llave primaria (ID).
 * Si el estudiante no existe, responde con un código de estado 404 (No encontrado).
 */
const obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await Estudiante.findByPk(id);
    
    if (!estudiante) {
      return res.status(404).json({
        exito: false,
        mensaje: `Estudiante con ID ${id} no encontrado`,
      });
    }
    
    res.status(200).json({
      exito: true,
      data: estudiante,
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      mensaje: "Error al obtener el estudiante",
      error: error.message,
    });
  }
};

/**
 * 3. CREAR UN NUEVO ESTUDIANTE
 * Extrae los datos enviados en el cuerpo de la petición (req.body) e inserta
 * un nuevo registro en la base de datos. Incluye validación interna de Sequelize
 * para detectar datos repetidos (como el email) o vacíos.
 */
const crear = async (req, res) => {
  try {
    const { nombre, apellido, email, edad, carrera } = req.body;
    
    const nuevoEstudiante = await Estudiante.create({
      nombre,
      apellido,
      email,
      edad,
      carrera,
    });
    
    res.status(201).json({
      exito: true,
      mensaje: "Estudiante creado exitosamente",
      data: nuevoEstudiante,
    });
  } catch (error) {
    // Captura errores específicos de validación de Sequelize (campos vacíos, formato email, etc.)
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({
        exito: false,
        mensaje: "Error de validación",
        error: error.errors.map((err) => err.message),
      });
    }
    
    res.status(500).json({
      exito: false,
      mensaje: "Error al crear el estudiante",
      error: error.message,
    });
  }
};

/**
 * 4. ACTUALIZAR UN ESTUDIANTE EXISTENTE
 * Busca al estudiante por su ID, y si existe, modifica los campos enviados
 * en el cuerpo de la petición. Aplica nuevamente las validaciones estructurales de la DB.
 */
const actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, edad, carrera, activo } = req.body;
    
    const estudiante = await Estudiante.findByPk(id);
    if (!estudiante) {
      return res.status(404).json({
        exito: false,
        mensaje: `Estudiante con ID ${id} no encontrado`,
      });
    }
    
    // Actualiza las propiedades en la base de datos
    await estudiante.update({
      nombre,
      apellido,
      email,
      edad,
      carrera,
      activo,
    });
    
    res.status(200).json({
      exito: true,
      mensaje: `Estudiante con ID ${id} actualizado`,
      data: estudiante,
    });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({
        exito: false,
        mensaje: "Error de validación",
        error: error.errors.map((err) => err.message),
      });
    }
    
    res.status(500).json({
      exito: false,
      mensaje: "Error al actualizar estudiante",
      error: error.message,
    });
  }
};

/**
 * 5. ELIMINAR UN ESTUDIANTE
 * Busca un registro por su ID y lo remueve físicamente de la base de datos (DELETE).
 * Al finalizar, retorna en el mensaje informativo el nombre completo del alumno eliminado.
 */
const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await Estudiante.findByPk(id);
    
    if (!estudiante) {
      return res.status(404).json({
        exito: false,
        mensaje: `Estudiante con ID ${id} no encontrado`,
      });
    }

    await estudiante.destroy();
    
    res.status(200).json({
      exito: true,
      mensaje: `Estudiante ${estudiante.nombre} ${estudiante.apellido} eliminado correctamente`,
      data: estudiante
    });
  } catch (err) {
    res.status(500).json({
      exito: false,
      mensaje: "Error al eliminar el estudiante",
      error: err.message,
    });
  }
};

// Exportación de todas las funciones para que puedan ser utilizadas por el enrutador
module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};