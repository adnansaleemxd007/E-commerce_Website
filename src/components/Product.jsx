import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { remove, add } from "../redux/Slices/CartSlice";
import { Star } from "lucide-react";

const Product = ({ post }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Item removed from Cart");
  };

  const isInCart = cart.some((p) => p.id === post.id);
  const rating = post.rating?.rate || 0;
  const ratingCount = post.rating?.count || 0;

  // Render star rating
  const renderStars = (rate) => {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalf = rate - fullStars >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        );
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400/50 text-amber-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-3.5 h-3.5 text-gray-200" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 ease-out flex flex-col group overflow-hidden hover:-translate-y-1">
      {/* Image container */}
      <div className="relative bg-gray-50 p-4 flex items-center justify-center h-52 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {/* Category badge */}
        <span className="absolute top-2 left-2 bg-primary-50 text-primary-600 text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize">
          {post.category}
        </span>
      </div>

      {/* Product info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Title */}
        <h3 className="text-sm font-medium text-navy-900 line-clamp-2 leading-snug min-h-[2.5rem]">
          {post.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {renderStars(rating)}
          </div>
          <span className="text-xs text-gray-400">({ratingCount})</span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div>
            <span className="text-xl font-bold text-primary-500">${post.price}</span>
          </div>

          {isInCart ? (
            <button
              className="text-xs font-semibold px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-500 hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
              onClick={removeFromCart}
            >
              Remove
            </button>
          ) : (
            <button
              className="btn-primary text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
