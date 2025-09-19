import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout");
    navigate("/"); 
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">Admin Panel</div>
      <div className="space-x-4">

        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
       
        <Link to="/add-agent" className="hover:underline">Add Agent</Link>
        <Link to="/upload-list" className="hover:underline">Upload List</Link>
        
        
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </nav>
  );
}
