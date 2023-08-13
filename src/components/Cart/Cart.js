import React from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import { useContext, useState } from 'react'
import CartItem from './CartItem'

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  }

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  }

  const cartItems = 
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem 
          key={item.id} 
          name={item.name} 
          amount={item.amount} 
          price={item.price} 
          onRemove={cartItemRemoveHandler.bind(null, item.id)} 
          onAdd={cartItemAddHandler.bind(null, item)}
          >
        </CartItem>)
      )}
    </ul>
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const [showFlashMessage, setShowFlashMessage] = useState(false);

    const handleOrderClick = () => {
        cartCtx.placeOrder();

        setShowFlashMessage(true);

        setTimeout(() => {
            setShowFlashMessage(false);
        }, 5000);
    };

  return (
    <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={handleOrderClick}>Order</button>}
        </div>
        {showFlashMessage && <div className={classes.flashMessage}>Order placed successfully!</div>}
    </Modal>
  )
}

export default Cart;
