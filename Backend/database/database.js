import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config();

const sequelize = new Sequelize( 
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "mysql",
}); 

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({force: false}); 
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})(); 

export default sequelize;

// Website for webShp.infinityfreeapp.com
// password: qo20gpKexpR
