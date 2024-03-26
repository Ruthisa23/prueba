import db from "../../../../models"; // Asegúrate de importar el modelo de base de datos correctamente
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getUsers(req, res);
    case "POST":
      return createUser(req, res);
    case "PUT":
        return updateUser(req, res);
    case "DELETE":
        return deleteUser(req, res);
    default:
      res.status(400).json({ error: true, message: "Petición errónea" });
  }
}

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
      const users = await db.User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: true, message: "Error al obtener usuarios" });
    }
  };
  
  // Crear un nuevo usuario
  const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
      // Verificar si el usuario ya existe
      const existingUser = await db.User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: true, message: "El usuario ya existe" });
      }
  
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear el usuario
      const newUser = await db.User.create({ username, email, password: hashedPassword });
  
      res.status(201).json({ message: "Usuario creado exitosamente", user: newUser });
    } catch (error) {
      res.status(500).json({ error: true, message: "Error al crear usuario" });
    }
  };
  
  // Actualizar un usuario existente
  const updateUser = async (req, res) => {
    const { id } = req.query;
    const { username, email, password } = req.body;
  
    try {
      // Verificar si el usuario existe
      const existingUser = await db.User.findByPk(id);
      if (!existingUser) {
        return res.status(404).json({ error: true, message: "El usuario no existe" });
      }
  
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Actualizar el usuario
      await existingUser.update({ username, email, password: hashedPassword });
  
      res.json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: true, message: "Error al actualizar usuario" });
    }
  };
  
  // Eliminar un usuario existente
  const deleteUser = async (req, res) => {
    const { id } = req.query;
  
    try {
      // Verificar si el usuario existe
      const existingUser = await db.User.findByPk(id);
      if (!existingUser) {
        return res.status(404).json({ error: true, message: "El usuario no existe" });
      }
  
      // Eliminar el usuario
      await existingUser.destroy();
  
      res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: true, message: "Error al eliminar usuario" });
    }
  };
