# DesafioTecnicoUsuarios

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Proyecto con una pequeña API - Json Server

Para inicializar Json server:
    json-server --watch db.json
Ubicación 'Desafio tecnico/desafio-tecnico-usuarios/src/app/DB'

### Información del proyecto

-No subi la carpeta node modules para que el proyecto no pese tanto. 

Para instalar dependencias del proyecto: npm install


- Recursos utilizados: 
    - Angular material (biblioteca UI)
    - Sweet alert para ventanas modales (biblioteca)
    - UUID herramienta que proporciona IDS únicos
    - Routing
    - Formulario reactivo
    - Observables 
    - HttpClient
    - Servicios para comunicación entre componentes
    - Modelos

El desafío consta de 3 componentes 
    1-lista-usuarios
    2-login
    3-crear-usuario

1 - En listar usuario podemos encontrar una tabla con columnas que nos proporciona información específica del usuario. Así tambíen, podemos interactuar con esta utilizando un filtro y 2 botones de editar y eliminar. Estos se podrán utilizar si se inicio sesión siendo administrador, para evitar que cualquier usuario que entre en el sistema pueda manipular la información. Tambien consta con un paginador que me permite tener organizado la cantidad de información de la tabla que quiero ver y dentro de cada fila podemos desplegar una lista detallada para cada usuario donde se le proporciona datos detallados del mismo que necesitemos saber

2 - En el login encontramos un formulario pequeño donde se necesita ingresar mail,contraseña y rol. Dependiendo de si los datos ingresados son correctos podemos ingresar al sistema o no. En caso de que el usuario NO sea un administrador, no va a poder ni eliminar ni modificar los usuarios que se encuentren en la lista. Simplemente podra crear,consultar y filtrarlos.

Caso contrario a eso. Se le permitirá modificar y/o eliminar un usuario. Arriba del header se encuentra un boton para cerrar sesión. Una vez finalizada, la página se recargará y volvera a la pantalla de inicio de sesión

3 - En el componente de crear usuario podremos tanto crear como modificar a uno. Utilicé un solo componente ya que la información puedo manipularla directamente desde un solo un formulario que use los mismos campos para crear como para modificar. Desde el componente de listar a la hora de darle al boton de modificar, se me redirigira al componente crear usuario con la información pegada en los campos. Una vez creado y modificado usuario la lista se actualiza al instante gracias a la utilización de un observable. Si estamos creando un usuario el boton de modificar no estará disponible y visceversa en caso de que estemos utilizando uno. 

- Todos los campos requieren de una validación para que sea aceptado el formulario.
-Todos los botones que sean de crear,editar,eliminar, modificar y cerrar sesíon utilizan Sweet Alert para tener una confirmación previa a la acción

-Aclaración

Para poder simular inicio de sesión ingresar al localStorage y crear:

key: 'tokenLogin' value:(cualquier caracter)

key: 'rolLogin' value:Administrador 
Para poder utilizar los botones de la lista
