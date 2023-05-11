from api.app import app
from api.routes import mmdb_reader
from api.helpers.get_ip_info import get_ip_info

from flask import jsonify

@app.route("/ip/<ip_address>", methods=["GET"])
def get_ip(ip_address):
    response = get_ip_info(mmdb_reader.reader, ip_address)
    status = response["status"]

    del response["status"]

    return jsonify(response), status