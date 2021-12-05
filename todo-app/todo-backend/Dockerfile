FROM node:alpine

WORKDIR /usr/src/app

RUN chown node:node /usr/src/app

COPY --chown=node:node . .

USER node

RUN npm ci --only-production

CMD ["npm", "start"]
