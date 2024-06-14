# PROYECTO-NOVIAS

## PASO 1: CREAR BACKEND

nest new Backend --skip-git --package-manager npm

 npm install --save @nestjs/typeorm typeorm mysql2 @nestjs/swagger

## PASO 2: CREAR FRONTEND

ng new Frontend --skip-git --style=css --routing=true --ssr=false

## PASO 3: ENTRAR AL PROYECTO

cd Frontend

## PASO 4: INSTALAR BOOSTRAP

ng add @ng-bootstrap/ng-bootstrap

## PASO 5: INSTALAR BOOTSTRAP-ICONS

npm i bootstrap-icons

En angular.json hay que agregar el bootstrap-icons.min.css a styles:

 "styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "node_modules/bootstrap-icons/font/bootstrap-icons.min.css",
              "src/styles.css"
            ],

## PASO 6: CREAR COMPONENTES

ng g c nombre del componente

## PASO 6: CREAR INTERFACES

## PASO 7: RUTAS.

app.routes.ts

## PASO 8: CREAR BASE DE DATOS EN SQL

## PASO 9: Instalar Base de Datos

npm install --save @nestjs/typeorm typeorm mysql2

## PASO 10: GENERAR CONTROLADORES.
nest generate controller nombre-controlador.

  # crear entidades.
    Dentro del controlador. se añade un archivo vestidos.model.ts (se añadiendo los que se necesiten)

    @Entity()

export class Vestidos{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    model: string;
}

## PASO 10: CONFIGURAR EN BACKEND APP.MODULE.

1. TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'vestidos',
      entities: [Vestidos],
      synchronize: true, 
      logging: true
}),
2.  TypeOrmModule.forFeature([Vestidos])

## SUBIDA DE ARCHIVOS EN BACKEND (MULTER)

Instalar en backend:

npm i -D @types/multer

## LEVANTAR EL SERVIDOR PARA PODER VER LAS TABLAS:

nest start --watch

## Crear carpeta uploads

## Configurarla en main.ts(backend)

## Peticiones en controlador Vestidos

## hacer html y ts del componente.


## GENERAR UN SERVICIO(FRONTEND)

ng generate service category