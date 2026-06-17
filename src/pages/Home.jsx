import { useEffect, useState, useRef } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setSelectedCategory, setSelectedPrice, updateFilteredProducts } from "../redux/Slices/CartSlice";
import { Monitor, Shirt, Gem, ShoppingBag, ChevronDown, SlidersHorizontal, LayoutGrid } from "lucide-react";
import HeroCarousel from "../components/HeroCarousel";

const CATEGORY_ICONS = {
  "all": LayoutGrid,
  "electronics": Monitor,
  "men's clothing": Shirt,
  "women's clothing": ShoppingBag,
  "jewelery": Gem,
};

const Home = () => {
  const API_URL = import.meta.env.VITE_BACKEND_API ? import.meta.env.VITE_BACKEND_API + "/api/products" : "/api/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const dispatch = useDispatch();
  const { filtered, selectedCategory, selectedPrice } = useSelector((state) => state.products);

  const productsRef = useRef(null);

  const handleScrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch products from API
  async function fetchProductData() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(data);
      dispatch(setProducts(data));
      dispatch(updateFilteredProducts(data));
    } catch (err) {
      alert("Error loading products");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  // Apply filters whenever category or price changes
  useEffect(() => {
    let filteredData = posts;

    if (selectedCategory && selectedCategory !== "All") {
      filteredData = filteredData.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedPrice) {
      filteredData = filteredData.filter((item) => {
        if (selectedPrice === "0-50") return item.price >= 0 && item.price <= 50;
        if (selectedPrice === "50-100") return item.price > 50 && item.price <= 100;
        if (selectedPrice === "100+") return item.price > 100;
        return true;
      });
    }

    dispatch(updateFilteredProducts(filteredData));
  }, [selectedCategory, selectedPrice, posts, dispatch]);

  const uniqueCategories = ["All", ...new Set(posts.map((e) => e.category))];

  const handleCategoryClick = (cat) => {
    dispatch(setSelectedCategory(cat));
    // Scroll to products on category click
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>


      {/* ═══════════ CAROUSEL SECTION ═══════════ */}
      <HeroCarousel />

      {/* ═══════════ CATEGORY QUICK-NAV ═══════════ */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar">
            {uniqueCategories.map((cat) => {
              const IconComponent = CATEGORY_ICONS[cat.toLowerCase()] || ShoppingBag;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`flex flex-col items-center gap-1.5 min-w-[90px] px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer
                    ${isActive
                      ? "bg-primary-50 border-2 border-primary-500 text-primary-600"
                      : "bg-gray-50 border-2 border-transparent text-gray-500 hover:bg-primary-50 hover:text-primary-500"
                    }`}
                >
                  <IconComponent className="w-6 h-6" />
                  <span className="text-xs font-medium capitalize whitespace-nowrap">
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════ PRODUCTS SECTION ═══════════ */}
      <div ref={productsRef} className="max-w-7xl mx-auto px-4 py-6">
        <div className="w-full">
          
          {/* Product grid */}
          <div className="w-full">
            {/* Results header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-navy-900">
                {selectedCategory === "All" ? "All Products" : selectedCategory}
                <span className="text-sm font-normal text-gray-400 ml-2">({filtered.length} items)</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {loading ? (
                <div className="col-span-full flex justify-center items-center py-20">
                  <Spinner />
                </div>
              ) : filtered.length > 0 ? (
                filtered.map((post) => <Product key={post.id} post={post} />)
              ) : (
                <div className="col-span-full text-center py-20">
                  <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No products found</p>
                  <p className="text-gray-300 text-sm mt-1">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
