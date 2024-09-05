import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './bottles.css';
import { addToLs, getStoredCart, removeFromLs } from "../../Utilities/localStorage";
import Cart from "../Cart/Cart";

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
        console.log(storedCart, bottles);
        const saveCart = [];

        for(const id of storedCart){
            console.log(id);
            const bottle = bottles.find(bottle =>bottle.id===id);
            if(bottle){
                saveCart.push(bottle)
            }
        }
        console.log('savedCart:',saveCart)
        setCart(saveCart)
       }
    },[bottles])

    const handleAddToCart = bottle =>{
        const newCart = [...cart,bottle];
        setCart(newCart);
        addToLs(bottle.id)
    }

    const handleRemoveFormCart = id =>{
        // visual cart remove
        const remainingCart = cart.filter(bottle => bottle.id !==id);
        setCart(remainingCart);
        // remove form local Storage
        removeFromLs(id);
    }

    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
            <Cart cart={cart} handleRemoveFormCart={handleRemoveFormCart}></Cart>
            <div className="bottle-container">
            {
              bottles.map(bottle => <Bottle key={bottle.id} bottle={bottle} handleAddToCart={handleAddToCart}></Bottle>)
            }   
            </div>
        </div>
    );
};

export default Bottles;