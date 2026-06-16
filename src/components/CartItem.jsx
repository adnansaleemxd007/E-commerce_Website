import {MdDelete} from "react-icons/md"
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import {toast} from "react-hot-toast";

const CartItem = ({item}) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  }

  return (
    <div className="w-full border-b-2 p-4 md:p-6 mt-3 flex border-gray-300">

      <div className="w-full flex flex-col md:flex-row justify-between gap-x-10 gap-y-4 md:gap-y-0 items-center md:items-start">
    
        <div className="w-32 md:w-[170px] flex-shrink-0">
          <img src={item.image} alt="" className="w-full h-auto object-contain"/>
        </div>

        <div className="w-full md:w-[450px] flex flex-col gap-y-4">
          <h1 className="font-semibold text-lg text-center md:text-left">{item.title}</h1>
          <h1 className="text-sm text-center md:text-left">{item.description.split(" ").slice(1,20).join(" ") + "..."}</h1>
          <div className="flex justify-between">
            <p className="text-green-700 font-semibold">${item.price}</p>
            <div
              className="bg-pink-200 p-3 rounded-full hover:cursor-pointer"
              onClick={removeFromCart}
            >
              <MdDelete />
            </div>
          </div>

        </div>
      
      
      </div>

    </div>
  );
};

export default CartItem;


