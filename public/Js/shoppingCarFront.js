/* -------------------- Funciones -------------------- */
function setShoppingCarEmpty() {

}

function emptyShoppingCar() {
    localStorage.removeItem("shoppingCar");
}

const products = [];
function calculateTotal(){
    let acum = 0 ;
    for (let i = 0; i < products.length; i++) {
        acum =+ (products[i].productPrice * products[i].quantity)
    }
    return acum;
};



/* -------------------- Lógica -------------------- */
let cartRows = document.querySelector('.cartRows');


if (localStorage.shoppingCar) {

    let shoppingCar = JSON.parse(localStorage.shoppingCar);
    shoppingCar.forEach((item, index) => {
        fetch(`/api/product/${item.id}`)
            .then(res => res.json())
            .then(product => {
                if(product){
                    products.push({
                        originalProduct_id: product.id,
                        productName: product.productName,
                        productPrice: product.productPrice,
                        quantity: item.quantity
                    })
                    cartRows.innerHTML += `
                        <div class="infoCar">
                            <div class="partOneCar">
                                <p class="indexCar">${index + 1}</p>
                                <p class="nameCar">${product.productName}</p>
                            </div>
                            <div class="partTwoCar">
                                <p class="priceCar">${product.productPrice}</p>
                                <p class="quantityCar">${item.quantity}</p>
                                <p class="subtotalCar">${parseFloat(product.productPrice * item.quantity, 2)}</p>
                                <button class="buttonTrashCar"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </div>`;
                        
                }else{
                    shoppingCar.splice(index, 1)
                    localStorage.setItem("shoppingCar", JSON.stringify(shoppingCar))
                }
            }).then(() => {
                let total = document.querySelector(".totalAmount");
                total.innerText = products != [] ? `$ ${calculateTotal()}` : "$ 0"
            })
        });
}

let checkoutCar = document.querySelector("#checkoutCar");


checkoutCar.addEventListener("submit", (e)=>{
    e.preventDefault();
    const formData = {
        orderItems: products,
        PaymentMethod: checkoutCar.paymentMethod.value,
        shippingMethod: checkoutCar.shippingMethod.value,
        total: calculateTotal(products)
    }
    console.log(formData)
    fetch("/api/checkout", {
        method: "POST",
        headers:{
            "content-Type":"application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(r => r.json())
    .then(res => {
        if(res.ok){
            emptyShoppingCar()
            location.href = `/user/profile/${res.order.id}`
        }
    })
    console.log(formData)
})
