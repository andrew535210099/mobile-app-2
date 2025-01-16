const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors);

app.use(express.json()); // Middleware for parsing JSON
// Connect to MongoDB
mongoose.connect('mongodb+srv://andrewpurba54:Mynameacp1688@cluster1.3idadyo.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a simple schema and model for MongoDB
const Item = mongoose.model('Item', new mongoose.Schema({ name: String }));
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
}));

app.get('/login', async(req, res) => {
  console.log("report aja sih ini ");
})


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  
  try {
    // Validasi user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } 

    // Validasi password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Jika berhasil login
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Create a route to fetch items
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
