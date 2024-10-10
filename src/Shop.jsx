import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Shop(){
const baseURL = "http://localhost:3001"
const myInputRef1 = React.createRef()
const myInputRef2 = React.createRef()
const [products,setproducts] = useState([])
    React.useEffect(() =>{
            axios.get(baseURL + '/api/products')
            .then(response => {
                setproducts(response.data)
            })
    },[])
    const onDeleteProduct = (id) => {
        console.log(id)
        axios.delete(baseURL+"/api/products"+id)
        .then((response) =>{
            setProductState(response.data)
        })
    }
    const onClick = (id) => {
        console.log(myInputRef1.current.value)
        console.log(myInputRef2.current.value)
        const data={
            name:myInputRef1.current.value,
            price:myInputRef2.current.value
        }
        axios.put(baseURL+"/api/products/"+id,data).then((response) => {
            setProductState(response.data)
        })
    }
    const onAddProduct =()=>{
        console.log(myInputRef1.current.value)
        console.log(myInputRef2.current.value)
    const data = {
        name:myInputRef1.current.value,
        price:myInputRef2.current.value
    }
    axios.put(baseURL+"/api/products/"+id,data).then((response) => {
        setProductState(response.data)
    })
    if(!productState) return null;
    const show_product = productState.map((item)=>{
        return (<tr> key = {item.id}<td>{item.id}</td><td>{item.name}</td><td>{item.price}</td><td></td></tr>)

        })
    }
}