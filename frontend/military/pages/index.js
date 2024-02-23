import React from 'react'
import { signIn } from 'next-auth/react'
import axios from 'axios';

function Home() {
    const clickHandler = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000");
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <main className='flex flex-col min-h-screen bg-white items-center justify-center'>
            <button onClick={signIn}>SIGN IN</button>
        </main>
    )
}

export default Home
