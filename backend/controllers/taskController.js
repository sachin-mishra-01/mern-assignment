import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import Agent from "../models/Agent.js";
import Task from "../models/Task.js";

// Multer setup for file upload
const upload = multer({ dest: "uploads/" });

// Upload CSV and distribute tasks to agents
export const uploadCsv = [
  upload.single("file"),
  async (req, res) => {
    try {
     
      if (!req.file) return res.status(400).json({ message: "No file uploaded" });

      const results = [];
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          fs.unlinkSync(req.file.path); // delete uploaded file

          // Get all agents
          const agents = await Agent.find();
          if (agents.length < 1)
            return res.status(400).json({ message: "No agents found" });

          // Distribute tasks evenly
       
       
          const distributed = [];
          let i = 0;
          results.forEach((item) => {
            const agent = agents[i % agents.length];
            distributed.push({
              firstName: item.FirstName,
              phone: item.Phone,
             
             
              notes: item.Notes,
              agent: agent._id,
            });
            i++;
          });

          // Save tasks to DB
          await Task.insertMany(distributed);

          res.json({ message: "Tasks uploaded and distributed successfully" });
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
];

// Get all tasks with populated agent info
export const getTasks = async (req, res) => {
  try {
   
    const tasks = await Task.find().populate("agent", "name email");
    res.json(tasks);
  } catch (err) {
  
  
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
