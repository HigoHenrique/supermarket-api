import sequelize from './database';
import Brand from '../models/brand';

export async function seedBrands(): Promise<void> {
  try {

    const existingBrands = await Brand.findAll();
    
    if (existingBrands.length === 0) {
      console.log('Iniciando a população do banco de dados com marcas...');
      
      const brandsToAdd = [
        { name: 'Nestlé' },
        { name: 'Coca-Cola' },
        { name: 'P&G' },
        { name: 'Ambev' },
        { name: 'Danone' },
        { name: 'Nutella' },
        { name: 'Kraft Heinz' },
        { name: 'Johnson & Johnson' },
        { name: 'Lacta' }
      ];
      
      await Brand.bulkCreate(brandsToAdd);
      
      console.log(`${brandsToAdd.length} marcas foram adicionadas ao banco de dados.`);
    } else {
      console.log(`Banco de dados já contém ${existingBrands.length} marcas. Pulando a criação de marcas iniciais.`);
    }
  } catch (error) {
    console.error('Erro ao semear o banco de dados:', error);
    throw error;
  }
}

if (require.main === module) {
  (async () => {
    try {
      await sequelize.sync();
      await seedBrands();
      console.log('Database seeding completed successfully');
      process.exit(0);
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    }
  })();
}