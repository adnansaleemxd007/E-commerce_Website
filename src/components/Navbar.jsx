import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { setSelectedCategory, setSelectedPrice, updateFilteredProducts } from "../redux/Slices/CartSlice";

const Navbar = () => {
  const [inputData, setInput] = useState("");
  const [dropdownProducts, setDropdownProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  const products = useSelector((state) => state.products.data);
  const dropdownRef = useRef(null);

  // Filter products for dropdown whenever input changes
  const handleInput = (event) => {
    const value = event.target.value;
    setInput(value);

    if (value.trim() === "") {
      setDropdownProducts(products); // show all dropdown options
      setShowDropdown(true);
      return;
    }

    const filtered = products.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase())
    );

    setDropdownProducts(filtered); // dropdown only
    setShowDropdown(true);
  };

  const handleSelectProduct = (item) => {
    dispatch(updateFilteredProducts([item])); // update Home products
    // Update sidebar filters globally
    dispatch(setSelectedCategory(item.category));

    // Optionally update price filter
    if (item.price <= 50) dispatch(setSelectedPrice("0-50"));
    else if (item.price <= 100) dispatch(setSelectedPrice("50-100"));
    else dispatch(setSelectedPrice("100+"));
    setShowDropdown(false); // close dropdown
    setInput(""); // clear search input if you want
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  };

  // Close dropdown if input is cleared
  useEffect(() => {
    if (inputData === "") setShowDropdown(false);
  }, [inputData]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto px-4 sm:px-6">
        <NavLink to="/">
          <div>
            <img src="/logo.png" className="h-10 sm:h-14" alt="Logo" />
          </div>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center font-medium text-slate-100 space-x-6">
          <NavLink to="/">
            <p className="hover:text-green-400 transition">Home</p>
          </NavLink>
          <NavLink to="/admin">
            <p className="hover:text-green-400 transition">Admin</p>
          </NavLink>

          {/* Search bar */}
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center w-64 bg-[#2d3748] rounded-full px-4 py-2 shadow-inner">
              <input
                onChange={handleInput}
                value={inputData}
                type="text"
                placeholder="Search..."
                className="bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none flex-grow"
                onFocus={() => {
                  setDropdownProducts(products); // always show all dropdown items
                  setShowDropdown(true);
                }}
              />
              <Search className="text-gray-300 w-4 h-4 ml-2 cursor-pointer" />
            </div>

            {/* 🔍 Search dropdown */}
            {showDropdown && dropdownProducts.length > 0 && (
              <div className="absolute top-12 left-0 w-64 bg-[#1f2937] text-white rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                {dropdownProducts.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectProduct(item)}
                    className="p-2 hover:bg-[#374151] cursor-pointer flex items-center space-x-3"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-8 h-8 rounded object-contain"
                    />
                    <div className="truncate">
                      <p className="text-sm font-medium truncate w-44">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <NavLink to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-2xl" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
        </div>

        {/* Mobile nav icons */}
        <div className="flex md:hidden items-center space-x-4 text-slate-100">
          <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)}>
            <Search className="w-5 h-5" />
          </button>
          <NavLink to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-xl" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-4 h-4 flex justify-center items-center rounded-full text-white text-[10px]">
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile search bar */}
      {mobileSearchOpen && (
        <div className="md:hidden bg-slate-800 px-4 pb-3" ref={dropdownRef}>
          <div className="flex items-center bg-[#2d3748] rounded-full px-4 py-2 shadow-inner">
            <input
              onChange={handleInput}
              value={inputData}
              type="text"
              placeholder="Search..."
              className="bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none flex-grow text-sm"
              onFocus={() => {
                setDropdownProducts(products);
                setShowDropdown(true);
              }}
            />
            <Search className="text-gray-300 w-4 h-4 ml-2" />
          </div>
          {showDropdown && dropdownProducts.length > 0 && (
            <div className="mt-2 bg-[#1f2937] text-white rounded-lg shadow-lg max-h-64 overflow-y-auto">
              {dropdownProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectProduct(item)}
                  className="p-2 hover:bg-[#374151] cursor-pointer flex items-center space-x-3"
                >
                  <img src={item.image} alt={item.title} className="w-8 h-8 rounded object-contain" />
                  <div className="truncate">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 px-4 pb-4 space-y-3 text-slate-100 font-medium">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
            <p className="py-2 hover:text-green-400 transition border-b border-slate-700">Home</p>
          </NavLink>
          <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)}>
            <p className="py-2 hover:text-green-400 transition border-b border-slate-700">Admin</p>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
