import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';




dotenv.config();

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

const clientId =  process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let token = null;

const getToken = async ()=>{
  const res = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials'
    })
  });

  const data = await res.json();
  token = data.access_token;
};

await getToken();

app.post('/games', async (req, res) =>{
  try{
    const resG = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: req.body.query
    });

    
    const text= await resG.text();

    if (!resG.ok){
      console.error('uhhh:', text);
      return res.status(resG.status).send(text);
    }

    const games = JSON.parse(text);
    res.json(games);
  }
  catch (e)
  {
    res.status(500).json({error: e.message});
  }
});

app.post('/genres', async(req, res) =>{
  try{
    const resG = await fetch('https://api.igdb.com/v4/genres', {
      method: 'POST',
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: req.body.query 
    });

    const text = await resG.text();

    if (!resG.ok) {
      console.error('uhhh:', text);
      return res.status(resG.status).send(text);
    }

    const genres = JSON.parse(text);
    res.json(genres);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// app.listen(PORT, ()=> console.log(`Backend running on ${PORT}`));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
})

