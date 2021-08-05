$('#formLogin').submit(function (e) {
    e.preventDefault(); //No recarga la pagina

    //Capturamos los datos
    var usuario = $.trim($("#email").val());//trim limpia los espacios en blanco
    var password = $.trim($("#pass").val());

    //Si esta vacio da una alerta bonita con sweetalert2
    if (usuario.length == "" || password == "") {
        Swal.fire({ //iniciamos
            type: 'warning',
            title: 'Debe ingresar un usuario y/o contraseña',
        });
        return false; //Si no envia nada cancela todo
    } else { //Si esta todo lleno corremos el codigo
        $.ajax({//Ajax para el envio de los datos
            url: "bd/login.php",//Donde envio los datos
            type: "POST",
            datatype: "json",
            //Aqui en data esta lo que vamos a enviar a login.php
            data: { usuario: usuario, password: password },
            success: function (data) { //Si todo sirve corro esta funcion
                if (data == "null") { //Si no recibo nada correcto de la DB le mando una advertencia
                    Swal.fire({
                        type: 'error',
                        title: 'Usuario y/o contraseña incorrecta',
                    });
                } else {
                    Swal.fire({
                        type: 'success',
                        title: '¡Conexión exitosa!',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ingresar'
                    }).then((result) => { //Captura el resultado
                        if (result.value) { //Si es correcto lo envio aca
                            window.location.href = "admin.php";
                        }
                    })

                }
            }
        });
    }
});