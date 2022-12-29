import React, {useState, useEffect} from 'react';
import LastProductInDb from './LastProductInDB';
import LastUserInDB from './LastUserInDB';

function ContentRowCenter(){
    const [user, setUser] = useState()
    console.log("---------------");
    console.log(user)
    
    useEffect(()=>{
        fetch("http://localhost:3001/api/users")
        .then(res => res.json())
        .then(User => 
            setUser(User.listUser[User.Total - 1]))
    }, [])


    let LastUser= {
        id: user.id,
        name: user.userName,
        email: user.userEmail,
        image: user.userAvatar
    }

    const [product, setProduct] = useState()

    useEffect(()=>{
        fetch("http://localhost:3001/api/products")
        .then(res => res.json())
        .then(Product => setProduct(Product.listProducts[Product.Total - 1]))
    }, [])

    let LastProduct = {
        name: product.productName,
        price: product.productPrice,
    }

    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastProductInDb {...LastProduct}/>
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <LastUserInDB  {...LastUser}/>

        </div>
    )
}

export default ContentRowCenter;