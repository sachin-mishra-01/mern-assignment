import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [groupedTasks, setGroupedTasks] = useState({});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("Fetched Tasks:", data); 
      if (res.ok || !data.message) {
        setTasks(data);
        groupByAgent(data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const groupByAgent = (tasks) => {
    const grouped = {};
    tasks.forEach((task) => {
      const agentName = task.agent.name;
      if (!grouped[agentName]) grouped[agentName] = [];
      grouped[agentName].push(task);
    });
    setGroupedTasks(grouped);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

       

       
        {Object.keys(groupedTasks).length === 0 && (
          <p className="text-gray-500">No tasks available yet.</p>
        )}

        {Object.keys(groupedTasks).map((agent) => (
          <div key={agent} className="mb-6 bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">{agent}'s Tasks</h2>
            <table className="w-full table-auto border">
              <thead>
               
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">First Name</th>
                  
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
              
                {groupedTasks[agent].map((task) =>  (
                  
                  <tr key={task._id}>
                    
                    <td className="border px-4 py-2">{task.firstName}</td>
                    <td className="border px-4 py-2">{task.phone}</td>
                    <td className="border px-4 py-2">{task.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
