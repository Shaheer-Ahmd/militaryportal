import Nav from "./components/Nav";
import FormSignIn from "./components/FormSignIn";
import { useState } from "react";
export default function Home() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!email || !password){
      setError("Both input fields must be set")
    }
    if(email.trim().length == 0 || password.trim().length == 0){
      setError("Both input fields must be set")
    }else{
      setError("")
    }
  }
  return (
    <main className="flex flex-col min-h-screen bg-white items-center justify-center">
        <FormSignIn setEmail = {setEmail} setPassword ={setPassword} email = {email} password = {password} handleSubmit = {handleSubmit} error = {error}/>
    </main>
  );
}