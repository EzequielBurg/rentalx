FROM node

WORKDIR /usr/app

COPY package.json ./

COPY . .

EXPOSE 3333


CMD ["npm", "run", "dev"]
