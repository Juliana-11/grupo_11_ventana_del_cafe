window.addEventListener("load",function(){
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