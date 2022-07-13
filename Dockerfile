ARG NODE_VERSION
FROM node:${NODE_VERSION}

VOLUME /data
ENV DATA_DIR=/data

WORKDIR /app
ADD . .
RUN npm install --omit=dev
CMD npm start
