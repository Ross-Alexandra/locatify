// This key is restricted to Google Maps embed access which
// is free & unlimited. Thus, it is safe to commit to the repo.
// https://developers.google.com/maps/documentation/javascript/get-api-key#restrict_key
const API_KEY = 'AIzaSyDlmsVo1s5SEcxqzVWB2wNnlq3evBV59Jg';

export function getMapUrl(lat: number, long: number) {
    return `http://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${lat},${long}&center=${lat},${long}&zoom=12&maptype=roadmap`;
}