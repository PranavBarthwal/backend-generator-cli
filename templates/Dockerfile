# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
ENV NODE_ENV=production

CMD ["npm", "start"]
