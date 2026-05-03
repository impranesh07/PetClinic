import React from 'react'
import doctor from '../Images/doctor.jpg'
import {ArrowUpRight} from 'lucide-react'

const Bookappoinment = () => {
  const petDoctors = [
  {
    id: 1,
    name: "Dr. Chandan Saha",
    specialist: "Veterinary Surgeon (M.V.Sc)",
    chamberDetails: "Himul, Khaprail Road, Matigara, Siliguri - 734010",
    timing: "09:00 AM - 08:00 PM (Closed Sunday)",
    contact: "+91 80019 33933", // General enquiry/appointment line
    rating: 3.9
  },
  {
    id: 2,
    name: "Dr. Bipul Pal",
    specialist: "General Veterinarian",
    chamberDetails: "Diglijote, Medical More, Matigara, Siliguri - 734010",
    timing: "Opens at 07:00 PM",
    contact: "0353-2571234", // Local directory listing
    rating: 4.6
  },
  {
    id: 3,
    name: "Dr. Soham Samanta",
    specialist: "Veterinary Doctor",
    chamberDetails: "Champasari Road, Indrapally, Siliguri - 734003",
    timing: "Open until 11:30 PM",
    contact: "+91 98320 62454",
    rating: 4.8
  },
  {
    id: 4,
    name: "Dr. Sanjib Sarkar",
    specialist: "Veterinary Physician",
    chamberDetails: "Saktigarh Road, Lake Town, Siliguri - 734005",
    timing: "Varies (Evening focus)",
    contact: "+91 94340 44243",
    rating: 3.8
  },
  {
    id: 5,
    name: "Dr. Parameswar Mukherjee",
    specialist: "Veterinary Specialist",
    chamberDetails: "Medical College Road, Sushrut Nagar, Siliguri - 734012",
    timing: "10:00 AM - 02:00 PM",
    contact: "+91 90029 36622", // Shared clinic/hospital line
    rating: 4.1
  }
];
 
  return (
    <div className="ba w-full p-4">
       <div className="doctors  p-3 flex flex-col gap-6 justify-center items-center">
         {/* card */}
         {petDoctors.map((e,index)=>(
          //console.log(e.name)
           <div className="card card-side bg-base-100 shadow-sm w-[45%] h-52" key={index}>
            <figure className='w-[30%]'>
             <img className='w-full object-cover' src={doctor} />
          </figure>

           <div className="card-body">
       <h2 className="card-title">{e.name}</h2>
      <p><span className='font-bold'>Spe:</span>{e.specialist}</p>
       <p><span className='font-bold'>Timing: </span>{e.timing}</p>
       <p><span className='font-bold'>Con: </span>{e.contact}</p>
      <div className="card-actions justify-around ">
       <button className="btn btn-success rounded-2xl text-teal-100 font-mono">BOOK APPOINMENT 
        <span><ArrowUpRight /></span> </button>
       </div>
    </div>
            </div>
         ))}
         
           
   


    {/* second card */}




  </div>
    </div>
  )
}

export default Bookappoinment
