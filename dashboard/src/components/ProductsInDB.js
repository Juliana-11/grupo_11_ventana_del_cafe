import React, {Component} from 'react';

class productsInDB extends Component {

    constructor(){
        super()
        this.state = {
            productList : []
        }
    }

    componentDidMount(){
        console.log("Me monte")

        fetch("api/products")
        .then(respuesta => respuesta.json())
        .then(products => {
            this.setState({productList: products.data})
            console.log("------Lista de productos----------");
        })
        .catch(error => console.log(error))
    }
}