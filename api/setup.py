import os
import requests
import tarfile
import glob
import shutil

LICENSE = os.environ.get("LICENSE_KEY", None) or None
MMDB_PATH = os.environ.get("MMDB_PATH", None) or None
FILE_NAME = "GeoLite2-City.mmdb"


def no_license_no_path():
    raise Exception(
        "Both the LICENSE_KEY, and the MMDB_PATH environment variables are not set within the .env file. At least one of these is required, as this API relies on the mmdb file. Please read the README.md file for more information."
    )


def path_exists_but_not_file():
    raise Exception(
        "The MMDB_PATH environment variable is set, but the file does not exist as specified or relative to the /api path. Please verify that the file exists, or specify an absolute path to the file."
    )


def download_mmdb_file():
    download_directory = "/maxmind-db/tmp"

    try:
        download_url = f"https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={LICENSE}&suffix=tar.gz"
        handle = requests.get(download_url, stream=True)
        file = tarfile.open(fileobj=handle.raw, mode="r|gz")
        try:
            file.extractall(path=download_directory)
        except:
            # If we're in an environment where we can't write to the root directory, try to write to the parent directory.
            download_directory = "../maxmind-db/tmp"
            file.extractall(path=download_directory)
    except Exception as e:
        raise Exception(
            f"An error occurred while downloading the MaxMind database file to {download_directory}: {e}. Please verify that the LICENSE_KEY environment variable is correct, or specify a MMDB_PATH."
        )

    # The file is extracted to a tmp directory, so we need to move it to the correct location.
    mmdb_files = glob.glob(os.path.join(download_directory, "**/*.mmdb"))
    if len(mmdb_files) == 0:
        raise Exception(
            "The MaxMind database file was not found in the downloaded tar.gz file. Please verify that the LICENSE_KEY environment variable is correct, or specify a MMDB_PATH."
        )

    maxmind_folder = download_directory.replace("/tmp", "")
    file_path = os.path.join(maxmind_folder, FILE_NAME)
    shutil.move(mmdb_files[0], file_path)
    shutil.rmtree(download_directory)

    return file_path


def download_or_use_license_mmdb_file():
    root_directory = f"/maxmind-db/{FILE_NAME}"
    relative_directory = f"../maxmind-db/{FILE_NAME}"

    if os.path.exists(root_directory):
        return root_directory
    elif os.path.exists(relative_directory):
        return relative_directory
    else:
        return download_mmdb_file()


def get_mmdb_location():
    if LICENSE is None and MMDB_PATH is None:
        no_license_no_path()

    elif MMDB_PATH is not None:
        print("MMDB_PATH", MMDB_PATH)
        # If the file exists, return the path.
        if os.path.exists(MMDB_PATH):
            return MMDB_PATH

        elif os.path.join("..", MMDB_PATH):
            return os.path.join("..", MMDB_PATH)

        # Otherwise, if the license is set, then we can
        # fallback to downloading the file.
        elif bool(LICENSE):
            return download_or_use_license_mmdb_file()

        # Otherwise, the file doesn't exist, and the license
        # is not set, so we can't do anything. Throw an Exception.
        else:
            path_exists_but_not_file()

    elif LICENSE is not None:
        return download_or_use_license_mmdb_file()
