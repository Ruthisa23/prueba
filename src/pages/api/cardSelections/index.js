import db from "../../../../models";
import { Op } from "sequelize";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return listCardSelections(req, res);
    case "POST":
      return addCardSelection(req, res);
    case "PUT":
      return editCardSelection(req, res);
    case "DELETE":
      return deleteCardSelection(req, res);
    default:
      res.status(400).json({ error: true, message: "Petición errónea" });
  }
}

// Obtener todas las selecciones de cartas
const listCardSelections = async (req, res) => {
  try {
    const cardSelections = await db.CardSelection.findAll();
    return res.json(cardSelections);
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: `Ocurrió un error al procesar la petición: ${error.message}`,
    });
  }
};

// Agregar una nueva selección de carta
const addCardSelection = async (req, res) => {
  const cardSelectionData = { ...req.body };

  try {
    const cardSelection = await db.CardSelection.create(cardSelectionData);
    return res.json({ message: "La selección de carta ha sido agregada.", cardSelection });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: `Ocurrió un error al procesar la información: ${error.message}`,
    });
  }
};

// Editar una selección de carta existente
const editCardSelection = async (req, res) => {
  const { id } = req.query;
  const cardSelectionData = { ...req.body };

  try {
    await db.CardSelection.update(cardSelectionData, { where: { id } });
    return res.json({ message: "La selección de carta ha sido actualizada." });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: `Ocurrió un error al procesar la información: ${error.message}`,
    });
  }
};

// Eliminar una sele
