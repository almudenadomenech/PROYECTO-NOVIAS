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


<div class="container">
  <div class="row">
    <div class="col-14 mt-5">
      <div class="row row-cols-3 row-cols-sm-2 row-cols-md-2">
        <div class="col">
          <div class="card shadow">
            @if(vestidos && vestidos.photoUrl){
            <a >
              
              <img class="bd-placeholder-img card-img-top 
              highlight-on-hover" [src]="baseUrl + vestidos.photoUrl" 
              alt="Imagen">
              
            </a>
          }
            <a >
              @if(vestidos && !vestidos.photoUrl){
              <img class="bd-placeholder-img card-img-top" src="/assets/img/default.jpg" alt="Imagen por defecto">
              }
            </a>
          </div>
        </div>
      </div>
      @if(vestidos){
      <div class="detalles">
        <div class="description mt-5">
          <p>{{ vestidos.descripcion }}</p>
          <br>
          <i class="bi bi-tag-fill" style="margin-left: 10px; display: inline-block;">
            <span style="margin-left: 15px;">Desde {{ vestidos.price }} €</span>
          </i>
          <br><br>
          <div style="display: flex; align-items: flex-start;">
            <i class="bi bi-info-square-fill" style="margin-left: 10px;"></i>
            <p style="margin-left: 15px; margin-bottom: 0;">El precio del vestido no incluye las personalizaciones o modificaciones. Los accesorios de la modelo se venden por separado.</p>
          </div>
          @if(!isLoogedIn){
            <button routerLink="/register" class="reservar">Reservar cita</button>
          }@else {
            <button [routerLink]="['/booking', vestidos.id, 'form']" class="reservar">Reservar cita</button>
          }
          <div ngbAccordion style="margin-top: 45px;">
            <div ngbAccordionItem>
              <h3>
                <button ngbAccordionButton style="background-color:white; color:black">Descripción del Producto</button>
              </h3>
              <div ngbAccordionCollapse>
                <div ngbAccordionBody>
                  <ng-template>
                    <table class="table">
                      <thead>
                        <tr>
                          <td>Corte</td>
                          <td>{{ vestidos.corte }}</td>
                        </tr>
                        <tr>
                          <td>Escote</td>
                          <td>{{ vestidos.escote }}</td>
                        </tr>
                        <tr>
                          <td>Tipo de cola</td>
                          <td>{{ vestidos.tipoCola }}</td>
                        </tr>
                        <tr>
                          <td>Tejidos</td>
                          <td>{{ vestidos.tejidos }}</td>
                        </tr>
                        <tr>
                          <td>Espalda</td>
                          <td>{{ vestidos.espalda }}</td>
                        </tr>
                        <tr>
                          <td>Talle</td>
                          <td>{{ vestidos.talle }}</td>
                        </tr>
                        <tr>
                          <td>Rango de tallas</td>
                          <td>{{ vestidos.tallas }}</td>
                        </tr>
                      </thead>
                    </table>
                  </ng-template>
                </div>
              </div>
            </div>
            <div ngbAccordionItem>
              <h3>
                <button ngbAccordionButton style="background-color:white; color:black">Métodos de pago</button>
              </h3>
              <div ngbAccordionCollapse>
                <div ngbAccordionBody>
                  <ng-template>
                    <div style="display: flex; align-items: flex-start;">
                      <i class="bi bi-check-square-fill" style="margin-left: 5px;"></i>
                      <p style="margin-left: 15px;">Financiación de 3 a 12 meses. *</p>
                    </div>
                    <div style="display: flex; align-items: flex-start;">
                      <i class="bi bi-check-square-fill" style="margin-left: 5px;"></i>
                      <p style="margin-left: 15px;">Pago con tarjeta o transferencia bancaria. *</p>
                    </div>
                    <div style="display: flex; align-items: flex-start;">
                      <i class="bi bi-check-square-fill" style="margin-left: 5px;"></i>
                      <p style="margin-left: 15px;">Pago en efectivo. *</p>
                    </div>
                    <div style="display: flex; align-items: flex-start;">
                      <i class="bi bi-check-square-fill" style="margin-left: 5px;"></i>
                      <p style="margin-left: 15px;">Venta exclusiva en tienda.</p>
                    </div>
                  </ng-template>
                </div>
              </div>
            </div>
            <div ngbAccordionItem>
              <h3>
                <button ngbAccordionButton style="background-color:white; color:black">FAQS</button>
              </h3>
              <div ngbAccordionCollapse>
                <div ngbAccordionBody>
                  <ng-template>
                    <p>¿PUEDO PERSONALIZAR ESTE VESTIDO?</p>
                    <p>Sí, según el modelo se pueden hacer variaciones en el largo de la cola, en el largo de las mangas y en la forma y/o profundidad del escote.</p>
                    <p>¿CON CUÁNTO TIEMPO TENGO QUE ENCARGAR MI VESTIDO?</p>
                    <p>El tiempo de encargo recomendable es de 9 a 12 meses antes de la fecha de la boda. También tenemos vestidos listos para probar y llevar a casa el mismo día.</p>
                  </ng-template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    </div>
  </div>
</div>
