# Share-it


## Tabla de contenidos

-   [Capturas de pantalla](#capturas-de-pantalla)
-   [Desarrolladores](#desarrolladores)
-   [Script disponibles](#scripts-disponibles)
-   [Estructura del proyecto](#estructura-del-proyecto)
-   [Comenzar](#comenzar)

## Capturas de pantalla

Vista a pantalla completa.

![share-it screenshots](https://i.ibb.co/480VZMp/shareit-screenshots.png)


## Desarrolladores

Lista de desarrolladores que han contrribuido a este proyecto:

-   [Jorge Coronilla Naranjo](https://www.linkedin.com/in/jorge-coronilla-naranjo-20019376/)

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
bmv-accessibility-plugin-webpack
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
                                                    
