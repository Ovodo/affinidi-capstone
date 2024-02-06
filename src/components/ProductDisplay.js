import React, { useContext, useEffect, useState } from "react";
import "./ProductDisplay.css";
import UserContext from "../contexts/UserContext";

export const formatPrice = (price) => {
  // Convert the price to a string
  const priceString = price.toString();

  // Check if the price has more than four digits
  if (priceString.length > 4) {
    // Add commas before the last three digit pairs
    return priceString.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }

  // Return the original price if it has four digits or fewer
  return priceString;
};

const ProductDisplay = ({ addToCart }) => {
  const maleProducts = [
    { id: 1, name: "Hoodie", price: 10, imageUrl: "men1.jpg" },
    { id: 2, name: "T-Shirt", price: 15, imageUrl: "men2.jpg" },
    { id: 3, name: "T-Shirt", price: 15, imageUrl: "men3.jpg" },
    { id: 4, name: "T-Shirt", price: 15, imageUrl: "men4.jpg" },
    { id: 5, name: "T-Shirt", price: 15, imageUrl: "men5.jpg" },
  ];
  const femaleProducts = [
    { id: 1, name: "Hoodie", price: 10, imageUrl: "women1.jpg" },
    { id: 2, name: "T-Shirt", price: 15, imageUrl: "women2.jpg" },
    { id: 3, name: "T-Shirt", price: 15, imageUrl: "women3.jpg" },
    { id: 4, name: "T-Shirt", price: 15, imageUrl: "women4.jpg" },
    { id: 5, name: "T-Shirt", price: 15, imageUrl: "women5.jpg" },
  ];
  const { profile, setProfile } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log(profile?.gender);
    setProducts(profile?.gender === "male" ? maleProducts : femaleProducts);
  }, [profile]);

  return (
    <div>
      <div>
        <button onClick={() => setProducts(maleProducts)}>Male</button>
        <button onClick={() => setProducts(femaleProducts)}>Female</button>
      </div>
      <div className='ProductDisplay'>
        {products.map((product) => (
          <div key={product.id} className='ProductItem'>
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>
              {`${profile?.country === "Nigeria" ? "₦" : "$"} ${
                profile?.country === "Nigeria"
                  ? formatPrice(product.price * 1400)
                  : formatPrice(product.price)
              }`}
            </p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
