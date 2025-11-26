import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/forgotPassword'

export const serverUrl = "http://localhost:8000"

const App = () => {
  return (
    <Routes>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/signin' element={<SignIn/>}/>
       <Route path='/forgot-password' element={<ForgotPassword/>}/>
    </Routes>
  )
}

export default App
