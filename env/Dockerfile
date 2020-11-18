FROM node:14-alpine
MAINTAINER Richard Olsson <r@richardolsson.se>

WORKDIR /var/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm install -g nodemon

ADD package.json /var/app/package.json
RUN npm install

ADD . /var/app
RUN npm run build
CMD ["nodemon", "src/server/main"]
