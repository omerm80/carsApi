const express=require('express');
const router=express.Router();
const https = require('https');

router.get('/',(req,res,next)=>{

    https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
    let data = '';
  
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data).explanation);
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
    res.status(200).json({
        
        message:'Handling get request to /products',
        
    });
});




router.post('/',(req,res,next)=>{
    const product={
        manufacturer:req.body.manufacturer,
        model:req.body.model,
        priceInUSD:req.body.priceInUSD,
        wiki:req.body.wiki
    }
    res.status(201).json({
        message:'Handling post request to /products',
        createdProduct:product
    });
});


router.get('/:productId',(req,res,next)=>
{
    const id=req.params.productId;
    if(id==='special')
    {
        res.status(200).json({
            message:'you discovered the specialID',
            id:id
        });
    }
    else{
        res.status(200).json({
            message:'You passed an ID'
        });
    }
});




router.patch('/:productId',(req,res,next)=> {
    res.status(200).json({
        message:'update product!'
    });
});

router.delete('/:productId',(req,res,next)=>
{
    res.status(200).json({
        message:'delete product!'
    });
});

module.exports=router;