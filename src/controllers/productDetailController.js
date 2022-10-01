const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const { json } = require('express');

//data
const productsDataPath = path.join(__dirname, '../../data/productsDataBase.json')
const products = JSON.parse(fs.readFileSync(productsDataPath, 'utf-8'))
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productDetailController = {
    index: (req, res)=>{
        res.send('listar')
    },
    create: (req, res)=>{
        res.render('products/productCreateForm');
    },
    save: (req, res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty){
            let newProduct = {
                id: products.length == 0? 1 : products[products.length - 1].id + 1,
                productName: req.body.name,
                productPrice: req.body.price,
                productDiscount: req.body.discount,
                productsCategory: req.body.category,
                productsImage: req.file? req.file.filename : 'defaultImage.png'
            }
            products.push(newProduct);
            fs.writeFileSync(productsDataPath,JSON.stringify(products),'utf-8');
            res.render('products/productCreateForm')
        }else {
            let oldData = req.body;
            res.render('productCreateForm', {errors: errors.mapped(), oldData});
        }
        
    },
    detail: (req, res)=>{
        let id = req.params.id
        let product = products.filter(aProduct => aProduct.id == id)
        res.render('productDetail', {
            product, toThousand
        })
    },
    delete: (req, res) =>{
        let id = req.params.id;
        let finalProducts = products.filter((product) => product.id != id);
        fs.writeFileSync(productsDataPath, JSON.stringify(finalProducts, null, ' '));
        res.redirect('/')
    },
    edit: (req, res) =>{
        let id = req.params.id
        let product = products.filter(aProduct => aProduct.id == id)
        res.render('product-edit-form', {
            product, toThousand
        })
    },
    update: (req, res) =>{
        let id = req.params.id
		let producToEdit = products.find(product => product.id == id)

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
		products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.redirect('/products/');
        
        res.render('products/detail')
    }
}



module.exports = productDetailController;