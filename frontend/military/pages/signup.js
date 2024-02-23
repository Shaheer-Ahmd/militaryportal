import React, { useState } from 'react'
import FormSignUp from './components/FormSignUp'


export default function page() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [name,setName] = useState("")
    const [rank,setRank] = useState("")
    const [error,setError] = useState("")
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(!email || !password ||!rank ||!name){
          setError("All input fields must be set")
        }
        if(email.trim().length == 0 || password.trim().length == 0 || name.trim().length == 0 || rank.trim().length == 0){
          setError("All input fields must be set")
        }else{
          setError("")
          console.log(name,rank,email,password)
          
        }



      }
  return (
    <div className='flex flex-col justify-center items-center bg-white min-h-screen'>
        <FormSignUp setEmail = {setEmail} setPassword = {setPassword}  setName = {setName} setRank = {setRank} email = {email}  password = {password} name = {name} rank = {rank} handleSubmit =  {handleSubmit} error = {error}/>
        
    </div>
  )
}