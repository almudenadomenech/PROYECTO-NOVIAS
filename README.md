# PROYECTO-NOVIAS

## PASO 1: CREAR BACKEND

nest new Backend --skip-git --package-manager npm

## PASO 2: CREAR FRONTEND

ng new Frontend --skip-git --style=css --routing=true --ssr=false

## PASO 3: ENTRAR AL PROYECTO

cd Frontend

## PASO 4: AÑADIR BOOSTRAP
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