const express=require('express');
const app=express();
const morgan = require('morgan');
const bodyParser= require('body-parser');

const productsRoutes=require('./api/routes/products');
const ordersRoutes=require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Accept,Authoriuzation");
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT','POST','PATCH','DELETE');
    }
});

app.use('/products',productsRoutes);
app.use('/orders',ordersRoutes);
app.use((req,res,next)=>{
    const error=new Error('not found');
    error.status(404);
    next(erorr);
});

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message: error.message

        }
    });
});
module.exports=app;