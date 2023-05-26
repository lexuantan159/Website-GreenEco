import React, { useState } from "react";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: 10, quantity: 1 },
    { id: 2, name: "Product 2", price: 15, quantity: 2 },
    { id: 3, name: "Product 3", price: 20, quantity: 3 },
  ]);

  const calculateTotal = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleCheckout = () => {
    // TODO: Handle the checkout logic
    console.log("Checkout");
  };

  return (
    <div className="container mx-auto w-[800px] mb-16 my-48">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="">
        <div className="w-full">
          <div className="mb-20">
            <div className="text-xl font-bold flex justify-between">
              <h1 className="text-left">Products</h1>
              <h1>Price</h1>
              <h1>Quantity</h1>
              <h1>Total</h1>
            </div>
          </div>
          <div>
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between mb-2">
                <div className="text-left">{product.name}</div>
                <div>${product.price}</div>
                <div>
                  <input
                    className="mx-auto"
                    type="number"
                    min="0"
                    value={product.quantity}
                    onChange={(e) =>
                      updateQuantity(product.id, parseInt(e.target.value))
                    }
                  />
                </div>
                <div>${product.price * product.quantity}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="flex justify-between font-bold mb-2">
              <div>Total:</div>
              <div>${calculateTotal()}</div>
            </div>
            <div>
              <div className="flex">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleCheckout}
                >
                  Check Out
                </button>
                <Link to="/products">
                  <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
