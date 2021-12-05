FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN REACT_APP_BACKEND_URL=http://34.107.154.238 REACT_APP_BACKGROUND_IMAGE_URL=http://34.107.154.238/background npm ci

RUN REACT_APP_BACKEND_URL=http://34.107.154.238 REACT_APP_BACKGROUND_IMAGE_URL=http://34.107.154.238/background npm run build

RUN npm install -g serve

CMD ["serve", "build"]