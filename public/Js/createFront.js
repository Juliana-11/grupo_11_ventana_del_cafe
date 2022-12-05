//Taste
const button_add_create_taste = document.querySelector(".button-add-create-taste")
const modal_taste = document.querySelector(".modal-container-create-taste")
const button_close_create_taste = document.querySelector(".button-close-modal-create-taste")

button_add_create_taste.addEventListener("click", ()=>{
    modal_taste.classList.add("show-modal-create")
})

button_close_create_taste.addEventListener("click", ()=>{
    modal_taste.classList.remove("show-modal-create")
})

//Toast Level
const button_add_create_toast_level = document.querySelector(".button-add-create-toast-level")
const modal_toast_level = document.querySelector(".modal-container-create-toast-level")
const button_close_create_toast_level = document.querySelector(".button-close-modal-create-toast-level")

button_add_create_toast_level.addEventListener("click", ()=> {
    modal_toast_level.classList.add("show-modal-create")
})

button_close_create_toast_level.addEventListener("click", ()=>{
    modal_toast_level.classList.remove("show-modal-create")
})

//Validaciones
let form = document.querySelector(".formCreateProduct")
console.log(form)

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