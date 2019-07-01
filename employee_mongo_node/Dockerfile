# Create image based on the official Node 10 image from the dockerhub
FROM openshift/nodejs:10

#Create app user as root is not allowed.
RUN useradd -r -u 999 -g appuser appuser
#change to the user
USER appuser

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

RUN mkdir -p /home/isddev/log/

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 4201

# Serve the app
CMD ["npm", "start"]
