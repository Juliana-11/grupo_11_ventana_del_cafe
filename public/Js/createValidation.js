//Validaciones
window.addEventListener("load",function(){
    let form = document.querySelector(".formCreateProduct")

    form.addEventListener("submit", (event)=>{
        let errores = [];

        let productName = document.querySelector("#name");
        if(productName == ""){
            errores.push("El campo nombre debe estar lleno")
        }else if(productName.length < 5){
            errores.push("El nombre es demasiado corto")
        };

        let productOrigin = document.querySelector("#productOrigin");
        if(productOrigin == ""){
            errores.push("El campo origen del producto debe estar lleno")
        }else if(productOrigin.length < 5){
            errores.push("El origen del producto es demasiado corto")
        };

        let description = document.querySelector("#description");
        if(description == ""){
            errores.push("El campo descripción debe estar lleno")
        }else if(description.length < 20){
            errores.push("La descripción es demasiado corto")
        } else if(description.length > 500){
            errores.push("La descripción es demasiado larga")
        }

        if(errores.length > 0){
            event.preventDefault
            let ulErrores = document.querySelector(".errores")
            errores.forEach(error => {
                ulErrores.innerText +=`<li>${error}<li>`
            })
        }

    })
})