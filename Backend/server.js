const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(express.json());

app.get('/api/data', (req, res) => {
  res.json({ message: 'Data from Node backend' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
