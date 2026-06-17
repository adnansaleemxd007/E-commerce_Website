import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  };

  return (
    <div className="flex gap-4 p-4 md:p-5 border-b border-gray-100 last:border-none hover:bg-gray-50/50 transition-colors">
      {/* Image */}
      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center p-2">
        <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium text-navy-900 line-clamp-2 leading-snug">{item.title}</h3>
          <p className="text-xs text-gray-400 mt-1 hidden md:block">
            {item.description.split(" ").slice(0, 15).join(" ") + "..."}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-primary-500">${item.price}</span>
          <button
            className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors cursor-pointer group"
            onClick={removeFromCart}
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-red-50 flex items-center justify-center transition-colors">
              <MdDelete className="text-base text-gray-400 group-hover:text-red-500 transition-colors" />
            </div>
            <span className="hidden md:inline">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
