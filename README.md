# Max Mind Assignment
An implementation of the assignment created by the company MaxMind used during their interview process for their Senior Web Developer/Software Engineer position.

# Getting Started
## .env
**Before following any instructions below**, you must enter the following information into the [.env](./.env) file. This project cannot run without this critical information.
```
LICENSE_KEY=<YOUR_LICENSE_KEY>
```

example:
```
LICENSE_KEY=123abc_this_is_my_license_key
```

## Using Docker
The easiest way to run this project is to use Docker. This project is configured to run using Docker Compose, so all you need to do is run the following command from the root of the project:
```bash
docker-compose up
```
> If you don't have Docker or Docker Compose installed, please follow the instructions [here](https://docs.docker.com/get-docker/). Using Docker Desktop is the easiest way to get started if you have no experience with Docker, so it is recommended.

This will build the Docker image, and run in a standalone way. This docker image is configured for development, and will run in a way that allows for hot reloading of the API and App code, so any changes made to the code will be reflected in the running container. This is useful for development, but not recommended for production.

## Without Docker
If you do not wish to use Docker, then you can run the project without it. This can be done by separately running the API and App. Further, you will need to manually install the dependencies for each project. This can be done by running the following commands
- From the app directory:
  ```bash
  npm install
  ```
- from the api directory (without a venv):
  ```bash
  pip install -r requirements.txt
  ```
- from the api directory (with a venv):
  ```bash
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```
> Note, this project was developed using Python 3.10.6, and Node 18.16.0 It is recommended to use these versions, but it is likely that any version of Python 3.6+ and Node 12+ will work.

Once the dependencies are installed, you can run the API and App separately. This can be done by running the following commands from the root of the project:
- From the api directory:
  ```bash
  python -m flask --app app run -p 34343
  ```
  > Note, you may wish to use the `--debug` flag at the end of this command if you want to enable hot reloading. This is useful for development, but not recommended for production.
- To run the App:
  ```bash
    npm start
    ```
> Note, the API will not run without the `.mmdb` file. By default it will attempt to download one, however if you already have one downloaded, then you can specify the path to it by setting the `MMDB_PATH` key in the `.env` file. This will prevent the API from attempting to download the `.mmdb` file. For more information, see the First Run section of the [API Documentation](##api).

# Documentation
## API
This API is written in Python using Flask in coordination with the geoip2 `.mmdb` reader library.

### First Run
When running the API it is possible to specify a path which the `.mmdb` file can be located at. If none is provided then in order to properly access the `.mmdb` file, the API will attempt to download & unzip the `.mmdb` file using the provided MaxMind license key. Should this fail for any reason, a warning will be provided and the api will automatically terminate.

To specify a path to the `.mmdb` file, you can set the `MMDB_PATH` key in the `.env` file. This will prevent the API from attempting to download the `.mmdb` file. By default this key is not set, so the API will attempt to download the `.mmdb` file.
example:
```
MMDB_PATH=/path/to/GeoLite2-City.mmdb
```

Once the API has access to a `.mmdb` file, it will be accessible at [localhost:34343](http://localhost:34343/). This can be verified by hitting the [health check endpoint](http://localhost:34343/health-check/)

### Endpoints
#### GET `/health-check`
- Always returns a `200` response with the text `"Healthy!"`.
- If this is not returned, then the API is not running properly, or you are not accessing the correct host.

#### GET `/ip/<ip_address>`
- If `<ip_address>` is both valid, and exists within the `.mmdb` file, then a `200` response is returned with the following JSON:
  ```json
  {
    "ip_address": "string <ip_address>",
    "country_code": "string <country_code>",
    "postal_code": "string <postal_code>",
    "city": "string <city_name>",
    "time_zone": "string <time_zone>",
    "accuracy_radius": "int <accuracy_radius>",
  }
  ```
- If `<ip_address>` is invalid, then a `400` response is returned with the following JSON:
  ```json
  {
    "error": "string <error_message>"
  }
  ```
- If `<ip_address>` is valid, but does not exist within the `.mmdb` file, then a `404` response is returned with the following JSON:
  ```json
  {
    "error": "string <error_message>"
  }
  ```

### POST `/ip/bulk`
Body
```
{
  "ip_addresses": [
    "string <ip_address>",
    ...
  ]
}
```
- The response from this endpoint is the same as if a list of `GET /ip/<ip_address>` requests were made. IE, The response will be shaped like the following body (depending on the result of each lookup):
```
{
    "ip_addresses": [
        {
            "ip_address": "string <ip_address>",
            "country_code": "string <country_code>",
            "postal_code": "string <postal_code>",
            "city": "string <city_name>",
            "time_zone": "string <time_zone>",
            "accuracy_radius": "int <accuracy_radius>",
        },
        {
            "error": "string <error_message>"
        },
        ...
    ]
}
```
- This endpoint should always be used when fetching multiple ip's, as it uses `multiprocessing` under the hood to simultaneously query the `.mmdb` file. This allows for a significant speedup when querying multiple ip's.
- This endpoint is made using a POST request as it is possible that the list of ip's could be too large to fit in a GET request. This is unlikely, but possible. This is also why the list of ip's is sent in the body of the request, rather than as a query parameter. In the future, it may be worth considering responding with a `303`, and providing a link to a file containing the results of the request. This would allow for the request to be made using a GET request, and would allow for the results to be cached. This however would require an additional database to be setup, and is likely outside the scope of this assignment.

## App
This app is written in React using TypeScript. It is configured to be un-opinionated on how & where it is hosted. In the future, SSR could be added to this project, but it is not currently implemented as it is unclear how necessary it is for this project.

## Deployment Considerations
Though this implementation attempts to create a production-ready version of this assignment,
it is not being deployed. In order to make this project deployment-ready, a few concerns must
be solved:
 - The current setup using a `.mmdb` file from the local file system is likely not suitable for a deployment as auto-updating is not taken into account which is vital for long term accuracy.
    - This could be mitigated by moving to a GeoLite2 web service (prohibited by the assignment), or
    - This could be mitigated by creating a separate db service, and use automatic re-downloading and conversion of MaxMind's offered `.csv` format, and using a more standard SQL database setup (likely outside the scope of this assignment as it specifies using the DB Readers, which use `.mmdb` files).
- The current setup provides no specialized docker configuration for production, and additionally does not provide any opinion on how it should be hosted.
    - This could be solved by creating a production docker image, and providing a docker-compose file. 
    - Alternatively, this could be solved with additional configuration as part of a larger CI/CD pipeline, and deployed to a cloud provider such as AWS, Azure, or GCP. This would likely be the preferred solution for a production deployment.
- The frontend app is not configured in any opinionated way. Thus, work would need to be done in order to configure it for a production deployment.
    - This could be solved by creating a small express server (or by converting this to a Next.JS project) to serve the static files, and provide a docker-compose file.
    - Alternatively, this could be solved with additional configuration as part of a larger CI/CD pipeline, and deployed to a cloud provider such as AWS, Azure, or GCP. This would likely be the preferred solution for a production deployment.
- The backend API currently has basic CORS configuration allowing all routes, this is not suitable for a production environment.
    - This could be solved by configuring CORS to only allow the frontend app to access the API in a production environment.

## Future Improvements
- This README is being created at the outset of the project as an outline. As such, no future improvements are currently known, as no implementation exists.
