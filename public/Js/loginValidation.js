window.addEventListener("load",function(){
   
    let formLogin = document.getElementById("formLogin");
    formLogin.addEventListener("submit",function(e){
        let errores = [];
        let userLogin = document.getElementById("userLogin");
        let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;
        
        if (userLogin.value == ""){
            errores.push("Debe ingresar un usuario o email");
        }

        let userPassword = document.getElementById("passwordLogin");
        if (userPassword.value == ""){
            errores.push("Debe ingresar un password");
        }


        if (errores.length > 0){
            e.preventDefault();
            let ulErrores = document.querySelector(".errorFrom");
            for (let i = 0; i < errores.length;i++){
                ulErrores.innerHTML += "<li>"+ errores[i] + "</li>"
            }
        }

    })
})