FROM node:20.12.2-alpine3.19

WORKDIR /app

# we need to copy prisma files before hand
# to generate the database client
COPY prisma ./

COPY ./package.json ./package-lock.json ./

# install dependencies
RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "dev"]