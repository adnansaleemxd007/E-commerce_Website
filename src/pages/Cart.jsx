import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem"
import { useEffect, useState } from "react";

const Cart = () => {
  const {cart} = useSelector((state) => state)
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect( () => {
    setTotalAmount(cart.reduce( (acc, curr) => acc + curr.price,0) )
  }, [cart])

  return (
    <div className="w-full max-w-[1000px] mx-auto pt-4 relative px-4 md:px-0">
      {
        cart.length > 0 ? 
        (<div className="flex flex-col lg:flex-row justify-between">
          <div className="mt-8 lg:mt-16 w-full lg:w-2/3">
            {
              cart.map((item, index) => (
                <CartItem key={index} item={item} />
              ))
            }
          </div>
          <div className="mt-12 lg:mt-32 flex flex-col justify-between h-auto lg:h-[500px] ml-0 lg:ml-8 w-full lg:w-1/3 mb-10">
            <div>
              <div className="uppercase text-green-700 font-semibold">Your Cart</div>
              <div className="uppercase text-green-700 font-bold text-4xl">Summary</div>
              <p className="mt-3 font-bold">
                <span>Total Item: {cart.length}</span>
              </p>
            </div>

            <div>
              <p className="">Total Amount: <span className="font-bold">${totalAmount.toFixed(2)}</span></p>
              <button className="mt-2 bg-green-700 w-full text-white py-2 rounded-md">Checkout Now</button>
            </div>
            
          </div>
        </div>) :

        (<div className="h-screen flex justify-center items-center flex-col">
          <h1>Your cart is Empty</h1>
          <Link to="/">
            <button className="bg-green-700 py-3 px-8 mt-3 rounded-lg text-white">
              Shop Now
            </button>
          </Link>
        </div>)
      }


    </div>
  );
};

export default Cart;


