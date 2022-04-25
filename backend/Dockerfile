FROM node:14-alpine as base

WORKDIR /node_app
COPY package*.json /node_app
RUN npm install
EXPOSE 3000
COPY . /node_app
CMD ["npm", "start"]