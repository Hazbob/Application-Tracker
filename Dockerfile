FROM node:20
WORKDIR /src
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]