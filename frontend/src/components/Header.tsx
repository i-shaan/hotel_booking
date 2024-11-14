
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from '../context/AuthContext';
import * as apiClient from '../api-client';
import { useMutation, useQueryClient } from "react-query";

const Header = () => {
  const { isLoggedIn} = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.logout,{

    onSuccess:async ()=>{
      await  queryClient.invalidateQueries("validateToken");
      console.log("succuss in logging out")
    },
    onError:()=>{
      console.log("error in logging out")
    }
  })
  const handleSignOut = async () => {
    
    mutation.mutate();
    navigate("/sign-in");     // Redirect to sign-in page
  };

  return (
  
    <div className="fade-in h-auto bg-[#0077B6] flex flex-col p-3 md:p-7 lg:p-9">
      <div className='flex items-center justify-between mb-4'>
      <div className="font-bold text-2xl text-[#90E0EF] animated-heading">
  HotelBooking<span className="text-[#FF6B6B]">.com</span>
</div>

        <div>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
  to="/my-bookings"
  className="text-white relative transition duration-300 hover:text-[#90E0EF] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[#FF6B6B] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
>
  My Booking
</Link>
<Link
  to="/my-hotels"
  className="text-white relative transition duration-300 hover:text-[#90E0EF] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[#FF6B6B] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
>
  My Hotels
</Link>

              <button
                onClick={handleSignOut}
                className="text-[#0077B6] bg-[#90E0EF] p-2 border-2 border-[#00B4D8] rounded-md hover:bg-[#00B4D8] hover:text-white transition duration-300 transform hover:scale-105"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="text-[#0077B6] bg-[#90E0EF] p-2 border-2 border-[#00B4D8] rounded-md hover:bg-[#00B4D8] hover:text-white transition duration-300 transform hover:scale-105"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
      <div className="text-center text-white">
  <h1 className="font-extrabold  text-4xl mb-2 md:text-5xl lg:text-6xl transition-transform transform hover:scale-110 animated-text">
    Find Your Next Stay
  </h1>
  <p className="font-light text-lg md:text-xl tracking-wider text-[#FF6B6B]">
    Search low prices on hotels for your dream vacation<span className="dots">.</span><span className="dots">.</span><span className="dots">.</span>

  </p>
</div>

    </div>
    
  );
};

export default Header;
