/* -------------------- Funciones -------------------- */
function setShoppingCarEmpty (){

}

function emptyShoppingCar (){
    localStorage.removeItem("shoppingCar");
}

function calculateTotal (products) {
    return products.reduce((acum, product) => {
        (acum += product.productPrice * product.quantity);
        0
    })
}

/* -------------------- Lógica -------------------- */
if(localStorage.shoppingCar){
    let shoppingCar = JSON.parse(localStorage.shoppingCar);
    console.log(shoppingCar)
}