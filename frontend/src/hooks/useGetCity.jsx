import React, { useDebugValue } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const useGetCity = () => {
    const dispatch = useDispatch()
    useEffect(() => {
       navigator.geolocation.getCurrentPosition(async (position) => {
          console.log(position)
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
       })
    }, [])
}

export default useGetCity
