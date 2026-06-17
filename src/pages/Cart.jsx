import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import CheckoutModal from "../components/CheckoutModal";
import { useEffect, useState } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        {cart.length > 0 ? (
          <>
            {/* Page header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-navy-900">Shopping Cart</h1>
              <p className="text-sm text-gray-400 mt-1">{cart.length} item{cart.length > 1 ? 's' : ''} in your cart</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cart items */}
              <div className="flex-1">
                <div className="bg-white rounded-card shadow-card overflow-hidden">
                  {cart.map((item, index) => (
                    <CartItem key={index} item={item} />
                  ))}
                </div>
              </div>

              {/* Order summary */}
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="bg-white rounded-card shadow-card p-6 sticky top-20">
                  <h2 className="text-lg font-bold text-navy-900 mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal ({cart.length} items)</span>
                      <span className="font-medium text-navy-900">${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <hr className="border-gray-100" />
                    <div className="flex justify-between">
                      <span className="font-semibold text-navy-900">Total</span>
                      <span className="text-xl font-bold text-primary-500">${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsCheckoutModalOpen(true)}
                    className="btn-primary w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link to="/">
                    <button className="w-full mt-3 py-2.5 rounded-lg border-2 border-gray-200 text-sm font-medium text-gray-600 hover:border-primary-300 hover:text-primary-500 transition-colors cursor-pointer">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <CheckoutModal 
              isOpen={isCheckoutModalOpen} 
              onClose={() => setIsCheckoutModalOpen(false)} 
              totalAmount={totalAmount} 
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-primary-300" />
            </div>
            <h2 className="text-xl font-semibold text-navy-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-400 text-sm mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/">
              <button className="btn-primary px-8 py-3 rounded-lg font-semibold text-sm flex items-center gap-2">
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
