const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const dataFilePath = path.join(__dirname, 'data', 'data.json');

async function readData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
}

async function writeData(data) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

// Get all photos
app.get('/api/photos', async (req, res) => {
  console.log("got a request for photos");
  const photos = await readData();
  res.json(photos);
});

// Update photo caption
app.put('/api/photos/like/:id', async (req, res) => {
  const { id } = req.params;
  const photos = await readData();
  const selectedPhoto = photos.filter((photo) => photo.id == id);
  const updatedPhotos = photos.map((photo) =>
    photo.id == id ? { ...photo, likedCount: selectedPhoto[0].likedCount + 1 } : photo
  );
  await writeData(updatedPhotos);
  res.json(updatedPhotos);
});

app.put('/api/photos/dislike/:id', async (req, res) => {
    const { id } = req.params;
    const photos = await readData();
    const selectedPhoto = photos.filter((photo) => photo.id == id);
    const updatedPhotos = photos.map((photo) =>
      photo.id == id ? { ...photo, dislikedCount: selectedPhoto[0].dislikedCount + 1 } : photo
    );
    await writeData(updatedPhotos);
    res.json(updatedPhotos);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
