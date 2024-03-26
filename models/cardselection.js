'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CardSelection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CardSelection.init({
    userId: DataTypes.INTEGER,
    cardId: DataTypes.INTEGER,
    selectionDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CardSelection',
  });
  return CardSelection;
};