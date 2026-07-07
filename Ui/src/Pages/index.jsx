import React from 'react'
import Dogdb from '../Images/Dogbg.jpg'
import {PawPrint } from 'lucide-react'
import Ra from '../Images/Ra.png'
import {Dog} from 'lucide-react'
import petdoctor from '../Images/petdoctor.jpg'
import Doctors from '../Components/Doctors'
import { useNavigate } from 'react-router-dom'
import Touch from '../Components/Touch'

const index = () => {
       
    const navigate = useNavigate()

  return (
    <div>
      <div className="top bg-blue-50 lg:p-9 flex gap-6 pt-20">
        <div className="left">
        <div className="text pl-11 lg:p-30 p-5">
          <h1 className='lg:text-5xl text-3xl font-bold mb-3'>We Care For Your</h1>
          <h1 className='lg:text-5xl text-4xl font-bold text-teal-500 mb-5'>Furry Friends</h1>
      <div className="para text-teal-400 lg:text-[17px] text-[12px]">
          <p className='hidden'>Professional veterinary care with a personal touch. We provide <br></br> the best medical services for your beloved pets in and <br></br> calm and safe environment.</p>
              <p className=''>Professional veterinary care with a personal touch.<br></br> We provide  the best medical services for your beloved pets in and calm and safe environment.</p>
        </div>
        <div className="pt-6 flex gap-2 ">
          {/*  navigates */}
          <button className='btn rounded-4xl lg:btn-xl bg-teal-400 text-amber-50 font-mono border-0 text-[17px] '
          onClick={()=>{
            navigate('/Petreg')
          }}>Register Pets</button>


          <button className='btn rounded-4xl lg:btn-xl text-teal-400 border-2 border-teal-400 font-mono border-0 text-[16px] hover:bg-teal-400 hover:text-amber-50' 
           onClick={()=>window.location.href='#services_doc'}
          >Services</button>
        </div>
        </div>
        </div>
        <div className="right p-12 hidden lg:block">
             <img src={Dogdb} className='rounded-3xl' />
        </div>
      </div>
        {/*  section2  */}
        <div className="section2 lg:p-20 lg:flex justify-between items-center p-6">
    {/* Left Side Container */}
    <div className="left_content lg:w-[60%] ">
        <div className="about flex items-center gap-2">
            <span className='text-amber-700 p-1 rounded'><PawPrint /></span>
            <h3 className='font-bold tracking-wider'>About Us</h3>
        </div>
        
        <div className="content pt-4 hidden lg:block">
            <h1 className='text-5xl font-mono font-bold'>We Providing The Best</h1>
            <h1 className='text-5xl font-mono font-bold lg:pt-3'>Pet Care Services</h1>
        </div>
        <div className="content2 pt-2 lg:hidden">
            <h4 className='text-2xl font-semibold'>We Providing The Best<br></br> Pet Care Services</h4>
        </div>

        <div className="pet lg:flex gap-10">
            <div className="big_logo h-50 w-1/2 lg:w-1/3 pt-3">
                <img src={Ra} alt="Logo" className='h-full w-full object-cover'/>
            </div>
            <div className="info lg:pt-28 pt-4">
                <h6 className='flex font-mono gap-3'><span><Dog /></span> Mental & Emotional Well-Being</h6>
                <h6 className='flex font-mono gap-3 pt-2'><span><Dog /></span> Preventive Health</h6>
                <h6 className='flex font-mono gap-3 pt-2'><span><Dog /></span> Special Needs Pets</h6>
                <h6 className='flex font-mono gap-3 pt-2'><span><Dog /></span> Exercise and Physical Activity</h6>
            </div>
        </div>
    </div>

    {/* Right Side Image */}
    <div className="pet_doctor h-80 lg:w-1/3 w-full pt-8 lg:p-0 overflow-hidden rounded-lg">
        <img src={petdoctor} className='h-full w-full object-cover' alt="Doctor" />
    </div>
</div>
        
        {/*section3 */}
        <div className="section ">
            <div className="top">
                 <div className="text p-5 text-center">
              <h1 className='text-3xl font-semibold'>Our Services</h1>
              <p className='text-teal-600 pt-5 hidden lg:block'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br></br>Sit suscipit doloremque vitae adipisci, doloribus assumenda accusantium, eveniet quae dolores vel consectetur.</p>
              <p className='text-teal-600 pt-4 lg:hidden'>Lorem ipsum dolor sit amet, consectetur<br></br> adipisicing elit.Sit suscipit doloremque vitae adipisci, doloribus assumenda accusantium, eveniet quae dolores vel consectetur.</p>
          </div>
            </div>
            <div className="doctors_data" id='services_doc' >
                 <Doctors/>
            </div>
        </div>

        {/* Get in Touch */}
        <div className="contact w-full p-3">
           <div className="text text-center">
            <h3 className='text-3xl font-semibold'>Get In Touch</h3>
           </div>
            <div className="contact1 flex justify-center p-3  h-1/2">
               <Touch/>
            </div>
        </div>


    </div>
  )
}

export default index
