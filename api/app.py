import os

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

# In both docker & local development, the .env file is
# located in the root directory of the project. Because
# of this, we know that the .env file will always be
# one level up.
load_dotenv('../.env')

license = os.environ.get('LICENSE_KEY')
mmdb_path = os.environ.get('MMDB_PATH')
if license is None and mmdb_path is None:
    raise Exception('Both the LICENSE_KEY, and the MMDB_PATH environment variables are not set within the .env file. At least one of these is required, as this API relies on the mmdb file. Please read the README.md file for more information.')

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes, not recommended for production.

from api.routes import *