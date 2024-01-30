# Share-it


# English

## Table of Contents

### English
-   [Screenshots](#screenshots)
-   [Developers](#developers)
-   [Introduction](#introduction)
-   [Available Scripts](#available-scripts)
-   [Getting Started](#getting-started)
-   [Create-a-database-on-Turso](#create-a-database-on-turso)
-   [Project Structure](#project-structure)

### Spanish

-   [Capturas de pantalla](#capturas-de-pantalla)
-   [Desarrolladores](#desarrolladores)
-   [Introducción](#introducción)
-   [Script disponibles](#scripts-disponibles)
-   [Comenzar](#comenzar)
-   [Crear una base de datos en Turso](#crear-una-base-de-datos-en-turso)
-   [Estructura del proyecto](#estructura-del-proyecto)

## Screenshots

Full-screen view.

![share-it screenshots](https://i.ibb.co/480VZMp/shareit-screenshots.png)


## Developers

List of developers who have contributed to this project:

-   [Jorge Coronilla Naranjo](https://www.linkedin.com/in/jorge-coronilla-naranjo-20019376/)

## Introduction

Share-it is a Splitwise clone created with:

- Next.js
- TypeScript
- CSS
- SQLite

## Available Scripts

In this project, you can run the following scripts:

| Script                                    | Description                                                                         |
| ----------------------------------------- | ------------------------------------------------------------------------------------ |
| npm run dev                               | Run the application in development mode.                                         |
| npm run start                             | Build the project for production mode within the `build` folder              |
| npm run lint                              | Run the linter                                                                    |



## Getting Started

Clone the project:
```sh
git clone https://github.com/JorgeCoronilla/share-it-app.git

```
Enter the project:

```sh
cd share-it-app

```
Install dependencies:
```sh
npm install

```

Create a .env file and configure the environment variables:
```sh
BASE_URL=
JWT_SECRET_KEY=
NODEMAILER_PASS=
NODEMAILER_EMAIL=
DB_URL=
DB_AUTH_TOKEN=


```
Important: The project uses an sqlite database

## Create a database on [Turso](https://turso.tech/app)
Once your account is created, you can access the Turso CLI from the console.
Installation
```sh
npm install tursodatabase/tap/turso

```
Login
```sh
turso auth login

```
Create database
```sh
turso db create my-db

```
Create tables: first enter in the shel and the copy the script from `/src/app/lib/db/dbScripts.sql`
```sh
turso db shell my-db
```
Get the URL
```sh
turso db show --url my-db

```
Create a token
```sh
turso db tokens create my-db

```

Finally add the url and the token into the `.env` file.

## Project Structure

```
share-it-app
|
├── public/
│  └─── icons/
├── .next/
├── node_modules/
├── public/
├── prc/
│   ├───(app-pages)/
│   │   ├─── add/
│   │   ├─── about/
│   │   ├─── dashboard/
│   │   ├─── login/
│   │   └─── register/
│   │ 
│   ├─── api/
│   │ 
│   ├─── lib/
│   │   ├─── db/
│   │   ├─── hooks/
│   │   ├─── services/
│   │   ├─── auth.ts
│   │   ├─── constants.ts
│   │   ├─── definitions.ts
│   │   └─── validations.ts
│   │ 
│   ├─── ui/
│   │   ├─── components/
|   │   │   ├─── about/
|   │   │   ├─── dashboard/
|   │   │   ├─── global/
│   │   │   └─── home/
│   │   │ 
│   │   ├─── styles/
│   │   ├─── globals.css
│   │   └─── favicon.ico
│   │ 
│   └─── middleware.ts
├─── .env
├─── eslint.json
├─── package.json
└─── tsconfig.json

```


# Español
## Tabla de contenidos

-   [Capturas de pantalla](#capturas-de-pantalla)
-   [Desarrolladores](#desarrolladores)
-   [Introducción](#introducción)
-   [Script disponibles](#scripts-disponibles)
-   [Comenzar](#comenzar)
-   [Crear una base de datos en Turso](#crear-una-base-de-datos-en-turso)
-   [Estructura del proyecto](#estructura-del-proyecto)

## Capturas de pantalla

Vista a pantalla completa.

![share-it screenshots](https://i.ibb.co/480VZMp/shareit-screenshots.png)


## Desarrolladores

Lista de desarrolladores que han contrribuido a este proyecto:

-   [Jorge Coronilla Naranjo](https://www.linkedin.com/in/jorge-coronilla-naranjo-20019376/)

## Introducción

Share-it es un clon de Splitwise creado con:

- Nextjs
- Typescript
- Css
- Sqlite

## Scripts disponibles
En este proyecto se pueden ejecutar los siguientes scripts:

| Script                                    | Descriptción                                                                         |
| ----------------------------------------- | ------------------------------------------------------------------------------------ |
| npm run dev                               | Ejecuta la aplicación en modo de desarrollo.                                         |
| npm run start                             | Construye el proyecto para modo producción dentro de la carpeta `build`              |
| npm run lint                              | Ejecuta el linter                                                                    |



## Comenzar

Clonar el proyecto:
```sh
git clone https://github.com/JorgeCoronilla/share-it-app.git
```

Entrar en el proyecto:
```sh
cd share-it-app
```

Instalar dependencias:
```sh
npm install
```

Crear un archivo `.env` y configurar las variables de entorno:

```sh
BASE_URL=
JWT_SECRET_KEY=
NODEMAILER_PASS=
NODEMAILER_EMAIL=
DB_URL=
DB_AUTH_TOKEN=
```

Importante: El proyecto usa una db `sqlite`

### Crear una base de datos en [Turso](https://turso.tech/app)

Una vez creada tu cuenta puedes acceder desde la consola al CLI de Turso.
Instalación
```sh
install tursodatabase/tap/turso
```
Login
```sh 
turso auth loign
```

Crea la db
```sh 
turso db create my-db
```

Crea las tablas desde el shel
```sh
turso db shell my-db
```

Obtén la url
```sh
turso db show --url my-db
```

Crea un token
```sh
turso db tokens create my-db
```


## Estructura del proyecto

```
share-it-app
|
├── public/
│  └─── icons/
├── .next/
├── node_modules/
├── public/
├── prc/
│   ├───(app-pages)/
│   │   ├─── add/
│   │   ├─── about/
│   │   ├─── dashboard/
│   │   ├─── login/
│   │   └─── register/
│   │ 
│   ├─── api/
│   │ 
│   ├─── lib/
│   │   ├─── db/
│   │   ├─── hooks/
│   │   ├─── services/
│   │   ├─── auth.ts
│   │   ├─── constants.ts
│   │   ├─── definitions.ts
│   │   └─── validations.ts
│   │ 
│   ├─── ui/
│   │   ├─── components/
|   │   │   ├─── about/
|   │   │   ├─── dashboard/
|   │   │   ├─── global/
│   │   │   └─── home/
│   │   │ 
│   │   ├─── styles/
│   │   ├─── globals.css
│   │   └─── favicon.ico
│   │ 
│   └─── middleware.ts
├─── .env
├─── eslint.json
├─── package.json
└─── tsconfig.json
```
                                                    
