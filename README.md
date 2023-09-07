<h1 align="center">Shopper desafio</h1>

<div align="center">
  <h3>Build</h3>
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
 <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" heigth="30px">
  
  <!--  Badges  source:  https://dev.to/envoy_/150-badges-for-github-pnk  -->
</div>

# Descrição

Atualizar dados de um e-commerce por um arquivo csv.

# Features

- Validar dados
- Atualizar os dados

# API referências

### validar:

```http
    POST /sendFile
```

Request:

Upload do arquivo

Response:

```json
[
  {
    "product_code": "16",
    "new_price": "20.50",
    "invalidElement": "Dados OK",
    "data": {
      "code": 16,
      "name": "AZEITE PORTUGUÊS EXTRA VIRGEM GALLO 500ML",
      "cost_price": "18.44",
      "sales_price": "20.49"
    },
    "cost": "Dados OK",
    "novoPreco": "Dados OK"
  },
  {
    "product_code": "20",
    "new_price": "10.80",
    "invalidElement": "Dados OK",
    "data": {
      "code": 20,
      "name": "ENERGÉTICO RED BULL ENERGY DRINK 355ML",
      "cost_price": "9.71",
      "sales_price": "10.79"
    },
    "cost": "Dados OK",
    "novoPreco": "Dados OK"
  }
]
```

</br>

### Atualizar dados

# Variaveis

`DATABASE_URL = mysql://UserName:Password@Hostname:3306/DatabaseName`

`PORT = number #recommended:4000`

# Rodar localmente

Clone projeto:

```bash

  git clone https://github.com/luishsilva09/shopper-back.git

```

Instalar dependencias:

```bash

  npm install

```

Criar banco de dado e popular com dados do arquivo seed.sql:

```bash
npx prisma migrate dev
```

Rodar em modo desenvolvimento:

```bash
    npm run dev
```

# Author

​

- Luís Henrique da Silva

​

https://github.com/luishsilva09
