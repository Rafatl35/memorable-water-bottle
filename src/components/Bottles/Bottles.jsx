import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './bottles.css';
import { addToLs, getStoredCart } from "../../Utilities/localStorage";

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart,setCart]= useState([])

    useEffect(()=>{
        fetch('bottles.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    },[])

    // load card from local storage
    useEffect(()=>{
        console.log('colled the useEffect:',bottles.length)
       if(bottles.length > 0){
        const storedCart = getStoredCart();
        console.log(storedCart);
       }
    },[bottles])

    const handleAddToCart = bottle =>{
        const newCart = [...cart,bottle];
        setCart(newCart);
        addToLs(bottle.id)
    }

    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
            <h4>Cart:{cart.length}</h4>
            <div className="bottle-container">
            {
              bottles.map(bottle => <Bottle key={bottle.id} bottle={bottle} handleAddToCart={handleAddToCart}></Bottle>)
            }   
            </div>
        </div>
    );
};

export default Bottles;