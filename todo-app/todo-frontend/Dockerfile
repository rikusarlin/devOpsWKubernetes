FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN REACT_APP_BACKEND_URL=http://localhost:8081 REACT_APP_BACKGROUND_IMAGE_URL=http://localhost:8081/background npm ci

RUN REACT_APP_BACKEND_URL=http://localhost:8081 REACT_APP_BACKGROUND_IMAGE_URL=http://localhost:8081/background npm run build

RUN npm install -g serve

CMD ["serve", "build"]
