FROM node:lts-alpine

WORKDIR /home/nodejs/app

COPY . . 
RUN  npm install 

CMD ["node", "server.js"]