FROM node:alpine

WORKDIR /app
ADD ./package.json /app/
ADD ./package-lock.json /app/
RUN npm i
ADD ./ /app
RUN npm run build
CMD npm start
