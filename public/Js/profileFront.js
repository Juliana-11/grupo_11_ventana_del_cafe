window.addEventListener("load",function(){
    //---------------------- filter product ----------------------//
    let iconsettingsProfile = document.querySelector(".settingsProfile i");
    let ctn_optionsProfile = document.querySelector(".optionsProfile");
    let cover_modal_option_header = document.querySelector(".cover-modal-option-header")


    /* funciones */
    //mostar
    function optionsProfile_show (){
        cover_modal_option_header.style.display = "block"
        ctn_optionsProfile.style.opacity = "1"
    }

    //ocultar
    function optionsProfile_disguise(){
        ctn_optionsProfile.style.opacity = "0"
        cover_modal_option_header.style.display = "none"
    }

    /* Lógica */
    iconsettingsProfile.addEventListener("click", optionsProfile_show)
    cover_modal_option_header.addEventListener("click", optionsProfile_disguise)
})