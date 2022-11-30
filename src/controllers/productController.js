const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const { json, raw } = require('express');
const db=  require('../../database/models');

//data
const productsDataPath = path.join(__dirname, '../../data/productsDataBase.json')
const products = JSON.parse(fs.readFileSync(productsDataPath, 'utf-8'))
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Modelos
const Product = db.Product;
const Category = db.Category; 
const Image = db.Productimage;
const Taste = db.Taste;
const Toastlevel = db.Toastlevel;
const Product_taste = db.Product_taste

const productController = {
    index: (req, res)=>{
        Product.findAll({
            include:[
                {model: db.Category, as: "associateCategory"},
                {model: db.Productimage, as: "associateImage"}
            ],
            raw: true,
            nest: true
        })
        .then(productsResolve => {
           
            res.render('products/products', {productsResolve:productsResolve})
        })
    },
    car: (req, res)=>{
        res.render('products/cart')
    },
    create: (req, res)=>{
        let taste = Taste.findAll();
        let toastlevel = Toastlevel.findAll();
        let category = Category.findAll()
        Promise.all([taste, toastlevel, category])
        .then(([tastes, toastlevels, categories]) => {
            res.render('products/create', {tastes, toastlevels, categories})
        })
       
    },
    save: (req, res)=>{
        let errors = validationResult(req);
       
        if(errors.isEmpty()){
            /*<<<<<<<<<<<<<<<PROMESAS INDEPENDIENTES>>>>>>>>>>>>>>>*/
            
            

            /*<<<<<<<<<<<<<<<PROMESAS DEPENDIENTES>>>>>>>>>>>>>>>*/
            //Guardar la promesa padre
            let products = Product.findAll();

            //Se atiende a la respuesta de busqueda de id
            const ultimoId = products .then(products => {
                /*Cantidad de elementos*/
                const largor = products.length
                /*Busqueda de último elemento*/
                const ultimoElemento = products[largor - 1]
                /*Acceso al último elemento*/
                const analicis = ultimoElemento.dataValues.id
                
                return analicis
            })

            ultimoId .then( id => {
                Image.create({
                    productimagename: req.file ? req.file.filename : 'defaultImage.png',
                    product_id: id + 1
                })             
            })

            ultimoId .then(id => {
                Product_taste.create({
                    taste_id: req.body.taste,
                    product_id: id + 1
                })
            })
            
            .then( () => res.redirect('/product'))

        }else {
            let oldData = req.body;
            res.render('productCreateForm', {errors: errors.mapped(), oldData});
        }
    },
    delete: (req, res) =>{
        let id = req.params.id;
        Image.destroy({
            where:{product_id: id}
        })
        .then(() => {console.log('Elimine imagen')})
        Product.destroy({
            where:{idproduct: id}
        })
        .then(() => {console.log('Elimine producto')})
        /*let finalProducts = products.filter((product) => product.id != id);
        fs.writeFileSync(productsDataPath, JSON.stringify(finalProducts, null, ' '));*/
        res.redirect('/')
    },
    edit: (req, res) =>{
        Product.findByPk(req.params.id)
            .then(product => {
                res.render('products/edit', {product, toThousand})
            })
        /*
        let product = products.filter(aProduct => aProduct.id == id)
        res.render('product-edit-form', {
            product, toThousand
        })*/
    },
    update: (req, res) =>{
        let id = req.params.id
		//let producToEdit = products.find(product => product.id == id)
        Image.update({
            productimageaddress: req.file ? req.file.filename : 'defaultImage.png'
        },{
            where: {product_id: id}  
        })

        Product.update({
            productname: req.body.productName,
            productprice: req.body.productPrice,
            productdiscount: req.body.productDiscount,
            productdescription: req.body.description,
            stock: req.body.productStock,
            category_id: req.body.category
        },
        {
            where: {idproduct: id}
        })
        /*

		producToEdit ={
			id: producToEdit.id,
			...req.body,
			image: producToEdit.image
		};

		let newProducts = products.map(product=>{
			if (product.id == producToEdit.id){
				return product = {...producToEdit}
			}
			return product;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));*/
		res.redirect('/products/');
        
        //res.render('products/detail')
    },
    detail: (req, res)=>{
        Product.findByPk(req.params.id, {
            include:[
                {model: db.Category, as: "associateCategory"},
                {model: db.Productimage, as: "associateImage"},
                {model: db.Toastlevel, as: "associateToastlevelP"},
                {model: db.Taste, as: "associateProduct_taste"},
                {model: db.User, as: "associateBuys"}
            ],
            raw: true,
            nest: true
        })
        .then(product => {
            console.log(product)
            let newPrice = 0;

            if(product.productdiscount != 0){
                console.log('entre')
                let calculatePrice = ((product.productprice * product.productdiscount) / 100);
                let rest = product.productprice - calculatePrice;
                newPrice = rest;
            }
            
            res.render('products/detail', {product, newPrice, toThousand})
        })
    }
}

module.exports = productController;
