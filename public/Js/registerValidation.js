window.addEventListener("load",function(){
    let formRegister = document.getElementById("formRegister");
    formRegister.addEventListener("submit",function (e){
       let errores = [];
       let userName = document.getElementById("userName");

       if (userName.value == ""){
            errores.push("Debe ingresar un nombre")
       }else if (userName.value.length <2){
            errores.push("El nombre debe contener al menos 2 caracteres")
       }

       let lastName = document.getElementById("userLastName");
       if (lastName.value == ""){
            errores.push("Debe ingresar un apellido")
       }else if (lastName.value.length <2){
            errores.push("El apellido  debe contener al menos 2 caracteres")
       }

       let userEmail = document.getElementById("userEmail");
       let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;
       if (userEmail.value == ""){
            errores.push("Debe ingresar un email")
       }
       
       let userPassword = document.getElementById("userPassword");
       
       if (userPassword.value == ""){
            errores.push("Debe ingresar un password")
       }else if (userPassword.value.length < 8){
            errores.push("El password debe contener al menos 8 caracteres")
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