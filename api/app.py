from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

# In both docker & local development, the .env file is
# located in the root directory of the project. Because
# of this, we know that the .env file will always be
# one level up.
load_dotenv('../.env')

from api.setup import get_mmdb_location

mmdb_location = get_mmdb_location()
app = Flask(__name__)
CORS(app) # This will enable CORS for all routes, not recommended for production.

import api.routes.ip
import api.routes.ips
import api.routes.health_check