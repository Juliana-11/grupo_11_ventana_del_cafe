const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const { json, raw } = require('express');
const db = require('../../database/models');
const { resolve } = require('path');
const { rejects } = require('assert');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Modelos
const Product = db.Product;
const Category = db.Category;
const Image = db.ProductImage;
const Taste = db.Taste;
const ToastLevel = db.ToastLevel;
const Product_taste = db.Product_taste


const productController = {
    index: (req, res) => {
        Product.findAll({
            include: [
                { model: db.Category, as: "associateCategory" },
                { model: db.ProductImage, as: "associateImage" }
            ],
            raw: true,
            nest: true
        })
            .then(productsResolve => {

                res.render('products/list', { productsResolve: productsResolve })
            })
    },

    car: (req, res) => {
        res.render('products/cart')
    },

    create: (req, res) => {
        let taste = Taste.findAll();
        let toastlevel = ToastLevel.findAll();
        let category = Category.findAll()
        Promise.all([taste, toastlevel, category])
            .then(([tastes, toastlevels, categories]) => {
                res.render('products/create', { tastes, toastlevels, categories })
            })

    },

    save: async (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const product = await Product.create({
                productName: req.body.productName,
                productPrice: req.body.productPrice,
                productDiscount: req.body.productDiscount,
                productDescription: req.body.description,
                originProduct: req.body.productOrigin,
                stock: req.body.productStock,
                category_id: req.body.category,
                toastLevel_id: req.body.toastlevel
            })
            console.log('------------------');
            console.log('Cree un producto');
            console.log('------------------');

            console.log('antes de imagen')
            const image = await Image.create({
                productImageName: req.file ? req.file.filename : 'defaultImage.png',
                product_id: product.id
            })
            console.log('------------------');
            console.log('Agregue la imagen');
            console.log('------------------');

            const taste = await Product_taste.create({
                taste_id: req.body.taste,
                product_id: product.id
            })
            console.log('------------------');
            console.log('Agregue el sabor');
            console.log('------------------');

            Promise.all([Product, image, taste])
                .then(() => {
                    console.log(req.body);
                    res.redirect('/product')
                })
        } else {
            let oldData = req.body;
            res.render('productCreateForm', { errors: errors.mapped(), oldData });
        }
    },

    delete: (req, res) => {
        let id = req.params.id;
        Image.destroy({
            where: { product_id: id }
        })
            .then(() => { console.log('Elimine imagen') })
        Product.destroy({
            where: { id: id }
        })
            .then(() => { console.log('Elimine producto') })
        res.redirect('/')
    },

    edit: (req, res) => {
        let taste = Taste.findAll();
        let product_taste = Product_taste.findAll();
        let toastlevel = ToastLevel.findAll();
        let category = Category.findAll();
        let product = Product.findByPk(req.params.id);
        let image = Image.findAll();
        Promise.all([taste, product_taste, toastlevel, category, product, image])
            .then(([tastes, product_tastes, toastlevels, categories, product, images]) => {
                let productFinally = product.dataValues
                res.render('products/edit', { tastes, product_tastes, toastlevels, categories, images, productFinally, toThousand })
            })
        /*
        let product = products.filter(aProduct => aProduct.id == id)
        res.render('product-edit-form', {
            product, toThousand
        })*/
    },

    update: (req, res) => {
        const idParams = req.params.id
        const imageOld = Image.findAll({ where: { product_id: idParams } })
        const imageOldName = imageOld.productImageName
        console.log(req.body);

        Product.update({
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productDiscount: req.body.productDiscount,
            productDescription: req.body.description,
            originProduct: req.body.productOrigin,
            stock: req.body.productStock,
            category_id: req.body.category,
            toastLevel_id: req.body.toastlevel
        }, { where: { id: idParams } })

        Image.update({
            productImageName: req.file ? req.file.filename : imageOldName
        }, { where: { product_id: idParams} })


        Product_taste.update({
            taste_id: req.body.taste
        }, { where: { product_id: idParams } })

        
        res.redirect('/product/'+ idParams)
    },


    newType: (req, res) => {
        let table = req.params.table
        if (table = "taste") {
            Taste.create({
                tasteName: req.body.newtaste
            })
                .then(() => {
                    res.redirect("/products/create")
                })
        } else if (table = "toast-level") {
            ToastLevel.create({
                toastLevelName: req.body.newtoast - level
            })
                .then(() => {
                    res.redirect("/products/create")
                })
        }
    },

    detail: (req, res) => {
        Product.findByPk(req.params.id, {
            include: [
                { model: db.Category, as: "associateCategory" },
                { model: db.ProductImage, as: "associateImage" },
                { model: db.ToastLevel, as: "associateToastLevelP" },
                { model: db.Taste, as: "associateProduct_taste" },
            ],
            raw: true,
            nest: true
        })
            .then(product => {
                console.log(product)
                let newPrice = 0;

                if (product.productdiscount != 0) {
                    console.log('entre')
                    let calculatePrice = ((product.productPrice * product.productDiscount) / 100);
                    let rest = product.productPrice - calculatePrice;
                    newPrice = rest;
                }

                res.render('products/detail', { product, newPrice, toThousand })
            })
    }
}

module.exports = productController;
