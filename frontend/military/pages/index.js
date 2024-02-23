import Nav from "./components/Nav";
import FormSignIn from "./components/FormSignIn";
import { signIn } from 'next-auth/react'
import { useState } from "react";
export default function Home() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(!email || !password){
      setError("Both input fields must be set")
    }
    if(email.trim().length == 0 || password.trim().length == 0){
      setError("Both input fields must be set")
    }else{
      setError("")
      const res = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false
      })
      console.log(res)
    }

   
      

    

  }
  return (
    <main className="flex flex-col min-h-screen bg-white items-center justify-center">
        <FormSignIn setEmail = {setEmail} setPassword ={setPassword} email = {email} password = {password} handleSubmit = {handleSubmit} error = {error}/>
    </main>
  );
}