FROM node:16-alpine3.15

WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i

# add app
COPY . ./

# start app
CMD ["npm", "start"] 