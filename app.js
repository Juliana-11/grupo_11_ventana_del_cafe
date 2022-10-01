/*Requerir*/
//Librerias 
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

//Rutas
const mainRouter = require('./src/routes/mainRouters'); 
const productRouters = require('./src/routes/productRouters');
const usersRouters = require('./src/routes/usersRouters');

/*Configuraciones*/
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './public')));
app.use(methodOverride('_method'));

/*Codigo*/
app.use('/', mainRouter);
app.use('/product', productRouters)
app.use('/users', usersRouters)

app.listen(3000, ()=>console.log('Puerto 3000 corriendo'));


