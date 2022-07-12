ARG NODE_VERSION
FROM node:${NODE_VERSION}

VOLUME /mnt/volume
ENV DATA_DIR=/mnt/volume

WORKDIR /app
ADD . .
RUN npm install --omit=dev
CMD npm start
