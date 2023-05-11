def get_ip_info(reader, ip_address):
    response = reader.city(ip_address)

    return {
        'ip_address': ip_address,
        'country_code': response.country.iso_code,
        'postal_code': response.postal.code,
        'city': response.city.name,
        'time_zone': response.location.time_zone,
        'latitude': response.location.latitude,
        'longitude': response.location.longitude,
        'accuracy_radius': response.location.accuracy_radius,
    }