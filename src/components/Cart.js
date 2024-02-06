import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { formatPrice } from "./ProductDisplay";
import UserContext from "../contexts/UserContext";

const Cart = ({ cartItems, clearCart }) => {
  const navigate = useNavigate();
  const { profile, setProfile } = useContext(UserContext);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className='Cart'>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan='4'>Your cart is empty.</td>
            </tr>
          ) : (
            cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.imageUrl} alt={item.name} />
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
                  {`${profile?.country === "Nigeria" ? "₦" : "$"} ${
                    profile?.country === "Nigeria"
                      ? formatPrice(item.price * 1400)
                      : formatPrice(item.price)
                  }`}
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan='3'>Total</td>
            <td>
              {" "}
              {`${profile?.country === "Nigeria" ? "₦" : "$"} ${
                profile?.country === "Nigeria"
                  ? formatPrice(getTotalPrice() * 1400)
                  : formatPrice(getTotalPrice())
              }`}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className='cart-buttons'>
        <button onClick={goToCheckout} disabled={cartItems.length === 0}>
          Go to Checkout
        </button>
        <button onClick={clearCart} disabled={cartItems.length === 0}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
