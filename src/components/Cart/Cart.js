import { useContext } from 'react';

import classes from './Cart.module.css';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import ModContext from '../../store/modalShow-context';
import CartContext from '../../store/cart-context';

function Cart (props) {
    const modCtx = useContext(ModContext);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    function cartItemRemoveHandler(id) {
        cartCtx.removeItem(id)
    };

    function cartItemAddHandler(item) {
        cartCtx.addItem({...item, amount: 1});              //not sure how this works??
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem 
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)} 
                />
            ))}
        </ul>
    );                

    return (
        <Modal>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={modCtx.hideCart}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;