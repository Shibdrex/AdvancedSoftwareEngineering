# PythonMicroserviceTemplate
This is a template for a generic flask based python microservice

The python flask service is very basic
This should only be used as a base to get baseline container things setup

# dockerfile
In this file the container image is defined
This includes the building of the image
First step get all required packages and install them
Then in the second step we create a user to reduce the privileges, this is for security
Then get the packages from the build step, lastly start flask server via gunicorn having 2 workers and 4 threads

# dockerignore
Declares all files that shouldn`t be included in the build

# compose.yml
Used to start multiple containers at once
First build the docker image with the dockerfile
Then expose port 5000 of the container
Then setup a healthcheck for the container
Then set mode to replicated which means multiple instances of this container will start, amount is specified in replicated: 2
Then set minimum and maximum resources for the container
Then can make this container depend on another

Then setup a nginx server as a load-balancer to access the multiple instances of the flaskapp container
Select image, mount volume and pull config from nginx.conf, lastly map port 4000 of host to port 4000 of container

To build the image use this command:
```
docker build -t app-flask:1.0 .
```
To run container on its own without compose:
```
docker run -p 5000:5000 app-flask:1.0
```
Change -p to -dp to run detached

To start via compose, with multiple instances and load-balancer
```
docker compose up
```
To start detached
```
docker compose start
```
or
```
docker compose up --detached
```
To stop running detached cluster
```
docker compose stop
```
or
```
docker compose down
```