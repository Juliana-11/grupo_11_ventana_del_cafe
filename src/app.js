/*Requerir*/
//Librerias 
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const recordarmeMiddleware = require('./middleware/recordarmeMiddleware');
const bodyParse = require('body-parser')
const cors = require('cors');

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
app.use(cors());
//app.use(recordarmeMiddleware);

//Rutas
const mainRouter = require('./routes/mainRouters'); 
const productRouters = require('./routes/productRouters');
const usersRouters = require('./routes/usersRouters');
const apiRouters = require('./routes/api/apiRouters');
const usersRoutersApi = require('./routes/api/usersRoutersApi');
const productsRoutersApi = require('./routes/api/productsRoutersApi');
/*Codigo*/
app.use('/', mainRouter);
app.use('/api', apiRouters)
app.use('/product', productRouters);
app.use('/users', usersRouters);
app.use('/api/users',usersRoutersApi);
app.use('/api/products',productsRoutersApi);
app.use((req, res, next) => { res.status(404).render('main/error404') });

app.listen(3001, ()=>console.log('Puerto 3001 corriendo'));




