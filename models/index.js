'use strict';
import mysql2 from 'mysql2';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
if(config.dialect === "mysql"){
  config.dialectModule = mysql2
}

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//Importar modelos
import user from './user';
import card from './card';
import cardselection from './cardselection';


db.User = user(sequelize, Sequelize.DataTypes);
db.Card = card(sequelize, Sequelize.DataTypes);
db.CardSelection = cardselection(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
