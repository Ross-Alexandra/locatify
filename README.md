# Max Mind Assignment
An implementation of the assignment created by the company MaxMind used during their interview process for their Senior Web Developer/Software Engineer position.

# Getting Started
## Environment Setup
**Before following any instructions below**
You will need to create a `.env` file. This can be accomplished by copying the `template.env` file, and renaming it to `.env`. 

In order to start the app, you will need to either provide a `LICENSE_KEY` (which is a MaxMind license key), or you will need to provide an `MMDB_PATH` (a path to the `.mmdb` database file). Having both is not required.

> Note, if you plan to use docker you will need to provide the `LICENSE_KEY` in the `.env` file. This is because the docker image is built using the `LICENSE_KEY` environment variable. If you do not provide this, then the docker image will not be able to download the `.mmdb` file, and will fail to start. For more information on why this is setup this way, see the [Deployment Considerations](#deployment-considerations) section.

## Using Docker
The easiest way to run this project is to use Docker. This project is configured to run using Docker Compose, so all you need to do is run the following command from the root of the project:

```bash
docker-compose up
```
>__WARNING:__ Due to Docker having its own filesystem, using the `MMDB_PATH` environment variable is unsupported when working with docker.

> Note, If you don't have Docker or Docker Compose installed, please follow the instructions [here](https://docs.docker.com/get-docker/). Using Docker Desktop is the easiest way to get started if you have no experience with Docker.

This will build the Docker image, and run in a standalone way. This docker image is configured for development, and will run in a way that allows for hot reloading of the API and App code, so any changes made to the code will be reflected in the running container. This is useful for development, but not recommended for production. For a breakdown of what is needed to get this project deployment-ready, see the [Deployment Considerations](#deployment-considerations) section.

Once the container has finished building, you will be able to access:
 - The app at [localhost:3000](http://localhost:3000)
 - The API at [localhost:34343](http://localhost:34343/health-check)

## Using Python & Node
### Installing the prerequisites
This app uses a Python backend with a React frontend. In order to run this project, you will need to have the following installed:
- Python 3.6+
- Node 12+
> Note, this project was developed using Python 3.10.6, and Node 18.16.0 It is recommended to use these versions, but it is likely that any version of Python 3.6+ and Node 12+ will work.

To install these dependencies, please follow the instructions for your operating system:
### Windows
- Python: [Download](https://www.python.org/downloads/windows/)
- Node: [Download](https://nodejs.org/en/download/) (this will install both Node and NPM)

### Linux
Python:
```bash
sudo apt install python3 python3-pip
```

Node:
```bash
sudo apt install nodejs npm
```

### Mac
Python:
```bash
brew install python3
```

Node:
```bash
brew install node
```

## Installing the dependencies
In order to run the app, you will need to install the dependencies for both the API and the App. This can be done by running the following commands from the following directories: 
- From the app directory:
  ```bash
  npm install
  ```
- from the api directory (without a venv, not recommended if you are using Python for other projects):
  ```bash
  pip install -r requirements.txt
  ```
- from the api directory (with a venv, recommended for development as it will not interfere with other Python projects):
  ```bash
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```
    - You will know that the venv is active when you see `(venv)` at the beginning of your terminal prompt. If you do not see this, then the venv is not active, and you will need to run `source venv/bin/activate` again. If you want to run using a venv, then you will need to ensure that you see this `(venv)` before following the [Running the app](#running-the-app) section.
> Note, if you are using Windows, you will need to use `venv\Scripts\activate` instead of `source venv/bin/activate`.

## Running the app
Once the dependencies are installed, you can run the API and App separately. This can be done by running the following commands from the following directories:
- From the api directory:
  ```bash
  python -m flask --app app run -p 34343
  ```
  > Note, you may wish to use the `--debug` flag at the end of this command if you want to enable hot reloading. This is useful for development, but not recommended for production.
- To run the App:
  ```bash
    npm start
    ```
    - If a browser window does not open automatically, then you can open a browser and navigate to `http://localhost:3000` to view the app.
  > Note, the API will not run without the `.mmdb` file. By default it will attempt to download one, however if you already have one downloaded, then you can specify the path to it by setting the `MMDB_PATH` key in the `.env` file. This will prevent the API from attempting to download the `.mmdb` file. For more information, see the First Run section of the [API Documentation](#api).

# Testing
## Frontend
The frontend tests use the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). These tests can be run by running the following command from the app directory:
```bash 
npm run test
```

Additionally, the frontend has been configured to use Storybook. This can be run by running the following command from the app directory:
```bash
npm run storybook
```
Storybook will open a browser window, and will allow you to view the components in isolation. This is useful for development, and can be used to test the components in a way that is not easy with the unit tests.

## Backend
The backend tests use the [PyTest](https://docs.pytest.org/en/7.1.x/getting-started.html) framework. These tests can be run by running the following command from the api directory:
```bash
pytest
```
> __WARNING__: You will also need to have your `venv` activated if you are using one in order to run the tests. For more information on how to do this, see the [Installing the dependencies](#installing-the-dependencies) section.

# Requirements Elicitation
## User Personas
In order to determine how a user would use an application within the [base requirements](#base-requirements), the following users personas were created:

### Dana Monroe (UP-1)
Dana is an office secretary who is responsible for managing the office's mailing list. He is not very tech savvy, and is not very familiar with computers.

### John Smith (UP-2)
John is a software developer who is very familiar with computers. He is very tech savvy, and is very familiar with computers.

### McKinley Kasey (UP-3)
McKinley is a partially disabled person who is unable to use a mouse. Because of this, they are only able to use a keyboard to navigate the web.

### Courtney Emery (UP-4)
Courtney is a gamer who plays games in many Discord servers. She is familiar with computers, and is notorious in her friend group for playing practical jokes on her friends.

### Lindsay Leign (UP-5)
Lindsay is a network engineer working on the bleeding edge of network infrastructure. She is very familiar with the IP protocol, and is very familiar with computers. She is developing an extension to the IP protocol, and needs to be able to test it.

## User Stories
Derived from the requirements and mock users, the following user stories were created:

### Looking up unknown IP addresses (US-1)
Dana Monroe often receives "cold-call" style emails, and wants to be able to verify the location of the sender. He has been taught how to look up the IP address of the sender.

As a non-technical user, Dana Monroe wants a tool to verify the location of the sender so that he can begin to determine the credibility of the senders.

### Gathering bulk data for analysis (US-2)
John Smith is working on a project that requires him to analyze the locations of a group of users. He has a list of IP addresses, and wants to be able to gather the location data for each of them without needing to manually look them up.

John Smith, a technical user, wants a tool which can collect location data for a list of IP addresses, import his existing data for analysis, and export the data without manual copying so that he can focus on the analysis. Additionally, John smith wants to be able to label the IP addresses so that he can easily identify them without needing to merge the data with his existing data.

### Keyboard navigation (US-3)
McKinley Kasey would like to be able to lookup IP addresses, but is unable to use a mouse. Because of this, they are only able to use a keyboard to navigate the web. 

As a user who is unable to use a mouse, McKinley Kasey wants a tool which can be navigated using only a keyboard so that they can use the tool.

### Looking up multiple valid & invalid IP addresses (US-4)
Courtney Emery wants to be able to look up the location of her friends, and send them a screenshot of the location data. However, she is not confident what numbers she has are actually IP addresses, and wants to be able to look up multiple numbers at once to save time.

As a user who wants to play a practical joke on her friends, Courtney Emery wants a tool which can look up multiple IP addresses at once without much hassle, and display the results in a way that can be easily shared so that she can play a practical joke on her friends. She also wants to able to put in invalid IP addresses, but have the tool ignore them so that she can save time.

### Looking up non-standard IP addresses (US-5)
Lindsay Leign is working on a project which requires her to look up the location of non-standard IP addresses. She is developing a new protocol which uses non-standard IP addresses, and wants to be able to look up the location data for these addresses to test her protocol.

As a user who wants to look up non-standard IP addresses, Lindsay Leign wants a tool which can look up non-standard IP addresses so that she can use the tool for her project. She is not concerned with whether the tool tells her that the IP address is invalid, as long as it still attempts to look up the location data.

## Requirements
### Base Requirements
A web form must be created which allows a user to enter an IP address. Once the user submits the form, the following information must be displayed:
 - Country Code
 - Postal Code
 - City Name
 - Timezone
 - Accuracy Radius

Further, to gather this information, it must use the [MaxMind GeoLite2 City Database](https://dev.maxmind.com/geoip/geoip2/geolite2/). 
> Note, though MaxMind offers a web service, the database files must be used as a restriction of the assignment.

In order to parse the `.mmdb` file, a library linked on [MaxMind's Developer Site](https://dev.maxmind.com/geoip/docs/databases?lang=en#api-clients) must be used.

### Derived Requirements
Based off the above user stories and the base requirements, I have added the following requirements:

> Note, these requirements represent a lot of scope-creep, and are not required to be completed for the assignment. However, I have included them as they both represent a more complete solution (in my opinion), and because I was having fun with the project. In a real-world scenario, I would have discussed these requirements with the stakeholders to determine if they were necessary, and if so, how they would be prioritized.

Requirements derived from US-1:
 - The web form must be able to show users the location of the IP address they entered. (R-1)
 - The web form must be able to show users if the IP address they entered is invalid. (R-2)
 - The web form must be able to show users if the IP address they entered is not found in the database. (R-3)
 - The web form must be navigable by users with little-to-no knowledge of IP addresses. (R-4)

Requirements derived from US-2:
 - The web form must be able to import a list of IP addresses from a file. (R-5)
 - The web form must inform users how to format the file for import. (R-6)
 - The web form must be able to export the location data to a standardized file-type. (R-7)
 - The web form must be able to label IP addresses so that users can easily identify them. (R-8)

Requirements derived from US-3:
 - The web form must be navigable using only a keyboard. (R-9)
 - Users must not need to guess what element is currently selected. (R-10)

Requirements derived from US-4:
 - The web form must be able to look up multiple IP addresses at once without using the import feature. (R-11)
 - The web form must not fail to provide information if an invalid IP address is entered. (R-12)
 - The web form must not fail to provide information if an IP address is not found in the database. (R-13)
 - The web form must be able to display the results in a way that can be easily shared. (R-14)

Requirements derived from US-5:
 - The web form must allow users to specify an IP address is non-standard, and still attempt to look up the location data. (R-15)

# Design
## API
The API needs to be able to interface with a `.mmdb` file to retrieve the location data. In order to do this, a required license key, or path to the `.mmdb` file must be provided. On the first run, the API will download and save the most recent version of the `.mmdb` file in the root directory of the server. 
> Note, this is not a good practice, and in a real-world scenario, it would likely be better to store the IP information in a database, or host the `.mmdb` file in a separate file server. This implementation was chosen for simplicity and due to the fact that this project is not being deployed to a production environment. For more information on this, see the [deployment considerations](#deployment-considerations) section.

Once the `.mmdb` file is accessible, a RESTful server will be created which will allow users to access the location data. This server will expose 3 endpoints:
 - A health check endpoint which will always return a `200` response.
 - An endpoint to lookup a single IP address.
 - An endpoint to bulk lookup IP addresses which uses multiprocessing to speed up the process.

## App
The app will be a single page application with some basic routing. It will be built using React/TypeScript, and will be styled using the `emotion` library. The app will be hosted on a separate server from the API, and will use the API to retrieve the location data.

The app will have 4 pages:
 - A home page which will allow users to enter an IP address (or multiple IP addresses) to look up.
 - A bulk lookup page which will allow users to upload a `.csv` of IP addresses to look up.
 - A results page which will display the location data for the IP addresses entered.
 - An error page which will display if any unrecoverable errors are encountered while looking up the IP addresses (such as 500 errors).

 Both the results & error pages will automatically redirect to the home page if the user does not navigate to them using the app's routing. This is to prevent users from accessing the results page without having entered an IP address, or from accessing the error page without having encountered an error.

## Requirement-specific implementation plan
### R-1
The results page will show the location data for each IP address entered. Specifically, it will show the following information:
 - The IP address,
 - The provided label (if any),
 - Country Code
 - Postal Code
 - City Name
 - (local time & Timezone)
 - Accuracy Radius (in km)
 - A map showing the location of the IP address (if available)

If any of this information cannot be retrieved, then the individual fields will be marked as "unknown".

### R-2
Within the same view as the successful IPs, a card will be shown for each invalid IP address entered. This card will show the IP address, label (if applicable), and a message stating that the IP address is invalid.

### R-3
Within the same view as the successful IPs, a card will be shown for each IP address that was not found in the database. This card will show the IP address, label (if applicable), and a message stating that the IP address was not found in the database.

### R-4
The home page will have a form with a single input field asking for an IP Address. This will reduce confusion for inexperienced users. Further, the color of the borders around the input will be red if the IP address is suspected to be invalid (based off of an IP address regex), and blue if the IP address is suspected to be valid. This will allow users to easily identify if they have entered an invalid IP address.

### R-5
The bulk lookup page will allow users to upload a `.csv` file containing IP addresses and labels.

### R-6
An example `.csv` file will be provided which users can download and fill out. This file will be formatted as follows:
```
ip_address,label
```

### R-7
The results page will have a button which will allow users to download the results as a `.json` file. The contents of this `.json` file will be the same as the response from the API.

### R-8
Both the home page, and the `.csv` will provide the ability to label IP addresses. This label will be displayed in the results page next to the IP address.

### R-9
The app will minimize the use of mouse events, and where absolutely required will also support keyboard events. This will allow users to navigate the app using only a keyboard.

Specifically:
- Icons buttons will be implemented to allow for a user to press the `enter` key to interact with them. Additionally, when layout shifts are required, the focus will be moved to the new element that has been added to the DOM.
- The file upload button will be implemented to allow for a user to press the `enter` key to interact with it.

### R-10
All elements which are styled to look different from default HTML elements will include css to ensure that they are visually distinct when focused. Additionally, elements which are interactive but are not tabbable by default will be made tabbable.

### R-11
The home page will allow users to enter multiple IP addresses at once. This will be done by adding a '+' button next to the input field. When this button (or the enter key) is pressed, a new input field will be added to the DOM. This will allow users to enter multiple IP addresses at once, and will also allow users to enter IP addresses without having to scroll down the page.

### R-12
If an invalid IP is provided, the input field will be highlighted in red. If a user searches anyways, they will be brought to the results page and all IPs will still be searched. The invalid IP will be shown in the results page with a message stating that the IP is invalid.

### R-13
If a user searches for an IP address which does not exist in the database, they will be brought to the results page and all IPs will still be searched. The IP address will be shown in the results page with a message stating that the IP address was not found in the database.

### R-14
The app will be responsive, and will work on mobile devices. Additionally, the app will attempt to display as much information as possible in a single view for each IP address. This will ensure that users do not have to scroll horizontally to view all of the information for an IP address.

### R-15
The app will attempt to warn users that an IP address is invalid (by highlighting the input field in red), but will not prevent them from searching for it. This is to prevent users from being unable to search for an IP address which is valid, but is not recognized by the app.

Note, this implementation is inspired by forms which allow users to enter an email address, but do not prevent them from entering an invalid email address. This is considered to be a better user experience than preventing users from entering an invalid email address, as the email spec is very complex and it is difficult to validate an email address. This is also the case for IP addresses, as there are many different types of IP addresses, and it is difficult to validate them all. This implementation also helps future-proof the app, as even if it is not updated should a new ip-spec be released, as long as it has access to a new database file it will still show results.

> While testing the database, I discovered that the database file already contains some IP addresses which are technically not valid. For example, using May 12th version of the database, searching for the IP address `1.1.1` yielded the following result. Because of this, I decided that including this requirement would be a good idea.
```json
{
  "accuracy_radius": 1000,
  "city": null,
  "country_code": "CN",
  "ip_address": "1.1.1",
  "latitude": 34.7732,
  "longitude": 113.722,
  "postal_code": null,
  "time_zone": "Asia/Shanghai"
}
```

# Endpoints
## GET `/health-check`
- Always returns a `200` response with the text `"Healthy!"`.
- If this is not returned, then the API is not running properly, or you are not accessing the correct host.

## GET `/ip/<ip_address>`
- If `<ip_address>` is both valid, and exists within the `.mmdb` file, then a `200` response is returned with the following JSON:
  ```json
  {
    "ip_address": "string <ip_address>",
    "country_code": "string <country_code>",
    "postal_code": "string <postal_code>",
    "city": "string <city_name>",
    "time_zone": "string <time_zone>",
    "accuracy_radius": "int <accuracy_radius>",
    "latitude": "float <latitude>",
    "longitude": "float <longitude>"
  }
  ```

- If `<ip_address>` is invalid, then a `400` response is returned with the following JSON:
  ```json
  {
    "ip_address": "string <ip_address>",
    "error": "string <error_message>"
  }
  ```

- If `<ip_address>` is valid, but does not exist within the `.mmdb` file, then a `404` response is returned with the following JSON:
  ```json
  {
    "ip_address": "string <ip_address>",
    "error": "string <error_message>"
  }
  ```

### POST `/ips`
Body
```json
{
  "ip_addresses": [
    "string <ip_address>",
    ...
  ]
}
```

- The response from this endpoint is the same as if a list of `GET /ip/<ip_address>` requests were made. IE, The response will be shaped like the following body (depending on the result of each lookup):
```json
[{
        "status": 200,
        "ip_address": "string <ip_address>",
        "country_code": "string <country_code>",
        "postal_code": "string <postal_code>",
        "city": "string <city_name>",
        "time_zone": "string <time_zone>",
        "accuracy_radius": "int <accuracy_radius>",
        "latitude": "float <latitude>",
        "longitude": "float <longitude>"
    },
    {
        "status": 400,
        "ip_address": "string <ip_address>",
        "error": "string <error_message>"
    },
    {
        "status": 404,
        "ip_address": "string <ip_address>",
        "error": "string <error_message>"
    },
    ...
]

```
- This endpoint should always be used when fetching multiple ip's, as it will batch your request over multiple CPU cores.

- This endpoint is made using a POST request as it is possible that the list of ip's could be too large to fit in a GET request. In the future, it may be worth considering responding with a `303`, and providing a link to a fetch a . This would allow for the request to be made using a GET request, and would allow for the results to be cached. This however would require an additional database to be setup, and is likely outside the scope of this assignment.

# Deployment Considerations
Though this implementation attempts to create a production-ready version of this assignment,
it is not being deployed. In order to make this project deployment-ready, a few concerns must
be solved:
 - The current setup using a `.mmdb` file from the local file system is likely not suitable for a deployment as auto-updating is not taken into account which is vital for long term accuracy.
    - This could be mitigated by moving to a GeoLite2 web service (prohibited by the assignment).
    - This could be mitigated by creating a separate db service, and use automatic re-downloading and conversion of MaxMind's offered `.csv` format, and using a more standard SQL database setup (likely outside the scope of this assignment as it specifies using the DB Readers, which use `.mmdb` files).
    - This could also be mitigated by using a cloud file storage service (such as S3), and creating a cron job to download the `.mmdb` file from MaxMind, and upload it to the cloud file storage service on a regular basis. This would allow for the file to be accessed by multiple instances of the API, and would allow for the file to be updated automatically, however it would require the API to download this file for each request. This would likely be slower than the other solutions, and would likely be more expensive due to the cost of accessing the cloud-stored file on each request.

- The current setup provides no specialized docker configuration for production, and additionally does not provide any opinion on how it should be hosted.
    - For automatic deployment, a CI/CD server would need to be setup. From here, after creating production-ready Dockerfiles, the CI/CD server could be configured to automatically build and deploy the docker images to a docker host such as Kubernetes, or ECS. Alternatively, the CI/CD server could be configured to deploy each portion of the application separately using different services (such as static hosting for the frontend, and a serverless function for the backend API).
    - Alternatively, some configuration could be created to allow for each service to be manually deployed to a host (such as with Firebase hosting, or AWS Elastic Beanstalk), however this would not likely be as scalable of a solution, and would require more manual work.

- The backend API currently has basic CORS configuration allowing all routes, this is not suitable for a production environment.
    - This would be solved depending on the deployment solution, but would likely be solved with environment variables, or a configuration file to allow for the CORS configuration to be changed without needing the code to be environment-aware.

## Future Improvements

- Once this assignment has been reviewed and I have been given permission to release it publicly, the backend should likely be refactored to use a more scalable solution for looking up IP addresses. For more information about this, see the [Deployment Considerations](#deployment-considerations) section. Likely the next steps would be to create a separate database service, and use automatic re-downloading and conversion of MaxMind's offered `.csv` format, and using a more standard SQL database setup.

- The maps displayed after a user looks up an IP address currently don't show any information about the accuracy of the provided pin. This was entirely out of scope on this project, however I would be interested in adding a circle around the pin to show the accuracy radius of the provided IP address. This would require using the maps API to draw a circle around the pin, which in turn would require additional permissions on the API key (additional permissions which would have likely caused that key to become un-sharable). Because of this, I have not added this feature as it would require that a Google Maps API key be provided in the `.env` file, which in turn would require the reviewer to create their own Google Maps API key.

- Once a CI/CD pipeline is setup, automatic failure of PRs should happen in the event that:
  - The api is not properly formatted using `black`.
  - The frontend is not properly linted.
  - the api does not pass all tests.
  - The frontend does not pass all tests.