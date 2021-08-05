$(document).ready(function () {
    var id, opcion;
    opcion = 4;
    
    tablaUsuarios = $('#tablaUsuarios').DataTable({
        "ajax": {
            "url": "bd/crud2.php",
            "method": 'POST', //usamos el metodo POST
            "data": { opcion: opcion }, //enviamos opcion 4 para que haga un SELECT
            "dataSrc": ""
        },
        "columns": [
            { "data": "id" },
            { "data": "email" },
            { "data": "usuario" },
            // { "data": "pass" },
            { "data": "tipo" },
            // { "data": "last_login_time" },
            { "data": "login_count" },
            // { "data": "created_time" },
            // { "data": "created_by" },
            // { "data": "modified_time" },
            // { "data": "modified_by" },
            //{"data": "deleted"},
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button disabled class='btn btn-primary btn-sm btnEditar'><i class='material-icons'>edit</i></button><button disabled class='btn btn-danger btn-sm btnBorrar'><i class='material-icons'>delete</i></button></div></div>" }
        ],
        //Para cambiar el lenguaje a español
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
        }
    });

    var fila; //captura la fila, para editar o eliminar
    //submit para el Alta y Actualización
    $('#formUsuarios').submit(function (e) {
        e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
        email = $.trim($('#email').val());
        usuario = $.trim($('#usuario').val());
        pass = $.trim($('#pass').val());
        //pass2 = $.trim($('#pass2').val());  
        tipo = $.trim($('#tipo').val());
        //estado = $.trim($('#estado').val());

        $.ajax({
            url: "bd/crud2.php",
            type: "POST",
            datatype: "json",
            data: { id: id, email: email, usuario: usuario, pass: pass, tipo: tipo, opcion: opcion },
            success: function (data) {
                tablaUsuarios.ajax.reload(null, false);
            }
        });
        $('#modalCRUD').modal('hide');
    });

});