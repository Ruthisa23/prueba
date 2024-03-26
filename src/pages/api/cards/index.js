import db from "../../../../models";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return listCards(req, res);
    case "POST":
      return addCard(req, res);
    case "PUT":
      return updateCard(req, res);
    case "DELETE":
      return deleteCard(req, res);
    default:
      res.status(400).json({ error: true, message: "Petición errónea" });
  }
}

// Obtener todas las cartas
const listCards = async (req, res) => {
  try {
    const cards = await db.Card.findAll();
    return res.status(200).json(cards);
  } catch (error) {
    return res.status(500).json({ error: true, message: "Error al obtener las cartas" });
  }
};

// Agregar una nueva carta
const addCard = async (req, res) => {
  const { title, imageUrl } = req.body;

  try {
    const newCard = await db.Card.create({ title, imageUrl });
    return res.status(201).json(newCard);
  } catch (error) {
    return res.status(500).json({ error: true, message: "Error al agregar la carta" });
  }
};

// Actualizar una carta existente
const updateCard = async (req, res) => {
  const { id } = req.query;
  const { title, imageUrl } = req.body;

  try {
    const updatedCard = await db.Card.update(
      { title, imageUrl },
      { where: { id } }
    );
    if (updatedCard[0] === 1) {
      return res.status(200).json({ message: "Carta actualizada correctamente" });
    } else {
      return res.status(404).json({ error: true, message: "Carta no encontrada" });
    }
  } catch (error) {
    return res.status(500).json({ error: true, message: "Error al actualizar la carta" });
  }
};

// Eliminar una carta
const deleteCard = async (req, res) => {
  const { id } = req.query;

  try {
    const deletedRows = await db.Card.destroy({ where: { id } });
    if (deletedRows === 1) {
      return res.status(200).json({ message: "Carta eliminada correctamente" });
    } else {
      return res.status(404).json({ error: true, message: "Carta no encontrada" });
    }
  } catch (error) {
    return res.status(500).json({ error: true, message: "Error al eliminar la carta" });
  }
};
