import os
import requests
import tarfile
import glob
import shutil

license = os.environ.get("LICENSE_KEY", None) or None
mmdb_path = os.environ.get("MMDB_PATH", None) or None
default_mmdb_path = "/maxmind-db/GeoLite2-City.mmdb"


def no_license_no_path():
    raise Exception(
        "Both the LICENSE_KEY, and the MMDB_PATH environment variables are not set within the .env file. At least one of these is required, as this API relies on the mmdb file. Please read the README.md file for more information."
    )


def path_exists_but_not_file():
    raise Exception(
        "The MMDB_PATH environment variable is set, but the file does not exist."
    )


def download_mmdb_file():
    try:
        download_url = f"https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={license}&suffix=tar.gz"
        print(f"Downloading MaxMind database file from {download_url}...")
        handle = requests.get(download_url, stream=True)
        file = tarfile.open(fileobj=handle.raw, mode="r|gz")
        file.extractall(path="/maxmind-db/tmp")
    except Exception as e:
        raise Exception(
            f"An error occurred while downloading the MaxMind database file: {e}. Please verify that the LICENSE_KEY environment variable is correct, or specify a MMDB_PATH."
        )

    # The file is extracted to a tmp directory, so we need to move it to the correct location.
    mmdb_files = glob.glob("/maxmind-db/tmp/**/*.mmdb")
    if len(mmdb_files) == 0:
        raise Exception(
            "The MaxMind database file was not found in the downloaded tar.gz file. Please verify that the LICENSE_KEY environment variable is correct, or specify a MMDB_PATH."
        )

    shutil.move(mmdb_files[0], default_mmdb_path)
    shutil.rmtree("/maxmind-db/tmp")

    print("MaxMind database file downloaded successfully.")


def get_mmdb_location():
    if license is None and mmdb_path is None:
        no_license_no_path()

    elif mmdb_path is not None:
        if not os.path.exists(mmdb_path):
            path_exists_but_not_file()
        else:
            return mmdb_path

    elif license is not None:
        if not os.path.exists(default_mmdb_path):
            download_mmdb_file()

        return default_mmdb_path
