import nodeGeocoder from 'node-geocoder';

export async function getCoordinatesFromZipcode(postalcode) {
  try {
    const geoCoder = nodeGeocoder({
      provider: 'openstreetmap'
    });

    const geoObjectArray = await geoCoder.geocode({ postalcode, country: 'US' });
    const selectedGeoObject = geoObjectArray.find((geoObj) => geoObj.zipcode === postalcode);

    if (!selectedGeoObject) {
      console.log('Could not find coordinates from zipcode, returning empty []');

      return [];
    }

    return [selectedGeoObject.longitude, selectedGeoObject.latitude];

  } catch (e) {
    throw new Error(`Error getting coordinates from zipcode ${postalcode}: ${e.message}`)
  }
}

export function getMetersFromMiles(miles) {
  return miles * 1609.34;
}
