from api.app import app
from api.routes import mmdb_reader
from api.helpers.get_ip_info import get_ip_info

from flask import request

@app.route('/ips/', methods=['POST'])
def get_bulk_ips():
    try:
        ip_addresses = request.json['ip_addresses']
        if (any([not isinstance(ip_address, str) for ip_address in ip_addresses])):
            return {
                'error': 'All IP addresses must be strings'
            }

        return [get_ip_info(mmdb_reader.reader, ip_address) for ip_address in ip_addresses]
    except Exception as e:
        return {
            'error': f'An error occurred while attempting to retrieve the IP address: {e}'
        }
