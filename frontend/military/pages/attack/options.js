import React from 'react'

function Options({props}){
   
    
    const fetcher = async () => {
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ title: 'React POST Request Example' })
        // };
    
        const response = await fetch('http://localhost:8000/', requestOptions);
        const data = await response.json();
       
    }
    
    
    return (
        <main className='flex flex-col min-h-screen bg-white items-center justify-center'>
                <div>
                    <h1> Latitude: {props.latitude} </h1>
                    <h1> Longitude: {props.longitude} </h1>
                </div>
        </main>
    )
}

export default Options
