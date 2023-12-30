// models/index.ts

import fs from "fs/promises";
import path from "path";
import { Sequelize, DataTypes, Options } from "sequelize";
import process from "process";

interface DbConfig {
  [env: string]: {
    database: string;
    username: string;
    password: string;
    host: string;
    dialect: string;
    // Add other necessary properties
  };
  // Add other environments...
}

let sequelize: Sequelize;
const db: Record<string, any> = {};

async function init() {
  const basename = path.basename(__filename);
  const env = process.env.NODE_ENV || "development";
  const config = (await import(path.join(__dirname, "/../config/config.json")))
    .default as DbConfig;

  const { database, username, password, ...options } = config[env] || {};

  // Check if password is defined before passing it to Sequelize constructor
  sequelize = new Sequelize(
    database!,
    username!,
    password || "", // Default to an empty string if password is undefined
    options as Options
  );

  const files = await fs.readdir(__dirname);
  for (const file of files.filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
  )) {
    const model = (await import(path.join(__dirname, file))).default(
      sequelize,
      DataTypes
    );
    db[model.name] = model;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
}

init();

export default db;
