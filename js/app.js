//* ==================
//* === app web js ===
//* ==================

// === la aplicación va a ser ejecutable | en forma de función ===
// cada vez que la aplicación se ejecute, insertara en los tbody los datos | mediante el id "empleados"

// === url de nuestra aplicación | mi ruta de xampp del proyecto ===
let url = "http://localhost/JS/proyecto-aplicacionWeb/"

// === capturar id del modal para editar registros | de la función Editar ===
let modal = new bootstrap.Modal(document.getElementById('modelId'), {keyboard: false});

let aplicacion = new function() {

    // === capturar/obtener valores de los inputs del formulario para ingresar ===
    this.nombre = document.getElementById('nombre');
    this.correo = document.getElementById('correo');

    // === capturar/obtener valores de los inputs del formulario para editar ===
    this.idEditar = document.getElementById('idEditar');
    this.nombreEditar = document.getElementById('nombreEditar');
    this.correoEditar = document.getElementById('correoEditar');

    // === hacer referencia al id | para poder incluir elementos dentro del id empleados ===
    this.empleados = document.getElementById('empleados');
    
    this.Leer = function() {

        //* === función | para "mostrar los registros en la tabla" ===

        // inicializar vacio 
        let datos = "";

        // === consultar la información de nuestra api | ajax | fetch -> hace la solicitud a la url ===
        fetch(url)
        .then(r => r.json())
        .then((respuesta) => {

            console.log(respuesta);

            // === mapeado | recorrer los datos que nos llegan de la bbdd ===
            respuesta.map(
                function(empleado, index, array) {
                    
                    // === aquí vamos a capturar/recolectar la información y mostrarla ===
                    // la información va a llegar como un 'empleado', vamos a usar un índice (index) y lo vamos a traer en formato array
                    // renderizar los datos que nos llegan de la bbdd mediante ajax/fetch y renderizarlos en el html
                    datos += `
                        <tr>
                            <td>${empleado.id}</td> 
                            <td>${empleado.nombre}</td>
                            <td>${empleado.correo}</td>
                            <td><div class="btn-group" role="group" aria-label=""><button type="button" class="btn btn-info" onclick="aplicacion.Editar('${empleado.id}')">Editar</button><button type="button" class="btn btn-danger" onclick="aplicacion.Borrar('${empleado.id}')">Borrar</button></div> </td>
                        </tr>    
                    `;
                }
            );

            // === incrustar los datos en el html ===
            return this.empleados.innerHTML = datos;

        })
        .catch(console.log);
                
    };

    // =======================================================================================

    this.Agregar = function() {

        //* === función | para "agregar un registro a la tabla" ===

        console.log(nombre.value);
        console.log(correo.value);

        // vamos a ingresar la información directamente con un POST para que se refleje el resgistro que ha sido
        // ingresado directamente en la tabla sin refrescar la página.
        // utilizamos nuestra api para insertar la info en la tabla de 'empleados' de la bbdd 'empleados'
        // usamos fetch para hacerlo

        // === objeto | para que php recepcione los datos enviados | para recuperar la información ===
        let datosEnviar = {
            nombre: this.nombre.value,
            correo: this.correo.value
        }

        // === enviamos los datos a través de la solicitud ===
        // enviamos los datos a la 'url' por el método POST de los datos recolectados 'datosEnviar'
        fetch(url + "?insertar=1", {method: "POST", body: JSON.stringify(datosEnviar)})
        // hacer el envio mediante .json
        .then(respuesta => respuesta.json())
        // se recepcionan/reciben los datos
        .then((datosRespuesta) => {

            // comprobar
            console.log('Insertados');

            // === actualizar la información | actualizar la tabla para que se vean los nuevos registros ===
            this.Leer();
        }) 
        .catch(console.log);

    };
    
    // =======================================================================================

    this.Borrar = function(id) {

        //* === función | para "eliminar un registro de la tabla" ===

        // recibir un valor id que es el que le pertenece al registro que queremos borrar 

        console.log(id);

        // === borramos los datos a través de la solicitud ===
        // nuestra api recibe un parámetro de borrar | en vez de usar un "1", se envia el "id" 
        fetch(url + "?borrar=" + id)
        // hacer el envio mediante .json
        .then(respuesta => respuesta.json())
        // se recepcionan/reciben los datos
        .then((datosRespuesta) => {

            // comprobar
            console.log('Borrrados');

            // === actualizar la información | actualizar la tabla para que se vean los nuevos registros ===
            this.Leer();
        }) 
        .catch(console.log);
    };

    // =======================================================================================

    this.Editar = function(id) {

        //* === función | para "editar/recuperar los datos de un registro de la tabla" ===
        
        // recibir un valor id que es el que le pertenece al registro que queremos editar/actualizar | recuperar un registro
        // para editar los datos vamos a crear un 'modal' en bootstrap (mirar html en la parte de arriba)
        // debajo de "<div class="row"> ... </div>"
        console.log(id);

        // === consultamos los datos a través de la solicitud ===
        // nuestra api recibe un parámetro de consultar | en vez de usar un "1", se envia el "id" 
        fetch(url + "?consultar=" + id)
        // hacer el envio mediante .json
        .then(respuesta => respuesta.json())
        // se recepcionan/reciben los datos
        .then((datosRespuesta) => {

            // === comprobar si la información está llegando ===
            console.log(datosRespuesta);

            // === trae los datos de la bbdd al formulario de editar ===
            this.nombreEditar.value = datosRespuesta[0]['nombre'];
            this.idEditar.value = datosRespuesta[0]['id'];
            this.correoEditar.value = datosRespuesta[0]['correo'];
           
        }) 
        .catch(console.log);

        // === al pulsar botón Editar se muestra el modal de bootstrap ===
        modal.show();


    };

    // =======================================================================================

    this.Actualizar = function() {

        //* === función | para "actualizar los datos de un registro de la tabla" ===

        console.log('Actualizar')

        // === objeto | para que php recepcione los datos enviados | para recuperar la información ===
        // para enviarla a la api (archivo de php, y este la guarde en la bbdd)
        let datosEnviar = {
            id: this.idEditar.value,
            nombre: this.nombreEditar.value,
            correo: this.correoEditar.value
        }

        // === enviamos los datos a través de la solicitud ===
        // enviamos los datos a la 'url' por el método POST de los datos recolectados 'datosEnviar'
        fetch(url + "?actualizar=1", {method: "POST", body: JSON.stringify(datosEnviar)})
        // hacer el envio mediante .json
        .then(respuesta => respuesta.json())
        // se recepcionan/reciben los datos
        .then((datosRespuesta) => {

            // comprobar
            console.log('Actualizados');

            // === actualizar la información | actualizar la tabla para que se vean los nuevos registros ===
            this.Leer();

            // === cuando se actualicen los datos hay que quitar/esconder el modal de bootstrap con el formulario de editar ===
            modal.hide();
        }) 
        .catch(console.log);

    };


        
}

// === llamar función Leer() | ejecutar la aplicación ===
aplicacion.Leer();
