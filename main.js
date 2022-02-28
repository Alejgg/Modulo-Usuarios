$(document).ready(function () {
    var id, opcion;
    opcion = 4;

    tablaUsuarios = $('#tablaUsuarios').DataTable({

        "ajax": {
            "url": "bd/crud2.php",
            "method": 'POST', //usamos el metodo POST
            "data": {
                opcion: opcion
            }, //enviamos opcion 4 para que haga un SELECT
            "dataSrc": ""
        },
        "columns": [{
                "data": "id"
            },
            {
                "data": "email"
            },
            {
                "data": "usuario"
            },
            // {
            //     "data": "pass"
            // },
            {
                "data": "tipo"
            },
            {
                "data": "last_login_time"
            },
            {
                "data": "login_count"
            },
            {
                "data": "created_time"
            },
            {
                "data": "created_by"
            },
            {
                "data": "modified_time"
            },
            {
                "data": "modified_by"
            },
            //{"data": "deleted"},
            {
                "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnBorrar'><i class='material-icons'>delete</i></button></div></div>"
            }
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
        creador = $.trim($('#creador').val());
        tipo = $.trim($('#tipo').val());
        //estado = $.trim($('#estado').val());

        $.ajax({
            url: "bd/crud.php",
            type: "POST",
            datatype: "json",
            data: {
                id: id,
                email: email,
                usuario: usuario,
                pass: pass,
                tipo: tipo,
                creador: creador,
                opcion: opcion
            },
            success: function (data) {
                if (data == 1) {
                    Swal.fire({
                        type: 'error',
                        title: 'Correo Electrónico Repetido, Reactivando',
                    });
                    tablaUsuarios.ajax.reload(null, false);
                } else if (data == 2) {
                    Swal.fire({
                        type: 'error',
                        title: '¡Campos Vacíos! Por favor, llene todos los campos',
                    });
                    tablaUsuarios.ajax.reload(null, false);
                } else if (data == 4) {
                    Swal.fire({
                        type: 'error',
                        title: '¡Correo Electrónico Repetido!',
                    });
                    tablaUsuarios.ajax.reload(null, false);
                } else if (data == 0) {
                    Swal.fire({
                        type: 'success',
                        title: '¡Éxito!',
                    });
                    tablaUsuarios.ajax.reload(null, false);
                } else {
                    tablaUsuarios.ajax.reload(null, false);
                    Swal.fire({
                        type: 'info',
                        title: 'Acción realizada',
                    });
                }

            }
        });
        $('#modalCRUD').modal('hide');
    });

    //para limpiar los campos antes de dar de Alta una Persona
    $("#btnNuevo").click(function () {
        opcion = 1; //alta           
        id = null;
        $("#formUsuarios").trigger("reset");
        $(".modal-header").css("background-color", "#17a2b8");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Alta de Usuario");
        $('#modalCRUD').modal('show');
    });

    //Editar        
    $(document).on("click", ".btnEditar", function () {
        opcion = 2; //editar
        fila = $(this).closest("tr");
        id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
        email = fila.find('td:eq(1)').text();
        usuario = fila.find('td:eq(2)').text();
        // pass = fila.find('td:eq(3)').text();
        tipo = fila.find('td:eq(3)').text();

        $("#email").val(email);
        $("#usuario").val(usuario);
        // $("#pass").val(pass);
        // $("#pass2").val(pass);
        $("#tipo").val(tipo);

        $(".modal-header").css("background-color", "#007bff");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Usuario");
        $('#modalCRUD').modal('show');


    });

    //Borrar
    $(document).on("click", ".btnBorrar", function () {
        fila = $(this).closest("tr");
        id = parseInt($(this).closest('tr').find('td:eq(0)').text());
        email = fila.find('td:eq(1)').text();
        opcion = 3; //eliminar  confirm("¿Está seguro de borrar el registro " + email + "?")      
        var respuesta = confirm("¿Está seguro de borrar el registro " + email + "?");
        //Swal.fire({
        //     type: 'warning',
        //     title: 'Usuario ' + email + ' Eliminado',
        // });
        if (respuesta) {
            $.ajax({
                url: "bd/crud.php",
                type: "POST",
                datatype: "json",
                data: {
                    opcion: opcion,
                    id: id,
                    email: email
                },
                success: function () {
                    tablaUsuarios.row(fila.parents('tr')).remove().draw();
                    Swal.fire(
                        '¡Eliminado!',
                        'El usuario ha sido eliminado...',
                        'success'
                    );
                }
            });
        }
    });
});