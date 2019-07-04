# Create image based on the official Node 10 image from the dockerhub
FROM openshift/nodejs:10

# Create a directory where our app will be placed
RUN mkdir -p /opt/app

#RUN mkdir -p /home/isddev/log/

# Change directory so that our commands run inside this new directory
WORKDIR /opt/app

# Copy dependency definitions
COPY package*.json /opt/app

# Get all the code needed to run the app
COPY . /opt/app

# Install dependecies
RUN npm install



# Expose the port the app runs in
EXPOSE 4201

# Serve the app
CMD ["npm", "start"]
