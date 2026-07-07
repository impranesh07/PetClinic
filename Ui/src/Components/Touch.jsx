import React, { useState } from 'react'
import facebook from '../Images/facebook.png'
import insta from '../Images/insta.png'
import twitter from '../Images/twitter.png'


const Touch = () => {
  // State to hold the form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  })

  // Handler to update state values on input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Handler to send data to Flask app.py
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://127.0.0.1:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert("Data sent successfully!")
        setFormData({ fullName: '', email: '', message: '' }) // Clear fields
      } else {
        alert("Failed to send data.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Backend server is not running.")
    }
  }

  return (
   <div className="desgin bg-blue-100 rounded-4xl h-full lg:w-1/2 w-full p-4 text-center">
      <form onSubmit={handleSubmit}>
        <div className="name pb-4">
            <input type="text" placeholder="Full name" 
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="bg-transparent border-b-2 border-black rounded-none outline-none focus:border-black py-2 lg:w-1/3 w-[75%]"
            />
        </div>
        <div className="mail pb-4">
         <input type="text" placeholder="E-mail" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-transparent border-b-2 border-black rounded-none outline-none focus:border-black py-2 lg:w-1/3 w-[75%]"
         />
        </div>
        <div className="message pb-4">
         <input type="text" placeholder="Message" 
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="bg-transparent border-b-2 border-black rounded-none outline-none focus:border-black py-2 lg:w-1/3 w-[75%]" 
         />
        </div>
        
        <div className="click pt-3">
         <button type="submit" className="btn btn-success rounded-3xl font-mono text-[20px]">contact us</button>  
        </div>
      </form>
      <div className="icons  w-full p-3 flex gap-4 justify-center">
          <div className="facebook h-10 ">
            <img src={facebook} className='h-full object-cover' />
          </div>
          <div className="facebook h-10 ">
            <img src={insta} className='h-full object-cover' />
          </div>
          <div className="facebook h-10">
            <img src={twitter} className='h-full object-cover' />
          </div>
      </div>
   </div>
  )
}

export default Touch;