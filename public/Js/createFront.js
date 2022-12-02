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