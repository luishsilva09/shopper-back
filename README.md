npx prisma migrate dev = criar db e seed
npx prisma db seed = para rodar seed

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

# Descrção

Atualizar dados de um ecommerce por um arquivo csv.

# Features

- Validar dados e atualizar

# API referencias

### validar e atualizar dados:

```http
    POST /sendFile
```

Request:

Upload do arquivo

</br>

# Variaveis

`DATABASE_URL = mysql://UserName:Password@Hostname:5432/DatabaseName`

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
