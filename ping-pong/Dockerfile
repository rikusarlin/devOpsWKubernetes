FROM node:alpine

RUN apk --no-cache add curl

USER node

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only-production

CMD ["npm", "start"]
