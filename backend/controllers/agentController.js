import Agent from "../models/Agent.js";
import bcrypt from "bcryptjs";

// Add new agent
export const addAgent = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if agent already exists
    const exists = await Agent.findOne({ email });
    if (exists) return res.status(400).json({ message: "Agent already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create agent
    const agent = await Agent.create({ name, email, phone, password: hashedPassword });

    res.status(201).json(agent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all agents
export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select("-password"); // exclude password
    res.json(agents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
