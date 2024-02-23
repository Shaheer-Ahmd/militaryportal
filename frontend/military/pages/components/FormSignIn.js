import React from 'react'

export default function FormSignIn({setEmail,setPassword,email,password,handleSubmit}) {
    const handleEmailChange = (e) =>{
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) =>{
        setPassword(e.target.value)
    }
  return (
    <form className="flex flex-col border rounded-lg border-gray-200 w-3/6 lg:w-4/12 px-4 py-3 gap-8 shadow-lg">
        <h1 className="text-2xl text-blue-500 font-sans font-semibold p-2">
        Sign in
        </h1>
        <div className="flex flex-col items-center gap-3">
            <input 
            type="email"
            placeholder="Email"
            className="w-4/6 py-3  focus:outline-none border rounded-sm border-blue-200 focus:border-2  h-8 px-2 xs:w-2/5 text-gray-600"
            value={email}
            onChange={handleEmailChange}
            />
            <input 
            type="password"
            placeholder="Password"
            className="w-4/6 py-3  focus:outline-none border rounded-sm border-blue-200 focus:border-2  h-8 px-2 xs:w-2/5 text-gray-600"
            value={password}
            onChange={handlePasswordChange}
            />
            <button className=" my-4 bg-blue-500 text-white font-sans font-semibold border rounded-xl py-2 px-1 w-4/6 xs:w-2/5" onClick={handleSubmit}>Sign In</button>
            <span className="text-blue-500 text-sm">New to App ?{" "} 
                <a href="/signup">
                <span className="text-blue-600 hover:underline">Sign Up</span>
                </a>
            </span>
        </div>

  </form>
  )
}
