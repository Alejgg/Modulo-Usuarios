<!doctype <!DOCTYPE html>
<html lang="en">

<head>
    <link rel="shortcut icon" href="#">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LOGIN</title>

    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="main.css">
    <link rel="stylesheet" href="assets/sweetalert2/sweetalert2.min.css">

</head>

<body>
    <div id="login">
        <h3 class="text-center text-white display-4"></h3>
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">

                    <div id="login-box" class="col-md-12 bg-light text-dark">
                        <form id="formLogin" class="form" action="" method="post">
                            <h3 class="text-center text-dark">Iniciar Sesión</h3>
                            <div class="form-group">
                                <label for="usuario" class="text-dark">Usuario</label>
                                <input type="text" name="email" id="email" class="form-control">
                            </div>
                            <span id="result"></span>
                            <div class="form-group">
                                <label for="password" class="text-dark">Contraseña</label>
                                <input type="password" name="pass" id="pass" class="form-control">
                            </div>

                            <div class="form-gropu text-center">
                                <input type="submit" name="submit" class="btn btn-dark btn-lg btn-block" value="Conectar">
                            </div>

                            
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>








    <script src="assets/jquery/jquery-3.3.1.min.js"></script>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/popper/popper.min.js"></script>

    <script src="assets/sweetalert2/sweetalert2.all.min.js"></script>
    <script src="assets/login.js"></script>
</body>

</html>