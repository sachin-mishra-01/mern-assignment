import { useState } from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

export default function UploadList() {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
  
  
    e.preventDefault();
  if (!file) return alert("Select a file first");
  
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://localhost:5000/api/tasks/upload", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });
    const data = await res.json();
    if (res.ok) {
      alert("File uploaded and tasks distributed successfully");
      setFile(null);
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
       
       
          <h1 className="text-2xl font-bold mb-6">Upload List</h1>
          <form onSubmit={handleUpload}>
            <input 
              type="file" 
              accept=".csv, .xlsx, .xls" 
             
             
              onChange={e=>setFile(e.target.files[0])}
              className="mb-4"
            />
            <Button>Upload</Button>
        
        
          </form>
        </div>
      </div>
    </div>
  );
}
