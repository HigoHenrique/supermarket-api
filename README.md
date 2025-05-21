# API de Gestão de Produtos de Supermercado

Uma API RESTful construída com Node.js, TypeScript, Express e Sequelize para gerenciar produtos e marcas de supermercado.

## Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn (recomendado o uso do npm!)

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/supermarket-api.git
   cd supermarket-api
   ```

2. Instale as dependências:
   ```
   npm install (recomendado!)
   ```
   ou
   ```
   yarn install
   ```

3. Crie um arquivo `.env` na raiz do projeto (ou use o fornecido):
   ```
   PORT=3001
   NODE_ENV=development
   ```

## Executando o Projeto

1. Compile o TypeScript:
   ```
   npm run build (recomendado!)
   ```
   ou
   ```
   yarn build
   ```

2. Popule o banco de dados com marcas iniciais:
   ```
   npm run seed (recomendado!)
   ```
   ou
   ```
   yarn seed
   ```

3. Inicie o servidor:
   ```
   npm run start (recomendado!)
   ```
   ou
   ```
   yarn start
   ```

4. Para desenvolvimento com hot-reload:
   ```
   npm run dev (recomendado!)
   ```
   ou
   ```
   yarn dev
   ```

A API estará disponível em `http://localhost:3001`.

## Endpoints

### Brands (Marcas)

- **GET /api/brands** - Lista todas as marcas
- **GET /api/brands/:id** - Busca uma marca pelo ID
- **POST /api/brands** - Cria uma nova marca
  - Body: `{ "name": "Nome da Marca" }`

### Products (Produtos)

- **GET /api/products** - Lista todos os produtos
  - Query Parameters:
    - `page`: Número da página (default: 1)
    - `pageSize`: Itens por página (default: 10)
    - `search`: Termo de busca geral (busca em nome, descrição e nome da marca)
    - `name`: Filtra pelo nome do produto
- **GET /api/products/:id** - Busca um produto pelo ID
- **POST /api/products** - Cria um novo produto
  - Body:
    ```
    {
      "name": "Nome do Produto",
      "price": 9.99,
      "description": "Descrição do produto (opcional)",
      "image": "Base64 da imagem (opcional)",
      "brandId": "UUID da marca"
    }
    ```

## Restrições e Validações

- O nome do produto + marca deve ser único
- O preço deve ser um número positivo maior que zero
- A imagem deve ser uma string em formato base64 (opcional)
- O ID da marca deve existir no banco de dados

## Estrutura do Banco de Dados

O projeto utiliza SQLite como banco de dados, armazenado no arquivo `database.sqlite` na raiz do projeto.

### Tabelas

1. `brands` - Armazena as marcas
   - `id`: UUID (chave primária)
   - `name`: Nome da marca (único)
   - `createdAt`: Data de criação
   - `updatedAt`: Data de atualização

2. `products` - Armazena os produtos
   - `id`: UUID (chave primária)
   - `name`: Nome do produto
   - `price`: Preço do produto
   - `description`: Descrição (opcional)
   - `image`: Imagem em base64 (opcional)
   - `brandId`: UUID da marca (chave estrangeira)
   - `createdAt`: Data de criação
   - `updatedAt`: Data de atualização

## Testando a API

### Usando o Postman

Você pode importar a coleção de requisições para o Postman, que está disponível no arquivo `supermarket-api-collection.json` na raiz do projeto.

### Usando cURL

Exemplos de requisições:

1. Listar marcas:
   ```
   curl -X GET http://localhost:3001/api/brands
   ```

2. Criar uma marca:
   ```
   curl -X POST http://localhost:3001/api/brands \
     -H "Content-Type: application/json" \
     -d '{"name": "Nova Marca"}'
   ```

3. Listar produtos:
   ```
   curl -X GET http://localhost:3001/api/products
   ```

4. Listar produtos com filtro:
   ```
   curl -X GET "http://localhost:3001/api/products?search=leite&page=1&pageSize=10"
   ```

5. Criar um produto:
   ```
   curl -X POST http://localhost:3001/api/products \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Leite Integral",
       "price": 4.99,
       "description": "Leite integral de 1L",
       "brandId": "ID_DA_MARCA_AQUI"
     }'
   ```
