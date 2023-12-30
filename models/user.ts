"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";

interface UserAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends UserAttributes {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;

  /**
   * We recommend keeping the `associate` method separate from the model class,
   * so you can define associations in a more modular way.
   */
  static associate(models: any): void {
    // define association here
  }
}

User.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize: new Sequelize(), // Pass your sequelize instance here
    modelName: "User",
  }
);

export default User;
