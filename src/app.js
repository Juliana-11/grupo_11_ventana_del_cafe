/*Requerir*/
//Librerias 
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
let session = require('express-session');
const cookieParser = require('cookie-parser');
const recordarmeMiddleware = require('./middleware/recordarmeMiddfleware');
const bodyParse = require('body-parser')

//Rutas
const mainRouter = require('./routes/mainRouters'); 
const productRouters = require('./routes/productRouters');
const usersRouters = require('./routes/usersRouters');
const usersRoutersApi = require('./routes/api/usersRoutersApi');
const productsRoutersApi = require('./routes/api/productsRoutersApi');


/*Configuraciones*/
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'Nombre del sitio',
    resave: false,
    saveUninitialized: true,
    }));
app.use(cookieParser());
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:true}));
//app.use(recordarmeMiddleware);

/*Codigo*/
app.use('/', mainRouter);
app.use('/product', productRouters);
app.use('/users', usersRouters);
app.use('/api/users',usersRoutersApi);
app.use('/api/products',productsRoutersApi);
app.use((req, res, next) => { res.status(404).render('main/error404') });

app.listen(3000, ()=>console.log('Puerto 3000 corriendo'));




