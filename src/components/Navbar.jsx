import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Menu, Search, X, ShoppingBag } from "lucide-react";
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
      <nav className="bg-navy-900 shadow-navbar">
        <div className="flex justify-between items-center h-16 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Logo */}
          <NavLink to="/home" className="flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <div className="flex items-center gap-2 cursor-pointer">
              <ShoppingBag className="w-7 h-7 text-primary-500" />
              <span className="text-2xl font-bold tracking-wider text-white">ECOMZY</span>
            </div>
          </NavLink>

          {/* Desktop: Search Bar (center) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8" ref={dropdownRef}>
            <div className="relative w-full">
              <div className="flex items-center w-full bg-white rounded-lg overflow-hidden">
                <input
                  onChange={handleInput}
                  value={inputData}
                  type="text"
                  placeholder="Search in ECOMZY..."
                  className="flex-1 px-4 py-2.5 text-sm text-navy-900 placeholder-gray-400 focus:outline-none"
                  onFocus={() => {
                    setDropdownProducts(products);
                    setShowDropdown(true);
                  }}
                />
                <button className="bg-primary-500 hover:bg-primary-600 transition-colors px-5 py-2.5 flex items-center justify-center">
                  <Search className="text-white w-5 h-5" />
                </button>
              </div>

              {/* Search dropdown */}
              {showDropdown && dropdownProducts.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-elevated z-50 max-h-80 overflow-y-auto border border-gray-100">
                  {dropdownProducts.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectProduct(item)}
                      className="px-4 py-3 hover:bg-primary-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-none transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-10 h-10 rounded object-contain bg-gray-50 p-1"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-navy-900 truncate">{item.title}</p>
                        <p className="text-xs text-gray-400 capitalize">{item.category}</p>
                      </div>
                      <span className="text-sm font-semibold text-primary-500">${item.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop: Nav links + Cart */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/home">
              {({isActive}) => (
                <span className={`text-sm font-medium transition-colors ${isActive ? 'text-primary-400' : 'text-gray-300 hover:text-white'}`}>
                  Home
                </span>
              )}
            </NavLink>
            <NavLink to="/admin">
              {({isActive}) => (
                <span className={`text-sm font-medium transition-colors ${isActive ? 'text-primary-400' : 'text-gray-300 hover:text-white'}`}>
                  Admin
                </span>
              )}
            </NavLink>

            {/* Cart Icon */}
            <NavLink to="/cart">
              <div className="relative flex items-center gap-1 bg-primary-500 hover:bg-primary-600 transition-colors text-white px-4 py-2 rounded-lg">
                <FaShoppingCart className="text-lg" />
                <span className="text-sm font-medium hidden lg:inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-primary-500 text-xs w-5 h-5 flex justify-center items-center rounded-full font-bold shadow-sm">
                    {cart.length}
                  </span>
                )}
              </div>
            </NavLink>
          </div>

          {/* Mobile nav icons */}
          <div className="flex md:hidden items-center gap-3 text-white">
            <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)} className="p-2 hover:bg-navy-700 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <NavLink to="/cart">
              <div className="relative p-2">
                <FaShoppingCart className="text-lg" />
                {cart.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary-500 text-white text-[10px] w-4 h-4 flex justify-center items-center rounded-full font-bold">
                    {cart.length}
                  </span>
                )}
              </div>
            </NavLink>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-navy-700 rounded-lg transition-colors">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile search bar */}
      {mobileSearchOpen && (
        <div className="md:hidden bg-navy-800 px-4 py-3 border-t border-navy-700" ref={dropdownRef}>
          <div className="flex items-center bg-white rounded-lg overflow-hidden">
            <input
              onChange={handleInput}
              value={inputData}
              type="text"
              placeholder="Search in ECOMZY..."
              className="flex-1 px-4 py-2.5 text-sm text-navy-900 placeholder-gray-400 focus:outline-none"
              onFocus={() => {
                setDropdownProducts(products);
                setShowDropdown(true);
              }}
            />
            <button className="bg-primary-500 px-4 py-2.5">
              <Search className="text-white w-4 h-4" />
            </button>
          </div>
          {showDropdown && dropdownProducts.length > 0 && (
            <div className="mt-2 bg-white rounded-lg shadow-elevated max-h-64 overflow-y-auto">
              {dropdownProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectProduct(item)}
                  className="px-4 py-3 hover:bg-primary-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-none"
                >
                  <img src={item.image} alt={item.title} className="w-9 h-9 rounded object-contain bg-gray-50 p-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-navy-900 truncate">{item.title}</p>
                    <p className="text-xs text-gray-400 capitalize">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-800 border-t border-navy-700">
          <div className="px-4 py-2">
            <NavLink to="/home" onClick={() => setMobileMenuOpen(false)}>
              {({isActive}) => (
                <p className={`py-3 text-sm font-medium border-b border-navy-700 transition-colors ${isActive ? 'text-primary-400' : 'text-gray-300 hover:text-white'}`}>
                  Home
                </p>
              )}
            </NavLink>
            <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)}>
              {({isActive}) => (
                <p className={`py-3 text-sm font-medium border-b border-navy-700 transition-colors ${isActive ? 'text-primary-400' : 'text-gray-300 hover:text-white'}`}>
                  Admin
                </p>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
