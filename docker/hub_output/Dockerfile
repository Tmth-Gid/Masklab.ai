FROM node:14

COPY services/hub_server/hub_output/package*.json ./

WORKDIR /hub_api

RUN npm install

COPY services/hub_server/hub_output/ .

EXPOSE 3000

CMD [ "npm", "start" ]