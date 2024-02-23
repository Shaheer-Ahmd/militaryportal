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
        <h1>
            {props.latitude}
        </h1>  
    )
}

export default Options
