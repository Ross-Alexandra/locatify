import geoip2.database


class MMDB:
    def __init__(self, mmdb_path):
        self.reader = geoip2.database.Reader(mmdb_path)

    def __del__(self):
        self.reader.close()
