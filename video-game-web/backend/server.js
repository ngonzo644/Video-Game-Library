import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {AsyncLocalStorage} from "node:async_hooks";





dotenv.config();

const app = express();

const logStorage = new AsyncLocalStorage();

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

app.post('/favorite-games', async (req, res) => {
  try {
    const { gameIds } = req.body;

    // Make sure gameIds exists and is an array
    if (!Array.isArray(gameIds)) {
      return res.status(400).json({
        error: 'gameIds must be an array'
      });
    }

    // If there are no favorites, just return an empty array
    if (gameIds.length === 0) {
      return res.json([]);
    }

    // Make sure all IDs are numbers
    const ids = gameIds
      .map(Number)
      .filter(id => Number.isInteger(id));

    if (ids.length === 0) {
      return res.json([]);
    }

    //  IGDB query
    const query = `
      fields
        id,
        name,
        cover.image_id,
        first_release_date,
        genres.name;
      where id = (${ids.join(',')});
    `;

    const response = await fetch(
      'https://api.igdb.com/v4/games',
      {
        method: 'POST',
        headers: {
          'Client-ID': clientId,
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: query
      }
    );

    const text = await response.text();

    if (!response.ok) {
      console.error('fav search error:', text);
      return res.status(response.status).send(text);
    }

    const games = JSON.parse(text);

    res.json(games);

  } catch (error) {
    console.error('Favorite games error:', error);

    res.status(500).json({
      error: error.message
    });
  }
});



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

app.post('/platform_families', async(req, res) =>{
  try{
    const resG = await fetch('https://api.igdb.com/v4/platform_families', {
      method:'POST',
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${token}`,
        'Accept' : 'application/json'
      },
      body: req.body.query
    });

    const text = await resG.text();
    if (!resG.ok){
      console.error("company dont work");
      return res.status(resG.status).send(text);
    }

    const companies = JSON.parse(text);
    res.json(companies);
  }
  catch(e){
    res.status(500).json({error: e.message});
  }
});

// app.listen(PORT, ()=> console.log(`Backend running on ${PORT}`));

//what is the curr file?
const __filename = fileURLToPath(import.meta.url);
// where is this file?
const __dirname = path.dirname(__filename);

//allow easy access for whenever backend gets request to recognize where in the frontend it
// exactly is, essentially getting rid of hardcoding every single route possible
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// send index.html if fetch was an undefined route 
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

//start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
})

