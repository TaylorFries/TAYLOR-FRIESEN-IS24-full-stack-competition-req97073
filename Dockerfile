# Get Linux base image
FROM alpine:latest

# Update and add all necessary installs
RUN apk update
RUN apk add npm
RUN apk add git
RUN apk add bash
RUN apk add python3

# Create new directory and copy files into it
RUN mkdir repo
COPY site_backend /repo/site_backend
COPY site_frontend /repo/site_frontend
COPY run_server.sh /repo/run_server.sh

# Change our working directory and install dependencies for frontent
WORKDIR /repo/site_frontend
RUN npm install

# Change working directory and install dependencies for backend
WORKDIR /repo/site_backend
RUN npm install

# Expose the ports we will be using
EXPOSE 3000
EXPOSE 8000

# Change working directory and run the front and back end
WORKDIR /repo
RUN ["chmod", "+x", "./run_server.sh"]
CMD ./run_server.sh