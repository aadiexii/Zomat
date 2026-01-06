import React, { useState } from 'react'
import { HiLocationMarker } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import {useSelector} from 'react-redux'

const UserDashboard = () => {
const {userData} = useSelector(state => state.user) 
const [showInfo, setShowInfo] = useState(false)
const [showSearch, setShowSearch] = useState(false)

  return (
    <div className='w-full h-20 flex justify-between items-center text-black md:justify-center gap-[30px] px-5 fixed top-0 z-9999 bg-bgColor overflow-hidden'>

       {showSearch &&  <div className='w-[90%] h-[70px] bg-white rounded-lg shadow fixed top-20 left-[5%] gap-5 flex items-center md:hidden'>
        <div className='flex items-center w-[30%] overflow-hidden px-2.5 gap-2.5 border-r-2 border-gray-400'>
           <HiLocationMarker size={25} className='text-primaryColor'/>
           <div className='w-[60%] truncate text-gray-600'>Belaon, Bihar</div>
        </div>
        <div className='flex items-center w-[80%]'>
            <IoMdSearch size={25} className='text-primaryColor'/>
            <input type="text" placeholder='Search for food' className='px-2.5 text-gray-700 outline-0 w-full'/>
        </div>
      </div>}

      <h1 className='text-3xl italic font-bold tracking-tight mb-2 text-primaryColor'>Zomat</h1>
      <div className='hidden md:w-[60%] lg:w-[40%] h-[70px] bg-white rounded-lg shadow gap-5 md:flex items-center'>
        <div className='flex items-center w-[30%] overflow-hidden px-2.5 gap-2.5 border-r-2 border-gray-400'>
           <HiLocationMarker size={25} className='text-primaryColor'/>
           <div className='w-[60%] truncate text-gray-600'>Belaon, Bihar</div>
        </div>
        <div className='flex items-center w-[80%]'>
            <IoMdSearch size={25} className='text-primaryColor'/>
            <input type="text" placeholder='Search for food' className='px-2.5 text-gray-700 outline-0 w-full'/>
        </div>
      </div>
      <div className='flex items-center gap-6'>
      <IoMdSearch size={25} className='text-primaryColor md:hidden cursor-pointer' onClick={() => setShowSearch(prev => !prev)}/>
        <div className='relative cursor-pointer'>
            <MdOutlineShoppingCart size={25} className='text-primaryColor'/>
            <span className='absolute -top-3 -right-1 text-primaryColor'>0</span>
        </div>
        <button className='hidden md:block px-3 py-1 rounded-lg bg-primaryColor/10 text-primaryColor text-sm font-medium cursor-pointer'>
           My Orders
        </button>
        <div className='w-10 h-10 rounded-full flex items-center justify-center bg-primaryColor text-white text-[18px] shadow-xl font-semibold cursor-pointer' onClick={() => setShowInfo(prev => !prev)}>
            {userData.fullName.slice(0,1)}
        </div>
        {showInfo && <div className='fixed top-20 right-2.5 md:right-[2%] lg:right-[18%] w-[180px] bg-white shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-9999' > 
          <div>{userData.fullName}</div>
          <div className='md:hidden text-primaryColor font-semibold cursor-pointer'>My Orders</div>
          <div className='text-primaryColor font-semibold cursor-pointer'>Log Out</div>
        </div>}
      </div>
    </div>                                  
  )
}

export default UserDashboard
