FROM node:alpine

USER node

RUN chown node /tmp/ping-pong

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only-production

CMD ["npm", "start"]
