FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build
RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "run", "start"]
