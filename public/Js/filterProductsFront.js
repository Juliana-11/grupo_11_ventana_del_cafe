window.addEventListener("load",function(){
    //---------------------- filter product ----------------------//
    let filter_product_icono = document.querySelector(".icon-filter-list i");
    let container_filter_modal= document.querySelector(".containerFiltermodal");
    let cover_modal_option_header = document.querySelector(".cover-modal-option-header")


    /* funciones */
    //mostar
    function filter_product_show (){
        container_filter_modal.style.left = "0%"
        cover_modal_option_header.style.display = "block"
    }

    //ocultar
    function filter_product_disguise(){
        container_filter_modal.style.left = "-50%"
    }

    /* Lógica */
    filter_product_icono.addEventListener("click", filter_product_show)
    cover_modal_option_header.addEventListener("click", filter_product_disguise)


    //Agregar clase activo a todo
    let category_item_all = document.querySelector('.categoryItem[category="all"]')
    category_item_all.checked = true;

    let category_items = document.querySelectorAll('.categoryItem')

    for (let i = 0; i < category_items.length; i++) {
        category_items[i].addEventListener("click", function(){
            //Agregando activo al seleccionado
            category_items.checked = false;
            category_items[i].checked = true
        })  
    }
})