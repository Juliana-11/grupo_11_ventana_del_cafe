//---------------------- Carrito ----------------------//

/* Funciones */

function productosEnElCarrito(){
    return localStorage.carrito ? JSON.parse(localStorage.carrito).length : 0
}
/* Lógica */
console.log(productosEnElCarrito());

/*Llamar al boton comprar y Llamar al icono de carrito en header */
let botonesComprar = document.querySelectorAll(".agregarCarrito");
let carNumber = document.querySelector(".containerNumberCar p");
carNumber.innerText = productosEnElCarrito()


botonesComprar.forEach((boton) => {
    //escuchar
    boton.addEventListener("click", (e) => {
        if(localStorage.carrito){
            let carrito = JSON.parse(localStorage.carrito)
            let index = carrito.findIndex((product) => product.id == e.target.dataset.id)
            if(index != -1){
                carrito[index].quantity++
            }else{
                carrito.push({id: e.target.dataset.id, quantity: 1})
            }
            localStorage.setItem("carrito", JSON.stringify(carrito))
        }else{
            localStorage.setItem(
                "carrito",
                JSON.stringify([{id: e.target.dataset.id, quantity: 1}])
            )
        }
        alert('Se agrego este producto al carrito')
        carNumber.innerText = productosEnElCarrito()
    })
})


//---------------------- Buscador ----------------------//
let ctn_bar_search = document.getElementById("containerBarSearch");
let cover_ctn_search = document.getElementById("coverContainerSearch");
let input_search = document.getElementById("inputSearch");
let box_search = document.getElementById("boxSearch");
let icon_search = document.getElementById("iconSearch")

/* Funciones */
//mostrar
function search_show(){
    ctn_bar_search.style.top = "90px"
    cover_ctn_search.style.display = "block"
    input_search.focus();

    if(input_search.value == ""){
        box_search.style.display = "none";
    }
}

//ocultar
function search_disguise(){
    ctn_bar_search.style.top = "-10px";
    cover_ctn_search.style.display = "none"
    input_search.value = ""
    box_search.style.display = "none";
}

//Resultados de busqueda
function search_internal(){
    let filter = input_search.value.toUpperCase()
    let li = box_search.getElementsByTagName("li");

    /**Recoriendo los elementos a filtrar **/
    for (let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName("a")[0];
        let textValue = a.textContent || a.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = "";
            box_search.style.display = "block";

            if(input_search.value == ""){
                box_search.style.display = "none";
            }


        }else{
            li[i].style.display = "none"
        }
    }
}

/* Logica */
icon_search.addEventListener("click", search_show);
cover_ctn_search.addEventListener("click", search_disguise);
input_search.addEventListener("keyup", search_internal);

//---------------------- burguer menu ----------------------//
let optionIcono = document.querySelector(".part-2-header i");
let modal_option_header = document.querySelector(".modal-option-header")
let cover_modal_option_header = document.querySelector(".cover-modal-option-header")

/* Funciones */
//mostrar
function burguer_menu_show (){
    modal_option_header.style.left = "40%"
    cover_modal_option_header.style.display = "block"
}

//ocultar
function burguer_menu_disguise(){
    modal_option_header.style.left = "100%"
    cover_modal_option_header.style.display = "none"
}

/* Lógica */
optionIcono.addEventListener("click", burguer_menu_show)
cover_modal_option_header.addEventListener("click", burguer_menu_disguise)

