import React, {useState, useEffect} from 'react';
import SmallCard from './SmallCard';

function ContentRowMovies(){ 
    const [totalProducts, setTotalProducts] = useState();
    
    useEffect(()=>{
        fetch("http://localhost:3001/api/products")
        .then(res => res.json())
        .then(products => {
            setTotalProducts(products.Total)
        })
        .catch(error => console.log(error))
    }, [])

    /*  Cada set de datos es un objeto literal */

    /* <!-- Movies in DB --> */

    let ProductsInDB = {
        title: 'Products in Data Base',
        color: 'primary', 
        cuantity: totalProducts,
        icon: 'fa-clipboard-list'
    }

    /* <!-- Total awards --> */

    const [totalUser, setTotalUsers] = useState()

    useEffect(()=>{
        fetch("http://localhost:3001/api/users")
        .then(res => res.json())
        .then(Users => {
            setTotalUsers(Users.Total)
        })
        .catch(error => console.log(error))
    }, [])

    let usersInDB = {
        title:'Users in Data Base', 
        color:'success', 
        cuantity: totalUser,
        icon:'fa-award'
    }

    let cartProps = [ProductsInDB, usersInDB];

    return (
    
        <div className="row">
            
            {cartProps.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowMovies;