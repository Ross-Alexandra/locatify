## Warning, this file expects to be run from the root of the project
## It will copy the .env file from the root of the project to the api folder
FROM python:3

RUN mkdir /api
WORKDIR /api

EXPOSE 34343

COPY ./api/requirements.txt .
RUN pip install -r requirements.txt

COPY ./api .
COPY ./.env /.env

ENV PYTHONUNBUFFERED=TRUE