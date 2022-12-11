                            //---------------------- Carrito ----------------------//

/* Funciones */
function quantityProductsInCar (){
    return localStorage.shoppingCar ? JSON.parse(localStorage.shoppingCar).length : 0
}

/* Lógica */

/*Llamar al boton comprar y Llamar al icono de carrito en header */
let botonesComprar = document.querySelectorAll(".agregarCarrito")
let carNumber = document.querySelector(".carNumber")
carNumber.innerText = quantityProductsInCar();

botonesComprar.forEach((boton)=>{
    //escuchar el click
    boton.addEventListener("click",(e)=>{
        //Formato que pueda leer el localStorage y variables
        let dataShoppingCar = {
            id: e.target.dataset.id,
            quantity: 1
        };
        let stringifyCar = JSON.stringify([dataShoppingCar]);
        let data_id = e.target.dataset.id;

        //Hay carrito en localStorage
        if(localStorage.shoppingCar){

            //Lo leo
            let shoppingCar = JSON.parse(localStorage.shoppingCar)
            let exists = shoppingCar.findIndex((product) => product.id == data_id);
            if(exists != -1){
                //Sumo uno si el producto existe dentro del carrito
                shoppingCar[exists].quantity++
            }else{
                //Agrego con push si el producto o existe en el carrito
                shoppingCar.push({dataShoppingCar})
            }
            localStorage.setItem('shoppingCar', JSON.stringify(shoppingCar));

        }else{
            //Si no hay lo creo
            localStorage.setItem('shoppingCar', stringifyCar)
        }
        alert('Se agrego un producto al carrito')
        carNumber.innerText = quantityProductsInCar();
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