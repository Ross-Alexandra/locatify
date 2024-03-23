export function getMapUrl(lat: number, long: number) {
    return `https://maps.google.com/maps?output=embed&q=${lat},${long}`;
}
