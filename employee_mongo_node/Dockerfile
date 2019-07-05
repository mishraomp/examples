# Create image based on the official Node 10 image from the dockerhub
FROM openshift/nodejs:10

ENV APP_ROOT=/opt/app-root
ENV HOME=${APP_ROOT}
COPY . ${APP_ROOT}
##RUN chmod -R u+x ${APP_ROOT} && \
  ##  chgrp -R 0 ${APP_ROOT} && \
    ##chmod -R g=u ${APP_ROOT} /etc/passwd

### Containers should NOT run as root as a good practice
USER 10001
WORKDIR ${APP_ROOT}

# Install dependecies
RUN npm install

# Expose the port the app runs in
EXPOSE 4201

# Serve the app
CMD ["npm", "start"]
