import { Sequelize } from 'sequelize';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = path.resolve(__dirname, '../../database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
});

export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
    throw error;
  }
};

export default sequelize;