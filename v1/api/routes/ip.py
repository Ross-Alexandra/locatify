from api.app import app
from api.app import mmdb_location
from api.route_functions.get_ip_info import get_ip_info

from flask import jsonify
import geoip2.database

@app.route("/ip/<ip_address>", methods=["GET"])
def get_ip(ip_address):
    with geoip2.database.Reader(mmdb_location) as mmdb_reader:
        response = get_ip_info(mmdb_reader, ip_address)
        status = response["status"]

        del response["status"]

        return jsonify(response), status
