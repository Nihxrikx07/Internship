document.getElementById('project-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('project-title').value;
  const description = document.getElementById('project-description').value;

  if (title && description) {
    const list = document.getElementById('project-list');
    const li = document.createElement('li');

    li.innerHTML = `
      <span><strong>${title}</strong>: ${description}</span>
    `;

    list.appendChild(li);

    document.getElementById('project-form').reset();
  }
});
const mongoose = require("mongoose");
const express = require("express");
const AddProject = require("./models/project.js");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Fullstack", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

app.use(cors());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// GET all projects
app.get('/api/services', async (req, res) => {
  try {
    const projects = await AddProject.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST new project
app.post('/api/services', async (req, res) => {
  const { name, status } = req.body;

  if (!name || !status) {
    return res.status(400).json({ error: 'Name and status are required' });
  }

  const prjDetails = new AddProject({ id: Date.now(), name, status });

  try {
    await prjDetails.save();
    res.status(200).json({ message: 'Project added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save project' });
  }
});

// Contact Form Schema (MongoDB)
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// API endpoint to handle form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();
    res.json({ message: 'Thank you for contacting us!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save contact data' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

