//---------------------- Taste ----------------------//
const button_add_create_taste = document.querySelector(".button-add-create-taste")
const modal_taste = document.querySelector(".modal-container-create-taste")
const button_create_taste = document.querySelector(".button-create-modal-taste")
const input_new_taste = document.querySelector(".input-modal-create input")
const close_modal = document.getElementById("cancel")
console.log(close_modal);
let cover_ctn_search = document.getElementById("coverContainerSearch");

/*Funciones*/
//Mostar
function modalTasteShow(){
    cover_ctn_search.style.display = "block"
    modal_taste.style.opacity = "1"
    input_new_taste.focus()
}

//Ocultar
function modalTasteDesguise(){
    cover_ctn_search.style.display = "none"
}

//Enviar
function modalTasteSend (){

}


button_add_create_taste.addEventListener("click", modalTasteShow)
close_modal.addEventListener("click", modalTasteDesguise)


//Toast Level
const button_add_create_toast_level = document.querySelector(".button-add-create-toast-level")
const modal_toast_level = document.querySelector(".modal-container-create-toast-level")
const button_close_create_toast_level = document.querySelector(".button-close-modal-create-toast-level")

//CRUD nuevas tablas


//Validaciones
let form = document.querySelector(".formCreateProduct")

form.addEventListener("submit", (event)=>{
    let errores = [];

    if(errores.length > 0){
        event.preventDefault
        let ulErrores = document.querySelector(".errores")
        errores.forEach(error => {
            ulErrores.innerText +=`<li>${error}<li>`
        })
    }
    
    let productName = document.querySelector("#name")
    if(productName == ""){
        errores.push("El campo name debe estar lleno")
    }else if(productName.length < 5){
        errores.push("El nombre es demasiado corto")
    }

})