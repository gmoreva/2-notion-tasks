FROM node:alpine

WORKDIR /app
ADD ./package.json /app/
ADD ./package-lock.json /app/
RUN npm i
ADD ./ /app
CMD npm start
