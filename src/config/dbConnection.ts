import { Sequelize } from "sequelize";

const sequelize = new Sequelize("myDB", "postgres", "thestunna420", {
  host: "localhost",
  dialect: "postgres",
});



export const connectDB = async() => {
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}