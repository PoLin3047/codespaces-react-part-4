import { useEffect, useState } from 'react';
import axios from 'axios';

function Item({ id, img, name, price, callback }) {
    return (
        <div key={id} onClick={() => callback({ id, img, name, price })}>
            <img src={img} width={200} height={200} alt={name} /><br />
            id: {id} <br />
            name: {name}<br />
            price: {price}<br />
        </div>
    );
}

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const URL = "https://orange-space-spork-49w9vw57pqv35xp6.github.dev/";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${URL}/api/products`);
                setProducts(response.data);
            } catch (error) {
                setError("Error fetching products");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addCart = (item) => {
        setCart([...cart, item]);
    };

    const totalprice = cart.reduce((total, item) => total + item.price, 0);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const productList = products.map(item => (
        <Item {...item} callback={addCart} />
    ));

    const cartList = cart.map((item, index) => (
        <li key={index}>
            {item.id} {item.name} {item.price}
            <button onClick={() => {
                setCart(cart.filter((_, _index) => index !== _index));
            }}>
                Delete
            </button>
        </li>
    ));

    return (
        <>
            <div className='grid-container'>{productList}</div>
            <h1>Cart</h1>
            <button onClick={() => setCart([])}>Clear all</button>
            <ol>{cartList}</ol>
            <h2>Total price: {totalprice} baht</h2>
        </>
    );
}
