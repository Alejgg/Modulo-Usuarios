const formulario = document.getElementById('formUsuarios'); //Mando a pedir todo en el form
const inputs = document.querySelectorAll('#formUsuarios input'); //Selecciono un arreglo de todos los inputs

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    //nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    tipo: /(\badministrador\b|\bconsulta\b)/,
}

const campos = {
    usuario: false,
    password: false,
    correo: false,
    telefono: false,
}

const validarFormulario = (e) => {
    // console.log('Se ejecuto'); //Checar correo
    //console.log(e.target.id);
    switch (e.target.name) {
        case "email":
            //console.log('Funciona');
            //Si cumple con esta expresion da un true, en el e tenemos lo que emtemos
            validarCampo(expresiones.correo, e.target, 'correo');
            break;

        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'nombre');
            break;

        case "pass":
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword2();
            break;

        case "pass2":
            validarPassword2();
            break;

        case "tipo":
            validarCampo(expresiones.tipo, e.target, 'telefono');
            break;
    }

}

//Validar las cosas
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

//Validar es la misma contraseña
const validarPassword2 = () => {
    const password = document.getElementById('pass');
    const password2 = document.getElementById('pass2');

    if (password.value !== password2.value) {
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['password'] = false;
    } else {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['password'] = true;
    }

}

//Por cada input has esto
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});


//Le digo que haga caso a los tipo submit
//e = parametro de eventos
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); //Evito recarguen la pagina

    if (campos.usuario && campos.correo && campos.password && campos.telefono) {
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
        Swal.fire({
            type: 'success',
            title: 'Usuario Creado con Exito',
        });
    }
});