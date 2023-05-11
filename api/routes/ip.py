from api.app import app
from api.routes import mmdb_reader
from api.helpers.get_ip_info import get_ip_info

@app.route('/ip/<ip_address>', methods=['GET'])
def get_ip(ip_address):
    try:
        return get_ip_info(mmdb_reader.reader, ip_address)
    except Exception as e:
        return {
            'error': f'An error occurred while attempting to retrieve the IP address: {e}'
        }
