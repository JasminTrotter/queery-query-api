import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config.js';
import cors from 'cors';
import { getEvents } from './controllers/events.controller.js';

const app = express();

app.use(bodyParser.json());

app.use(cors());

// Get Events Route
app.get("/events", async (req, res) => {
  try {
    console.log('Getting events based on query:', req.query);

    const { zipcode, maxDistance } = req.query;
    const events = await getEvents(zipcode, maxDistance);

    res.send(events);
  } catch (e) {
    throw new Error(`Error getting events: ${e.message}`);
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

