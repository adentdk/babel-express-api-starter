FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000
CMD [ "yarn", "prod:babel" ]
