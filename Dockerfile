FROM node:16.14.2 AS development

WORKDIR /usr/src/app

# COPY package*.json ./
COPY . . 

# RUN npm install glob rimraf

RUN npm install

# COPY . .

CMD ["npm", "start"]