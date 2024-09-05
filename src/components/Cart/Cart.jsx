import PropTypes from 'prop-types';
import './cart.css'

const Cart = ({cart,handleRemoveFormCart}) => {
    return (
        <div>
            <h4>Cart:{cart.length}</h4>
            <div className="cart-container">
                {
                    cart.map(bottle => <div key={bottle.id}>
                        <img src={bottle.img}></img>
                        <button onClick={()=>handleRemoveFormCart(bottle.id)}>Remove</button>
                    </div>)
                }
            </div>
        </div>
    );
};

Cart.propTypes ={
    cart: PropTypes.array.isRequired,
    handleRemoveFormCart: PropTypes.func.isRequired
}

export default Cart;