/* -------------------- Funciones -------------------- */
function quantityProductsInCar (){
    return localStorage.shoppingCar ? JSON.parse(localStorage.shoppingCar).length : 0
}

/* -------------------- Lógica -------------------- */

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