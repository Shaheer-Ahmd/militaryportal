import React, { useEffect, useState } from 'react'

export default function dashboard() {
    const [baseData,setBaseData] = useState([])
    const [addBase,setAddBase] = useState("")
    const handleAddBase = (e) =>{
        setAddBase(e.target.value)
    }
    const handleClick = (e) =>{
        e.preventDefault()
        if(addBase && addBase.trim().length != 0){
            alert("will send data")
        }
    }
    const Displaydata = baseData.map((base,index) =>{
        const bgColor = index %2 == 1 ? 'bg-white' : 'bg-gray-100';
        return (
            <div className={`flex justify-around items-center gap-4 ${bgColor} shadow-lg min-w-full p-2  border-l border-r`}>
                <span className='font-semibold text-primary-first'>{base.baseName}</span>
                <span className='font-semibold text-primary-first'>numberofmissiles: {base.numberOfMissiles}</span>
            </div>
        )
    })
    useEffect(() => {
        //Will use Api to fetch base Data 
        const generateBaseData = () => {
          const newData = [];
          for (let i = 1; i <= 20; i++) {
            newData.push({
              baseName: `Base ${i}`,
              numberOfMissiles: Math.floor(Math.random() * 100) // Random number of missiles
            });
          }
          return newData;
        };
    
        // Set base data
        const newData = generateBaseData();
        setBaseData(newData);
      }, []);
  return (
    <div className='flex flex-col min-w-full items-center justify-center gap-16 bg-white min-h-screen'>
        <form className='flex justify-center items-center min-w-full'>
            <input placeholder='Add a base...' value={addBase} onChange={handleAddBase} className='focus:outline-none border border-primary-secondary focus:border-2 lg:w-3/12 w-3/6 p-3 text-gray-600' />
            <button className='font-semibold w-1/12 bg-primary-tertiary font-sans p-3 hover:scale-105 transition-all' onClick={handleClick} >Add</button>
        </form>
        {Displaydata ? (
            <div className='flex flex-col items-center lg:w-4/12 w-2/6 lg:max-h-96 md:max-h-60 overflow-auto'>
              {Displaydata}
            </div>
          ) : (
            <p>Loading...</p>
          )}
    </div>
  )
}
