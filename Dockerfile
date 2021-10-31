FROM node:alpine

WORKDIR /app
ADD ./package.json /app/
ADD ./package-lock.json /app/
RUN npm i
RUN npm run build
ADD ./ /app
CMD npm start
