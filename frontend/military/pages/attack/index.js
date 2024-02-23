import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Options from './options'


// Validator Yet to Add


function attackPage () {
    
    const router  = useRouter()
    const [city, setCity] = useState("")
    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const [invalid, setInvalid] = useState(false)

    const changeHandler = (e) => {
        setCity(e.target.value)
        
    }

    const latFinder = async () => {
        const res = await fetch(`https://geocode.maps.co/search?q=${city}&api_key=65d8820377ee7965505431fjt1e9e47`);
        const response = await res.json();   
    
        if(response.length > 0){
            setInvalid(false)
            setLat(response[0].lat)
            setLong(response[0].lon) 
        }
        else(
            setInvalid(true)
        ) 
        
    }


    if (lat === 0 && long ===0){
        return (
            <main className='flex flex-col min-h-screen bg-white items-center justify-center'>
                <div>
                    <h1 className='font-bold text-xl my-4 '>Attack a City.</h1>
                    <input type="text" placeholder='Enter City Name' className='bg-gray-200 px-4 py-2 rounded-lg' onChange={(e) => {changeHandler(e)}} />
                    <button className='px-4 mx-2 py-2 bg-primary-first text-white rounded-lg' onClick={latFinder}>Find</button>      
                    {invalid ? <p className='text-red-400 my-2'> *City Not Found. Please check spellings. </p> : <p></p>}
                </div>

            </main>
        )
    } else
    {
        return (
            <Options props={{latitude: lat, longitude: long}}> </Options>
        )   
    }
    
    


}
        

export default attackPage