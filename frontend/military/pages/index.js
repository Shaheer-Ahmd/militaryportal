import Nav from "./components/Nav";
import FormSignIn from "./components/FormSignIn";
import { useState } from "react";
export default function Home() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const handleSubmit = (e) =>{
    e.preventDefault()
    alert(email,password)
  }
  return (
    <main className="flex flex-col min-h-screen bg-white items-center justify-center">
      <Nav/>
        <FormSignIn setEmail = {setEmail} setPassword ={setPassword} email = {email} password = {password} handleSubmit = {handleSubmit}/>
    </main>
  );
}