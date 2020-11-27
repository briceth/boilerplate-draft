# TODO node-alpine
FROM node:14.15.1-stretch

WORKDIR /app

# Allows us to take advantage of cached Docker layers
# Not installing dependencies for each codebase changes
COPY package*.json ./

RUN npm install
RUN npm install -g knex


# If you are building your code for production
# RUN npm ci --only=production && npm cache clean --force

COPY . .

USER node

# ENV API__PORT=4000
# ENV NODE_ENV=development

# private port inside the container
EXPOSE 4000

# TODO ["nodemon", "index.js"]
# Is overrided by docker-compose command:
CMD ["npm", "run", "dev"]