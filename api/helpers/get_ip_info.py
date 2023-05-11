from geoip2.errors import AddressNotFoundError

def get_ip_info(reader, ip_address):
    try:
        response = reader.city(ip_address)

        return {
            "status": 200,
            "ip_address": ip_address,
            "country_code": response.country.iso_code,
            "postal_code": response.postal.code,
            "city": response.city.name,
            "time_zone": response.location.time_zone,
            "latitude": response.location.latitude,
            "longitude": response.location.longitude,
            "accuracy_radius": response.location.accuracy_radius,
        }

    except AddressNotFoundError as e:
        return {
            "status": 404,
            "error": f"Could not find IP address {ip_address} in database"
        }
    except Exception as e:
        return {
            "status": 400,
            "error": f"Unexpected error while looking up IP address: {e}"
        }
