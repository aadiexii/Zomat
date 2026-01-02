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


const SignUp = () => {
      const [showPassword, setshowPassword] = useState(false)
      const [role, setRole] = useState("User")
      const [fullName, setfullName] = useState("")
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [mobileNo, setmobileNo] = useState("")
      const [loading, setLoading] = useState(false)
      const [err, setErr] = useState("")
      const dispatch = useDispatch()
      
      const navigate = useNavigate()
 
    const handleSignUp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullName,
                email,
                password,
                mobileNo,
                role
            }, {withCredentials: true})
               dispatch(setUserData(result.data))
               setErr("")
               setLoading(false)
        } catch (error) {
            setLoading(false)
            setErr(error?.response?.data?.message)
        }
    } 

    const handleGoogleAuth = async () => {
        if(!mobileNo){
            setErr("Mobile No is Required");
        }
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        
        try {
            const result = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                role,
                mobileNo
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
            <p className='text-gray-600 mb-8 text-center'>Create your account to enjoy delicious food delivered to your door.</p>

            {/* fullName */}
            <div className='mb-4'>
                <label htmlFor='fullName' className='text-gray-700 font-medium mb-1'>Full Name</label>
                <input 
                   className='w-full border border-borderColor rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                   id='fullName' 
                   type='text'
                   placeholder='enter your full name'
                   value={fullName}
                   required
                   onChange={(e) => setfullName(e.target.value)}
                />
            </div>

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

            {/* mobileNo */}
            <div className='mb-4'>
                <label htmlFor='mobileNo' className='text-gray-700 font-medium mb-1'>Mobile No</label>
                <input 
                    className='w-full border border-borderColor rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500'
                    id='mobileNo' 
                    type='email'
                    placeholder='enter your mobile num'
                    value={mobileNo}
                    required
                    onChange={(e) => setmobileNo(e.target.value)}                    
                />
            </div>  

            {/* password */}
            <div className='mb-4'>
                <label htmlFor='password' className='text-gray-700 font-medium mb-1'>Password</label>
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

            {/* role */}
            <div className='mb-4'>
                <label htmlFor='role' className='text-gray-700 font-medium mb-1'>Role</label>
                <div className='flex gap-2'>  
                    {
                        ["User", "Owner", "Delivery Partner"].map((r) => (
                            <button key={r} className={`cursor-pointer flex-1 font-normal border  border-gray-300 rounded-lg px-3 py-2 text-center transition-colors whitespace-nowrap ${role == r? "bg-primaryColor border-primaryColor text-white": "bg-borderColor text-gray-700"}`} onClick={() => {setRole(r)}}>{r}</button>
                        ))
                    }
                </div>
            </div>  

            {/* SignUp Button */}
            <button className={`w-full font-semibold py-2 rounded-lg bg-primaryColor text-white cursor-pointer hover:bg-hoverColor`} onClick={handleSignUp} disabled={loading}>
                {loading? <ClipLoader size={20} color='white'/>: "Sign Up"}
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
            <p className='text-center mt-6'>Already have an account ? <span className='text-primaryColor underline cursor-pointer' onClick={() => {navigate('/signin')}}>Sign In</span></p>
        </div>
    </div>
  )
}

export default SignUp
