import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from "react-spinners";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const SignIn = () => {
      const [showPassword, setshowPassword] = useState(false)
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [loading, setLoading] = useState(false)
      const [err, setErr] = useState("")
      const dispatch = useDispatch()
      
      const navigate = useNavigate()
 
    const handleSignIn = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signin`, {
                email,
                password,
            }, {withCredentials: true})
               dispatch(setUserData(result.data))
               setLoading(false)
               setErr("")
        } catch (error) {
               setErr(error?.response?.data?.message)
               setLoading(false)
        }
    } 

    const handleGoogleAuth = async () => {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        
        try {
            const result = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                email: result.user.email,
            }, {withCredentials: true})
            dispatch(setUserData(result.data))
        } catch (error) {
               console.log(error)
        }
    }

      return (
    <div className='min-h-screen w-full bg-bgColor flex items-center justify-center p-4'>
        <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-2 border-borderColor'>
            <h1 className='text-4xl italic font-bold tracking-tight text-primaryColor mb-2 text-center'>Zomat</h1>
            <p className='text-gray-600 mb-8 text-center'>Log in and continue enjoying delicious meals at your doorstep.</p>

            {/* email */}
            <div className='mb-4'>
                <label htmlFor='email' className='text-gray-700 font-medium mb-1'>Email</label>
                <input 
                   className='w-full border border-borderColor rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                   id='email' 
                   type='email'
                   placeholder='enter your email'
                   value={email}
                   required
                   onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {/* password */}
            <div className='mb-4'>
                <div className='flex justify-between'>
                   <label htmlFor='password' className='text-gray-700 font-medium mb-1'>Password</label>
                   <span className='text-primaryColor underline cursor-pointer' onClick={() => {navigate('/forgot-password')}}>Forgot Password</span>
                </div>
                <div className='relative'>
                    <input 
                        className='w-full border border-borderColor rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                        id='password' 
                        type={showPassword ? 'text': 'password'}
                        placeholder='enter your password'
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='absolute right-3 top-3 text-gray-500 cursor-pointer' onClick={() => setshowPassword(prev => !prev)}>{!showPassword? <FaEye />: <FaEyeSlash />}</button>
                </div>
            </div>  

            {/* SignUp Button */}
            <button className={`mb-5 w-full font-semibold py-2 rounded-lg bg-primaryColor text-white cursor-pointer hover:bg-hoverColor`} onClick={handleSignIn} disabled={loading}>
               {loading? <ClipLoader size={20} color='white'/> : "Sign In"}
            </button>

            {/* Error Display */}
            {err && <p className='text-red-500 text-center my-2'>*{err}</p>}

            {/* or section */}
            <div className='w-full flex items-center mt-4'>
                <div className='grow h-px bg-gray-300'></div>
                <span className='px-3 text-gray-500 font-medium'>OR</span>
                <div className='grow h-px bg-gray-300'></div>
            </div>

            {/* SignUp with google */}
            <button className='w-full gap-2 flex items-center justify-center mt-4 border rounded-lg py-2 border-gray-300 cursor-pointer transition duration-200 hover:bg-gray-100' onClick={handleGoogleAuth}><FcGoogle className='text-2xl'/><span>Continue with Google</span></button>

            {/* Already Account */}
            <p className='text-center mt-6'>Don't have an account ? <span className='text-primaryColor underline cursor-pointer' onClick={() => {navigate('/signup')}}>Sign Up</span></p>
        </div>
    </div>
  )
}

export default SignIn
