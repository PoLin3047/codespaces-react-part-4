const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
 
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE",
  );
  next();
});
app.use(express.json())
 
const products=[
  {id:0,name:"Notebook Acer Swift",price:45900,img:"https://img.advice.co.th/images_nas/pic_product4/A0147295/A0147295_s.jpg"},
  {id:1,name:"Notebook Asus Vivo",price:19900,img:"https://img.advice.co.th/images_nas/pic_product4/A0146010/A0146010_s.jpg"},
  {id:2,name:"Notebook Lenovo Ideapad",price:32900,img:"https://img.advice.co.th/images_nas/pic_product4/A0149009/A0149009_s.jpg"},
  {id:3,name:"Notebook MSI Prestige",price:54900,img:"https://img.advice.co.th/images_nas/pic_product4/A0149954/A0149954_s.jpg"},
  {id:4,name:"Notebook DELL XPS",price:99900,img:"https://img.advice.co.th/images_nas/pic_product4/A0146335/A0146335_s.jpg"},
  {id:5,name:"Notebook HP Envy",price:46900,img:"https://img.advice.co.th/images_nas/pic_product4/A0145712/A0145712_s.jpg"}];
 
app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
app.get('/api/products',(req,res)=>{
  if(products.length>0)
    res.send(products);
  else
    res.status(400).send("No products founds");
})
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 
 
import './Shop.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Item(props){
    return (<div key={props.id} onClick={()=>props.callback(props)}>
        <img src={props.img} width={200} height={200}/><br/>
        id: {props.id} <br/>
        name: {props.name}<br/>
        price: {props.price}<br/>
    </div>);
}
export default function Shop(){
        const [products,setProducts]=useState([]);
        const URL="https://probable-meme-wrv4j6vx472g7x4-5000.app.github.dev";
        useEffect(()=>{
            axios.get(URL+'/api/products')
            .then(response=>{
                setProducts(response.data);
            })
            .catch(error=>{
                console.log("error");
            });
        }
        ,[]);
        const [cart,setCart]=useState([]);
        function addCart(item){
         setCart([...cart,{id:item.id,name:item.name,price:item.price,img:item.img}]);
        }
        const productList=products.map(item=><Item {...item} callback={addCart}/>);
        const cartList=cart.map((item,index)=><li>{item.id} {item.name} {item.price}
        <button onClick={()=>{
            alert('you click'+index);
            setCart(cart.filter((i,_index)=>index!=_index));
        }}>
        Delete</button>
        </li>);
        let totalprice=0;
        for(let i=0;i<cart.length;i++){
            totalprice+=cart[i].price;
        }
        return (<>
        <div className='grid-container'>{productList}</div>
        <h1>Cart</h1>
        <button onClick={()=>setCart([])}>Clear all</button>
        <ol>{cartList}</ol>
        <h2>total price {totalprice} baht</h2>
        </>);
}
