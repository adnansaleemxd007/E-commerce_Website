import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../redux/Slices/CartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CheckoutModal = ({ isOpen, onClose, totalAmount }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        customerDetails: formData,
        items: cart.map(item => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          image: item.image
        })),
        totalAmount: totalAmount
      };

      const API_URL = import.meta.env.VITE_BACKEND_API 
        ? `${import.meta.env.VITE_BACKEND_API}/api/orders` 
        : "/api/orders";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error response:", response.status, errorText);
        throw new Error(`Failed to place order: ${response.status} ${errorText}`);
      }

      toast.success("Order placed successfully!");
      dispatch(clear());
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-navy-900">Checkout</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-navy-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-sm"
                placeholder="John Doe"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-sm"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-1">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-sm"
                  placeholder="+1 (234) 567-8900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-900 mb-1">Delivery Address</label>
              <textarea 
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all text-sm resize-none"
                placeholder="123 Main St, Apartment 4B, City, Country"
              ></textarea>
            </div>
          </div>

          {/* Summary & Submit */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-500">Total to pay:</span>
              <span className="text-2xl font-bold text-primary-500">${totalAmount.toFixed(2)}</span>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm & Pay"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
