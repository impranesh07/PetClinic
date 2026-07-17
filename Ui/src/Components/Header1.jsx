import React, { useState, useEffect } from "react";
import { Vegan } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";


const Header1 = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);



  useEffect(() => {

    const savedUser = localStorage.getItem("user");

    if(savedUser){
      setUser(JSON.parse(savedUser));
    }
    else{
      setUser(null);
    }

  }, [location]);





  const logout = () => {

    localStorage.removeItem("user");

    setUser(null);

    navigate("/signin");

  };





  return (

    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">


      {/* LEFT */}

      <div className="navbar-start">


        <div className="brand p-3 flex gap-3 items-center">

          <Vegan className="text-green-600" />

          <h6 className="text-[17px] font-mono">
            Petify
          </h6>

        </div>


      </div>





      {/* CENTER */}

      <div className="navbar-center hidden lg:flex">


        <ul className="menu menu-horizontal gap-10 font-bold text-[18px]">


          <Link to="/">
            Clinic
          </Link>


          <Link to="/shop">
            Store
          </Link>


          <Link to="/appoin">
            Book Appointment
          </Link>


        </ul>


      </div>






      {/* RIGHT */}

      <div className="navbar-end">


      {
        user ?


        <div className="relative">


          {/* USER BUTTON */}

          <button

            onClick={()=>setOpen(!open)}

            className="flex items-center gap-3 cursor-pointer"

          >


            <img

              src={user.photo}

              alt="profile"

              className="w-10 h-10 rounded-full border"

            />


            <span className="font-bold">

              {user.name}

            </span>


          </button>





          {/* DROPDOWN */}

          {
            open &&


            <div className="absolute right-0 mt-3 w-52 bg-white shadow-xl rounded-lg p-3">


              <div className="border-b pb-3 mb-3">


                <p className="font-bold">
                  {user.name}
                </p>


                <p className="text-sm text-gray-500">
                  {user.email}
                </p>


              </div>





              <button

                onClick={()=>navigate("/user")}

                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"

              >

                👤 View Profile

              </button>





              <button

                onClick={logout}

                className="w-full text-left px-3 py-2 rounded hover:bg-red-100 text-red-600"

              >

                🚪 Logout

              </button>



            </div>


          }



        </div>



        :


        <button

          onClick={()=>navigate("/signin")}

          className="btn bg-green-700 text-white"

        >

          Sign In

        </button>


      }



      </div>


    </div>

  );

};


export default Header1;