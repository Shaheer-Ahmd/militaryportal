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

    const changeHandler = (e) => {
        setCity(e.target.value)
        
    }

    const latFinder = async () => {
        const res = await fetch(`https://geocode.maps.co/search?q=${city}&api_key=65d8820377ee7965505431fjt1e9e47`);
        const response = await res.json();   
    
        setLat(response[0].lat)
        setLong(response[0].lon)   
        
    }


    if (lat === 0 && long ===0){
        return (
            <>
                <input type="text" onChange={(e) => {changeHandler(e)}} />
                <button className='btn' onClick={latFinder}>Find</button>      
            </>
        )
    } else
    {
        return (
            <Options props={{latitude: lat, longitude: long}}> </Options>
        )   
    }
    
    


}
        

export default attackPage