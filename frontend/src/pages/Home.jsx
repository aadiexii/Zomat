import React from 'react'
import { useSelector } from 'react-redux'
import UserDashboard from '../components/UserDashboard'
import DeliveryBoyDashboard from '../components/DeliveryBoyDashboard'
import OwnerDashboard from '../components/OwnerDashboard'

const Home = () => {
  const {userData} = useSelector(state => state.user)
  return (
    <div className='min-h-screen w-full bg-bgColor flex items-center justify-center p-4'>
      {userData.role == "User" && <UserDashboard/>}
      {userData.role == "Owner" && <OwnerDashboard/>}
      {userData.role == "DeliveryPartner" && <DeliveryBoyDashboard/>}
    </div>
  )
}

export default Home
