from api.app import app
from api.app import mmdb_location
from api.route_functions.get_ip_info import get_ip_info

from flask import request
import multiprocessing
import geoip2.database

def get_ip_info_wrapper(ip_address):
    with geoip2.database.Reader(mmdb_location) as reader:
        return get_ip_info(reader, ip_address)

@app.route("/ips/", methods=["POST"])
def get_bulk_ips():
    cores = multiprocessing.cpu_count()

    # We want to leave at least 2 cores free for the OS
    # and other processes
    pool_count = min(cores - 2, 1)

    with multiprocessing.Pool(pool_count) as pool:
        ip_addresses = request.json["ip_addresses"]
        if any([not isinstance(ip_address, str) for ip_address in ip_addresses]):
            return {"error": "All IP addresses must be strings"}

        return pool.map(get_ip_info_wrapper, ip_addresses)
