FROM node:16 as builder

WORKDIR /usr/src/app

COPY . .

RUN REACT_APP_BACKEND_URL=http://localhost:8081 REACT_APP_BACKGROUND_IMAGE_URL=http://localhost:8081/background npm ci

RUN REACT_APP_BACKEND_URL=http://localhost:8081 REACT_APP_BACKGROUND_IMAGE_URL=http://localhost:8081/background npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=builder /usr/src/app .

ENTRYPOINT ["nginx", "-g", "daemon off;"]