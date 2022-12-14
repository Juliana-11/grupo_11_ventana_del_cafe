window.addEventListener("load",function(){
    //---------------------- filter product ----------------------//
    let iconsettingsDetail = document.querySelector(".settingsDetail i");
    let ctn_optionsDetail = document.querySelector(".optionsDetail");
    let cover_modal_option_header = document.querySelector(".cover-modal-option-header")


    /* funciones */
    //mostar
    function optionsDetail_show (){
        cover_modal_option_header.style.display = "block"
        ctn_optionsDetail.style.opacity = "1"
    }

    //ocultar
    function optionsDetail_disguise(){
        ctn_optionsDetail.style.opacity = "0"
        cover_modal_option_header.style.display = "none"
    }

    /* Lógica */
    iconsettingsDetail.addEventListener("click", optionsDetail_show)
    cover_modal_option_header.addEventListener("click", optionsDetail_disguise)
})