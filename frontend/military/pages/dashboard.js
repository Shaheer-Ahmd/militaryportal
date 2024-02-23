import React, { useEffect, useState } from 'react'

export default function dashboard() {
    const [baseData,setBaseData] = useState([])
    const [addBase,setAddBase] = useState("")
    const handleAddBase = (e) =>{
        setAddBase(e.target.value)
    }
    useEffect(() =>{
        //set Base Data
    },[])
  return (
    <div className='flex flex-col min-w-full items-center justify-around gap-8 bg-white min-h-screen'>
        <form className='flex justify-center items-center min-w-full'>
            <input placeholder='Add a base...' value={addBase} onChange={handleAddBase} className='focus:outline-none border border-primary-secondary focus:border-2 lg:w-3/12 w-3/6 p-3 text-gray-600' />
            <button className='font-semibold w-1/12 bg-primary-tertiary font-sans p-3 hover:scale-105 transition-all' >Add</button>
        </form>
        <div>
        </div>
      
    </div>
  )
}
