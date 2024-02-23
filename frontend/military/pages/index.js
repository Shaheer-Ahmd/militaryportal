import React from 'react'
import { signIn } from 'next-auth/react'

function Home() {
    return (
        <main className='flex flex-col min-h-screen bg-white items-center justify-center'>
            <button onClick={signIn}>SIGN IN</button>
        </main>
    )
}

export default Home
