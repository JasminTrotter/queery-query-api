import connection from '../database-connection.js';
import { getMetersFromMiles, getCoordinatesFromZipcode } from '../utils/conversions.js';

export async function getEvents(zipcode, maxDistance = 100) {
  const coordinates = await getCoordinatesFromZipcode(zipcode);

  if (coordinates.length < 2) return [];

  const events = await connection
    .db('QueeryTest')
    .collection('EventsTest')
    .find({ location: { $near: { $maxDistance: getMetersFromMiles(parseInt(maxDistance)), $geometry: { type: "Point", coordinates } } } })
    .toArray();

  return events;
}