import React from "react";
import { useNavigate } from "react-router-dom";


const UserPanel = () => {


  const navigate = useNavigate();


  const user = JSON.parse(localStorage.getItem("user"));



  const logout = () => {

    localStorage.removeItem("user");

    navigate("/signin");

  };



  if(!user){
    return null;
  }



  return (

    <div className="fixed right-5 top-24 w-80 z-40">


      <div className="bg-white shadow-xl rounded-2xl p-5 border">


        {/* USER INFO */}

        <div className="flex items-center gap-4">


          <img

            src={user.photo}

            alt="profile"

            className="w-16 h-16 rounded-full border"

          />


          <div>

            <h2 className="font-bold text-lg">
              {user.name}
            </h2>


            <p className="text-sm text-gray-500">
              {user.email}
            </p>


          </div>


        </div>





        <div className="divider my-3"></div>




        <button

          onClick={()=>navigate("/user")}

          className="w-full btn btn-outline mb-3"

        >

          👤 My Profile

        </button>





        <button

          onClick={logout}

          className="w-full btn bg-red-600 text-white hover:bg-red-700"

        >

          Logout

        </button>



      </div>


    </div>

  );

};


export default UserPanel;