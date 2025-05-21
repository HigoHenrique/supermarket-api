import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import brandRoutes from './routes/brandRoutes';
import productRoutes from './routes/productRoutes';
import sequelize, { testConnection } from './utils/database';
import { AppError } from './utils/error';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/brands', brandRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API de gestão de produtos de supermercado funcionando perfeitamente!' });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor',
  });
});

(async () => {
  try {

    await testConnection();
    
    await sequelize.sync();
    console.log('Modelos sincronizados com o banco de dados');
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta: ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
})();

export default app;