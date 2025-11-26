import React, { use, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import axios from "axios"


const ForgotPassword = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newpassword, setNewpassword] = useState("")
  const [showPassword, setshowPassword] = useState(false)
  const [showPassword1, setshowPassword1] = useState(false)
  const [confirmpassword, setConfirmpassword] = useState("")
  const navigate = useNavigate()
 
  const handleSendOtp = async () => {
      try {
         const result = await axios.post(`${serverUrl}/api/auth/send-otp`, {
            email
         }, {withCredentials: true} )
         console.log(result.data)
         setStep(2)
      } catch (error) {
         console.log(error)
      }
  }

  const handleVerifyOtp = async () => {
      try {
         const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, {
            email,
            otp
         }, {withCredentials: true} )
         console.log(result.data)
         setStep(3)
      } catch (error) {
         console.log(error)
      }
  }

  const handleResetPassword= async () => {
   if(newpassword != confirmpassword){
      return null;
   }
      try {
         const result = await axios.post(`${serverUrl}/api/auth/reset-password`, {
            email,
            newpassword
         }, {withCredentials: true} )
         console.log(result.data)
         navigate('/signin')
      } catch (error) {
         console.log(error)
      }
  }

  return (
    <div className='min-h-screen w-full bg-bgColor flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8'>

        {step == 1 && <div>
        <div className='relative w-full mb-4'>
          <IoMdArrowRoundBack className='text-gray-600 text-3xl cursor-pointer absolute left-0 top-0.5' onClick={()=> {navigate('/signin')}}/>
           <h1 className='text-2xl font-bold tracking-tight text-primaryColor mb-2 text-center'>OTP Verification</h1>
        </div>
        <p className='text-gray-600 mb-8 text-center'>Enter email to send one time password</p>
            {/* email */}
            <div className='mb-6'>
                <label htmlFor='email' className='text-gray-700 font-medium mb-1'>Email</label>
                <input 
                   className='w-full border border-borderColor rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                   id='email' 
                   type='email'
                   placeholder='enter your email'
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                />
            </div>  

            {/* SignUp Button */}
            <button className={`w-full font-semibold py-2 rounded-lg bg-primaryColor text-white cursor-pointer hover:bg-hoverColor`}  onClick={handleSendOtp}>Continue</button>          
        </div>}
 
        {step == 2 && <div>
        <div className='relative w-full mb-4'>
          <IoMdArrowRoundBack className='text-gray-600 text-3xl cursor-pointer absolute left-0 top-0.5' onClick={()=> {navigate('/signin')}}/>
           <h1 className='text-2xl font-bold tracking-tight text-primaryColor mb-2 text-center'>Verification Code</h1>
        </div>
        <p className='text-gray-600 mb-8 text-center'>We have sent the verification code to your email address.</p>
            {/* enter otp */}
            <div className='mb-6'>
                <label htmlFor='otp' className='text-gray-700 font-medium mb-1'>Verification Code</label>
                <input 
                   className='w-full border border-borderColor rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                   id='otp' 
                   type='email'
                   placeholder='enter verification code'
                   value={otp}
                   onChange={(e) => setOtp(e.target.value)}
                />
            </div>  

            {/* SignUp Button */}
            <button className={`w-full font-semibold py-2 rounded-lg bg-primaryColor text-white cursor-pointer hover:bg-hoverColor` } onClick={handleVerifyOtp}  >Confirm</button>  
         </div>}

      
        {step == 3 && <div>
        <div className='relative w-full mb-4'>
          <IoMdArrowRoundBack className='text-gray-600 text-3xl cursor-pointer absolute left-0 top-0.5' onClick={()=> {navigate('/signin')}}/>
           <h1 className='text-2xl font-bold tracking-tight text-primaryColor mb-2 text-center'>New Password</h1>
        </div>
        <p className='text-gray-600 mb-8 text-center'>Set your new password and get back into your account.</p>
            {/* new password */}
            <div className='mb-6'>
                <label htmlFor='newPassword' className='text-gray-700 font-medium mb-1'>New password</label>
                <div className='relative'>
                  <input 
                     className='w-full border border-borderColor rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                     id='newPassword' 
                     type={showPassword? 'text': 'password'}
                     placeholder='enter new password'
                     value={newpassword}
                     onChange={(e) => setNewpassword(e.target.value)}
                  />
                  <button className='absolute right-3 top-3 text-gray-500 cursor-pointer' onClick={() => setshowPassword(prev => !prev)}>{!showPassword? <FaEye />: <FaEyeSlash />}</button>
               </div>
            </div>  
            {/* confirm password */}
            <div className='mb-6'>
                <label htmlFor='confirmPassword' className='text-gray-700 font-medium mb-1'>Confirm password</label>
               <div className='relative'>
                  <input 
                     className='w-full border border-borderColor rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                     id='confirmPassword' 
                     type={showPassword1? 'text': 'password'}
                     placeholder='Confirm new password'
                     value={confirmpassword}
                     onChange={(e) => setConfirmpassword(e.target.value)}
                  />
               <button className='absolute right-3 top-3 text-gray-500 cursor-pointer' onClick={() => setshowPassword1(prev => !prev)}>{!showPassword1? <FaEye />: <FaEyeSlash />}</button>
               </div>
            </div>  

            {/* SignUp Button */}
            <button className={`w-full font-semibold py-2 rounded-lg bg-primaryColor text-white cursor-pointer hover:bg-hoverColor`}  onClick={handleResetPassword}>Reset Password   </button>  
         </div>}
      </div>
    </div>
  )
}

export default ForgotPassword
