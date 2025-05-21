import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign Up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const toggleState = () => {
    setCurrState(currState === "Sign Up" ? "Login" : "Sign Up")
    setIsDataSubmitted(false)
  }

  const {login} = useContext(AuthContext)

  const onSubmitHandler = (event) =>{
    event.preventDefault();
    if(currState === "Sign Up" && !isDataSubmitted){
      setIsDataSubmitted(true);
    }
    
    login(currState == "Sign Up" ? "signup" : "login", {fullName, email, password, bio})
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col p-6 backdrop-blur-2xl'>
      {/* Left Logo */}
      <img src={assets.logo_big} alt="Logo" className='w-[min(30vw,250px)]' />

      {/* Right Form */}
      <form onSubmit={onSubmitHandler} className='bg-white/10 border border-gray-500 text-white p-6 flex flex-col gap-5 rounded-lg shadow-lg w-full max-w-md'>
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-2xl'>
            {currState}
            {isDataSubmitted && <img onClick={()=>setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}
          </h2>
          
        </div>

        {currState === "Sign Up" && !isDataSubmitted && (
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder='Full Name'
            required
            className='p-2 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email Address'
              required
              className='p-2 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
              className='p-2 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </>
        )}

        {currState === "Sign Up" && isDataSubmitted && (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder='Provide a short bio...'
            required
            className='p-2 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500'
          />
        )}

        <button type='submit' className='py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-md font-medium hover:opacity-90 transition'>
          {currState === "Sign Up" && !isDataSubmitted ? "Next" :
           currState === "Sign Up" && isDataSubmitted ? "Create Account" :
           "Login Now"}
        </button>

        <label className='flex items-center gap-2 text-sm text-gray-300'>
          <input type="checkbox" className='accent-violet-600' required/>
          <span>Agree to the Terms of Use & Privacy Policy</span>
        </label>

        <div className='flex flex-col gap-2'>
            {currState === "Sign Up" ? (
              <p className='text-sm text-gray-300'>Already have an account? <span onClick={toggleState} className='text-violet-600 cursor-pointer'>Login</span></p>
            ) : (
              <p className='text-sm text-gray-300'>Don't have an account? <span onClick={toggleState} className='text-violet-600 cursor-pointer'>Sign Up</span></p>
            )}
        </div>
      </form>
    </div>
  )
}

export default LoginPage
