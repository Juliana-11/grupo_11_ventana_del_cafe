/* -------------------- Funciones -------------------- */
function setShoppingCarEmpty() {

}

function emptyShoppingCar() {
    localStorage.removeItem("shoppingCar");
}

function calculateTotal(products) {
    return products.reduce((acum, product) => {
        (acum += product.productPrice * product.quantity);
        0
    })
}

/* -------------------- Lógica -------------------- */
let cartRows = document.querySelector('.cartRows');
console.log(cartRows)
if (localStorage.shoppingCar) {

    let shoppingCar = JSON.parse(localStorage.shoppingCar);
    console.log(shoppingCar)
    shoppingCar.forEach((item, index) => {
        fetch(`/api/product/${item.id}`)
            .then(res => res.json())
            .then(product => {
                console.log(product)
                if(product){
                    cartRows.innerHTML += `
                        <tr id="row${index}">
                            <th scope="row">${index + 1}</th>
                            <td>${product.productName}</td>
                            <td>${product.productPrice}</td>
                            <td>${item.quantity}</td>
                            <td>${parseFloat(product.productPrice * item.quantity, 2).toFixed(2)}</td>
                            <td><button class="btn btn-warning btn-sm"><i class="fas fa-eye"></i></button></td>
                        </tr>`;
                }else{
                    shoppingCar.spli
                }
            })
    });
}