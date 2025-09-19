import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

export default function AddAgent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

 const handleAddAgent = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  try {
    const res = await fetch("http://localhost:5000/api/agents", {
     
      method: "POST",
      headers: { 
     
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ name, email, phone, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Agent added successfully");
      setName(""); setEmail(""); setPhone(""); setPassword("");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      
      <div className="p-6 flex justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Add Agent</h1>
         
         
          <form onSubmit={handleAddAgent}>
            <Input label="Name" type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Agent Name"/>
           
           
            <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Agent Email"/>
            <Input label="Mobile" type="text" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+91 1234567890"/>
            <Input label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
            <Button>Add Agent</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
