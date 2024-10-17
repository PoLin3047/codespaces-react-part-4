import './Shop.css';
import { useState } from 'react';

function Item(props) {
    return (
        <div key={props.id} onClick={() => props.callback(props)} className="item">
            <img src={props.img} width={200} height={200} alt={props.name} /><br />
            id: {props.id} <br />
            name: {props.name}<br />
            price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.price / 100)}<br />
        </div>
    );
}

export default function Shop() {
    const products = [
        { id: 0, name: "Notebook Acer Swift", price: 45900, img: "https://img.advice.co.th/images_nas/pic_product4/A0147295/A0147295_s.jpg" },
        { id: 1, name: "Notebook Asus Vivo", price: 19900, img: "https://img.advice.co.th/images_nas/pic_product4/A0146010/A0146010_s.jpg" },
        { id: 2, name: "Notebook Lenovo Ideapad", price: 32900, img: "https://img.advice.co.th/images_nas/pic_product4/A0149009/A0149009_s.jpg" },
        { id: 3, name: "Notebook MSI Prestige", price: 54900, img: "https://img.advice.co.th/images_nas/pic_product4/A0149954/A0149954_s.jpg" },
        { id: 4, name: "Notebook DELL XPS", price: 99900, img: "https://img.advice.co.th/images_nas/pic_product4/A0146335/A0146335_s.jpg" },
        { id: 5, name: "Notebook HP Envy", price: 46900, img: "https://img.advice.co.th/images_nas/pic_product4/A0145712/A0145712_s.jpg" }
    ];

    const [cart, setCart] = useState([]);

    function addCart(item) {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    }

    function clearCart() {
        setCart([]);
    }

    const productList = products.map(item => <Item key={item.id} {...item} callback={addCart} />);
    const cartList = cart.map(item => (
        <li key={item.id}>
            {item.id} {item.name} {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price / 100)} x {item.quantity || 1}
        </li>
    ));

    return (
        <>
            <div className='grid-container'>{productList}</div>
            <h1>Cart</h1>
            <ol>{cartList}</ol>
            <button onClick={clearCart} disabled={cart.length === 0}>
                Clear Cart
            </button>
        </>
    );
}
